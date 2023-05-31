import React, {useContext, useState} from "react";
import "./AddGameAsJSON.css"
import { UserContext } from "../../../contexts/UserContext";
import { Toaster, toast } from "react-hot-toast";

export default function AddGameAsJSON(){
    const{token} = useContext(UserContext)
    const [gamesArray, setGamesArray] = useState([]);


  function handleFileChange(e) {
    e.preventDefault();
    const file = e.target.files[0]
    const reader = new FileReader();

    reader.onload = function (e) {
      try {
        const fileContent = e.target.result
        const jsonData = JSON.parse(fileContent);
        handleJSONData(jsonData);
      } catch (error) {
        toast.error(error.message);
      }
    };

    reader.readAsText(file);
  }

  function handleJSONData(jsonData){
    try{
    for (let game of jsonData){
        let name = game.name
        let auxArray = []
        for(const categoria of game.categories){
            let category = categoria.name
            let values = ""
            let counter = 0
            for(const value of categoria.categoryValues){
                if(counter !== 0){values += ","}
                values += value.value       
                counter++ 
            }
            let aux = {"category":category,"values":values}
            auxArray.push(aux)
        }
        gamesArray.push({"game":name,"inputValues":auxArray})
        }
    }
    catch (error) {
        toast.error(error.message)
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      for (let i = 0; i < gamesArray.length; i++) {
        fetch("http://localhost:8080/games/add",{
            method:"POST",
            headers: {"Content-Type": "application/json",
                Authorization: `Bearer ${token}`},
            body: JSON.stringify(gamesArray[i]),
        })
          .then((resp) => {
            if (resp.ok) {
              toast.success("Succesfully Created " + gamesArray[i].game);
            } else {
              throw new Error("Could not create Game " + gamesArray[i].game);
            }
          })
          .catch((error) => toast.error(error.message));
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

    
    return <>
        <form className="text-light"> 
        <div id="img" className=" form-group mt-1">
        <label className="form-label text-light">Insert .JSON or .txt File</label>
        </div>
        
        <div className="position-relative">
        <label htmlFor="file" className="form-label"></label>
        <input 
        id="file" 
        className="form-control input-focus bg-dark text-light" 
        type="file" 
        name="json"
        onChange={handleFileChange} 
        required/>

        </div>

        <div className="d-flex justify-content-end mt-4">
            <button className="btn btn-violet ms-2" onClick={handleSubmit}>Submit</button>
        </div>

        </form>
    </>
}