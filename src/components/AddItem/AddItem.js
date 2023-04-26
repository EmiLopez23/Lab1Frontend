import React, {useEffect, useState } from "react";
import "./AddItem.css"
import FormButton from "../button/FormButton";
import ItemInput from "../ItemInput/ItemInput";

export default function AddItem(){
    const[games,setGames]=useState({})
    const[item,setItem] = useState({
        name:"",
        game:"",
        valuesId:[],
        img:null,
        
    })  
    

    useEffect(()=>{
        fetch("http://localhost:8080/games/all")
        .then(resp=>resp.json())
        .then(data=>{
            let dataToReturn = {}
            
            data.forEach((item)=> {
              dataToReturn = {
                ...dataToReturn,
                [item.name]: item
              }
             })
          setGames(dataToReturn)
         })
    },[])

    const handleInputChange = (event)=>{
        const name = event.target.name
        let value= event.target.value;
        if(name === "valuesId"){
            setItem((prevItem) => {
                const newValuesId = [value];
                return {
                  ...prevItem,
                  valuesId: [...prevItem.valuesId, ...newValuesId]
                };
              })
        }
        else{setItem({...item,[name]:value})}
      }

      function handleImageChange(event) {
        setItem({ ...item, img: event.target.files[0] });
      }

    function handleSubmit(event){
        event.preventDefault()
        const form = new FormData()
        form.append("name",item.name)
        form.append("game",item.game)
        form.append("valuesId",item.valuesId)
        form.append("img",item.img)
        console.log(item)
        console.log(form)
        fetch("http://localhost:8080/inventory/item/add",{
            method:"POST",
            headers:{
                'enctype': 'multipart/form-data'
            },
            body: form
        }).then(resp=>console.log(resp))
    }
    
    return <> 
    <form onSubmit={handleSubmit} className={`rounded-3 p-5 form-card  bg-dark text-light`} noValidate>
        
        <div id="game" className="mb-3 form-group">
        <label htmlFor="game-select" className="form-label">Game</label>
        <select 
        className="form-select" 
        id="game-select"
        name="game" 
        onChange={handleInputChange} 
        required>
            <option value="" hidden defaultValue>Select Game...</option>
            {Object.values(games).map(game=><option value={game.name} key={game.name}>{game.name}</option>)}
        </select>
        </div>

        <div id="name" className="mb-3 form-group">
        <label htmlFor="name-select" className="form-label">Name</label>
        <input className="form-control" id="name-select" type="text" placeholder="Name" name="name" value={item.name} onChange={handleInputChange} required/>
        </div>
        

        {games[item.game]?.categories.map((category,index)=><ItemInput category={category} key={index} onChange={handleInputChange}/>)}


        <div id="img" className="mb-3 form-group">
        <label htmlFor="file" className="form-label">Select Image</label>
        <input 
        id="file" 
        className="form-control input-focus bg-dark text-light" 
        type="file" 
        name="img"
        onChange={handleImageChange} 
        required/>
        
        </div>


        <FormButton className="w-50" text="Create Item"/>
    </form>
    </>
}