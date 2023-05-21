import React, {useContext, useEffect, useState } from "react";
import "./AddItem.css"
import FormButton from "../button/FormButton";
import ItemInput from "../ItemInput/ItemInput";
import ApiService from "../../services/ApiService";
import { UserContext } from "../../contexts/UserContext";
import { Toaster, toast } from "react-hot-toast";

export default function AddItem(){
    const {token} = useContext(UserContext)
    const[games,setGames]=useState({})
    const[item,setItem] = useState({
        name:"",
        game:"",
        valuesId:{},
        img:null,
        
    })  

    const[gameCategories, setCategories] = useState([])
    
    /*Call the API to get all games. It transforms the object into a new one that has every game name as a key*/
    useEffect(()=>{
        async function fetchGames(){
          try{
            const gamesFetched = await ApiService.getGames()
            setGames(gamesFetched)
          }catch(error){
            console.error(error)
          }
        }
        
        fetchGames()
    },[token])


    /*Catch all the changes in the inputs and set the item useState. 
      Every input has an specific name that matches with the atributes in Item useState.
      Every time an input field changes, it triggers this function updating the item atributes value .
      If the input changing is the one that has the games names, it sets the categories array wich contains every category of the selected game */
    const handleInputChange = (event)=>{
        const name = event.target.name
        let value= event.target.value;
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
    
    /*It creates a formData and send it to the backend. FormData is used to send the image */
    function handleSubmit(event){
        event.preventDefault()
        const form = new FormData()
        form.append("name",item.name)
        form.append("game",item.game)
        form.append("valuesId",Object.values(item.valuesId))
        form.append("img",item.img)
        const toastId = toast.loading("Creating...")
        fetch("http://localhost:8080/inventory/item/add",{
            method:"POST",
            headers:{
                'enctype': 'multipart/form-data'
            },
            body: form
        }).then(resp=>{
          if(resp.ok){
            toast.success("Successfully created",{ id: toastId })}
          else{throw new Error("Error while creating Item")}
        }).catch(err=>toast.error(err.message,{ id: toastId }))
    }
    
    return <> 
    <Toaster position="top-center" toastOptions={{duration: 3000,style: {background: '#333',color: '#fff',}}}/>
    <form onSubmit={handleSubmit} className="text-light">
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