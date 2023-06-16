import React, {useContext, useState } from "react";
import "./AddGame.css"
import CategoryForm from "./categoryForm/categoryForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { UserContext } from "../../../contexts/UserContext";
import { toast } from "react-hot-toast";

export default function AddGame(){
    const{token} = useContext(UserContext)
    const [game,setGame] = useState("")
    const [inputValues, setInputValues] = useState([{ category: "", values: "" }]);


  /*Updates the category array */
  function addCategory() {
    setInputValues([...inputValues, { category: "", values: "" }]);
  }

  /*Filters the category array to remove the desire input field */
  function removeCategory(index) {
    setInputValues(inputValues.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8080/games/add",{
      method:"POST",
      headers: {"Content-Type": "application/json",
                Authorization: `Bearer ${token}`},
      body:JSON.stringify({game,inputValues})
    })
    .then(resp=>{
      if(resp.ok){
        toast.success("Succesfully Created")
      }
      else{
        throw new Error("Could not create Game")
        }
    })
    .catch(error=>toast.error(error.message))
  }

    
    return <>
        <form className="text-light mt-4"> 
        <div className="form-group">
            <label className="form-label text-light">Insert Game Name</label>
            <input className="form-control" id="game-name" value={game} placeholder="Game Name" onChange={e=>setGame(e.target.value)} required/>
        </div>
        <div className="form-group mt-2">
            {inputValues.map((values,index)=>
                    <div className="row mb-2" key={index+100}>
                        <CategoryForm index={index} inputValues={inputValues} setInputValues={setInputValues}/>
                        <button type="button" onClick={()=>removeCategory(index)} key={index} className="btn btn-danger col-2"><FontAwesomeIcon icon={faTrashCan} /></button>
                    </div>
                )}
        </div>
        <div className="d-flex justify-content-end mt-5">
                      <button type="button" className="btn btn-violet" onClick={addCategory}>Add Category</button>
                      <button className="btn btn-violet ms-2" onClick={handleSubmit}>Submit</button>
        </div>
        </form>
    </>
}