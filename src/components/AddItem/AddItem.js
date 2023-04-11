import React, { useContext, useState } from "react";
import "./AddItem.css"
import Games from "../../pages/Inventory/Games";
import FormButton from "../button/FormButton";
import { UserContext } from "../../contexts/UserContext";

export default function AddItem(){
    const[item,setItem] = useState({
        name:"",
        img:null,
        game:"CS:GO",
        category:null,
        rarity:null
    })
    const [validated, setValidated] = useState(false);
    const games = Games

    const handleInputChange = (event)=>{
        const name = event.target.name
        let value= event.target.value;
        if(name==="img"){
            value = event.target.files[0]}
        
        setItem({...item,[name]:value})
      }

    function handleSubmit(event){
        event.preventDefault()
        const form = event.target;
        //if (!form.checkValidity()) {
        //    event.stopPropagation();
        //    return;
        //    
        //}
        setValidated(true); 
        const formData = new FormData(form);
        const gameType = item.game === "CS:GO" ? "cs" : "rocket";
        const url = `http://localhost:8080/inventory/item/${gameType}/add`;
        fetch(url,{
            method:"POST",
            body:formData,
            headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}
        }).then(console.log("succesfully created"))
        .catch(err=>console.log(err))
    }
    
    return <> 
    <form onSubmit={handleSubmit} className={`rounded-3 p-5 form-card  bg-dark ${validated ? "was-validated" : "needs-validation"} text-light`} noValidate>
        
        <div id="game" className="mb-3 form-group">
        <label htmlFor="game-select" className="form-label">Game</label>
        <select 
        className="form-select" 
        id="game-select"
        name="game" 
        onChange={handleInputChange} 
        required>
            {games.map(game=><option value={game.name} key={game.name}>{game.name}</option>)}
        </select>
        <div className="invalid-feedback">Please select a game.</div>
        </div>

        <div id="name" className="mb-3 form-group">
        <label htmlFor="name-select" className="form-label">Name</label>
        <input className="form-control" id="name-select" type="text" placeholder="Name" name="name" value={item.name} onChange={handleInputChange} required/>
        <div className="invalid-feedback">Item should have a name.</div>
        </div>
        

        <div id="category" className="mb-3 form-group">
        <label htmlFor="Category" className="form-label">Category</label>
        <select 
        className="form-select" 
        id="Category" 
        name="category" 
        onChange={handleInputChange} 
        required>

            <option defaultValue hidden value="">Select Category</option>
            {games.find((game)=>game.name===item.game).categories.map(cat=><option value={cat} key={cat}>{cat}</option>)}
        
        </select>
        <div className="invalid-feedback">Item must have a category.</div>
        </div>
        

        <div id="rarity" className="mb-3 form-group">
        <label htmlFor="Rarity" className="form-label">Rarity</label>
        <select 
        className="form-select" 
        id="Rarity" 
        name="rarity" 
        onChange={handleInputChange} 
        required>

            <option defaultValue hidden value="">Select Rarity</option>
            {games.find((game)=>game.name===item.game).rarity.map(rar=><option value={rar} key={rar}>{rar}</option>)}

        </select>
        <div className="invalid-feedback">Item must have a rarity.</div>
        </div>


        <div id="img" className="mb-3 form-group">
        <label htmlFor="file" className="form-label">Select Image</label>
        <input 
        id="file" 
        className="form-control input-focus bg-dark text-light" 
        type="file" 
        name="img"
        onChange={handleInputChange} 
        required/>
        <div className="invalid-feedback">Please select an image.</div>
        </div>


        <FormButton className="w-50" text="Create Item"/>
    </form>
    </>
}