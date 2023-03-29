import React, { useState } from "react";
import "./inventory.css"
import Games from "./Games";

export default function Inventory(){
    const [name,setName] = useState("");
    const [img,setImg] = useState(null);
    const [validated, setValidated] = useState(false);
    const[selectedGame,setSelectedGame] = useState("CS:GO")
    const[category,setCategory] = useState("")
    const[rarity,setRarity] = useState("")
    const games = Games

    function handleSubmit(event){
        event.preventDefault()
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.stopPropagation();

        }
        else{
        setValidated(true);
        const formData = new FormData()
        formData.append("name",name)
        formData.append('img',img)
        formData.append("category",category)
        formData.append("rarity",rarity)
        fetch(`http://localhost:8080/inventory/item/${name===games[0].name ? "cs" : "rocket"}/add`,{
            method:"POST",
            body:formData
        }).then(console.log("succesfully created"))
        .catch(err=>console.log(err))}
    }
    
    return <div className="d-flex justify-content-center align-items-center vh-100 bg-dark"> 
    <form onSubmit={handleSubmit} className={`rounded-3 p-5 form-card  bg-dark needs-validation ${validated ? "was-validated" : "needs-validation"}`} noValidate>
        <div id="game" className="mb-3">
        <label>Game</label>
        <select className="form-select" onChange={event=>setSelectedGame(event.target.value)}>
            {games.map(game=><option value={game.name}>{game.name}</option>)}
        </select>
        <div class="invalid-feedback">Please select a game.</div>
        </div>

        <div id="name" className="mb-3 has-validation">
        <label>Name</label>
        <input className="form-control" type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>
        <div class="invalid-feedback">Item should have a name.</div>
        </div>
        
        <div id="category" className="mb-3">
        <label>Category</label>
        <select className="form-select" aria-label="Category" onChange={(e)=>setCategory(e.target.value)} required>
            <option disabled defaultValue selected>Select Category</option>
            {games.filter(game=>game.name===selectedGame)
            .map((game)=>{
                const categories = game.categories
                return categories.map((category)=><option value={category}>{category}</option>)
            })}
        </select>
        <div class="invalid-feedback">Item must have a category.</div>
        </div>
        
        <div id="rarity" className="mb-3">
        <label>Rarity</label>
        <select className="form-select" aria-label="Rarity" onChange={(e)=>setRarity(e.target.value)} required>
            <option disabled defaultValue selected>Select Rarity</option>
            {games.filter(game=>game.name===selectedGame)
            .map((game)=>{
                const rarities = game.rarity
                return rarities.map((rarity)=><option value={rarity}>{rarity}</option>)
            })}
        </select>
        
        <div class="invalid-feedback">Item must have a rarity.</div>
        </div>
        <div id="img" className="mb-3">
        <label>Select Image</label>
        <input className="form-control input-focus bg-dark" type="file" onChange={(e)=>setImg(e.target.files[0])} required/>
        <div class="invalid-feedback">Please select an image.</div>
        </div>
        
        <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-outline-primary btn-violet w-50 mt-3">Create Item</button>
        </div>
    </form>
    </div>
}