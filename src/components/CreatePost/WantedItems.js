import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import ItemImg from "../ItemCard/ItemImg"
import "./CreatePost.css"

export default function OfferItems({gameName,wantedItems,setWantedItems}){
    const{token} = useContext(UserContext)
    const [filteredItems,setFilteredItems] = useState([])

    /* Call the API to get all the items and filter them by game */
    useEffect(()=>{
        if(gameName !== ""){fetch("http://localhost:8080/inventory/all", {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data =>{
            setFilteredItems(data.filter((item) => item.game.name === gameName));
        })}
    },[token,gameName])


    /* If item doesn´t exists push to array, else udpdate qty and array */
    function addItem(item){
        const index =wantedItems.indexOf(item)
        if(index>-1){
            item.qty += 1
            const withoutItem = wantedItems.filter(wantItem=> wantItem.id !== item.id)
            setWantedItems([item,...withoutItem]) 
        }
        else{
            item.qty=1
            setWantedItems([...wantedItems,item])
        }
    }
    
    /* Filters the array to delete the item */
    function deleteItem(item){
        setWantedItems(wantedItems.filter(wanted=>wanted!==item))
    }
    
    
    return (<div className="wanted-item-container">
        <h6 className="text-light">Items from Inventory</h6>
            <div className="items mb-3">
                {filteredItems.map((item,index)=><ItemImg key={index} width={100} item={item} onClick={()=>addItem(item)}/>)}
            </div>
            <h5 className="text-light">Items you Want</h5>
            {wantedItems.map((itemWanted,index)=>
                    <div className="text-light items-to-trade" key={index}>
                        <div key={index + itemWanted.name}>{itemWanted.name + "(" + itemWanted.qty + ")"}</div>
                        <button onClick={()=>deleteItem(itemWanted)} key={index+"btn"} className="btn btn-danger">Delete</button>
                    </div>)}
    </div>)
}