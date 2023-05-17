import React, {useEffect, useState } from "react";
import "./AddItem.css"
import FormButton from "../button/FormButton";
import ItemInput from "../ItemInput/ItemInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

export default function AddItem(){
    const[games,setGames]=useState({})
    const[success,setSuccess]=useState(true)
    const[item,setItem] = useState({
        name:"",
        game:"",
        valuesId:{},
        img:null,
        
    })  

    const[gameCategories, setCategories] = useState([])
    

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
        setSuccess(false)
        if(gameCategories.includes(name)){
          setItem((prevItem) => {
            return {
              ...prevItem,
              valuesId: {...prevItem.valuesId, 
                [name]:value}
            };
          })
        }
        else{
          setItem({...item,[name]:value})
        }
        if(name==="game"){
          setCategories(games[value]?.categories.map(c=>c.name))
        }
       }


      function handleImageChange(event) {
        setItem({ ...item, img: event.target.files[0] });
      }

    function handleSubmit(event){
        event.preventDefault()
        const form = new FormData()
        form.append("name",item.name)
        form.append("game",item.game)
        form.append("valuesId",Object.values(item.valuesId))
        form.append("img",item.img)
        fetch("http://localhost:8080/inventory/item/add",{
            method:"POST",
            headers:{
                'enctype': 'multipart/form-data'
            },
            body: form
        }).then(resp=>{
          if(resp.ok){setSuccess(true)}
          else{throw new Error("Error while creating Item")}
        }).catch(err=>console.log(err.message))
    }
    
    return <> 
    <form onSubmit={handleSubmit} className="text-light">
        {success &&
          <div class="alert alert-success" role="alert" style={{position:"fixed",bottom:0,right:10}}>
          <FontAwesomeIcon icon={faCircleCheck} /> Succesfully Created
        </div>}
        
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