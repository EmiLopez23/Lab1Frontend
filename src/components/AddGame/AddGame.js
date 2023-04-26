import React, { useState } from "react";
import "./AddGame.css"
import CategoryForm from "./categoryForm/categoryForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function AddGame(){
    const [game,setGame] = useState("")
    const [inputValues, setInputValues] = useState([{ category: "", values: "" }]);

  function addCategory() {
    setInputValues([...inputValues, { category: "", values: "" }]);
  }

  function removeCategory(index) {
    setInputValues(inputValues.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8080/games/add",{
      method:"POST",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({game,inputValues})
    })
    .then(resp=>{
      if(resp.ok){
        console.log("succesfully created")
      }
      else{
        throw new Error("pifiaste pa")
      }
    })
    .catch(error=>console.error(error.message))
  }

    
    return <div className="d-flex justify-content-center align-items-center">
        <form className="rounded-3 p-5 form-card  bg-dark text-light">  
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
    </div>
}