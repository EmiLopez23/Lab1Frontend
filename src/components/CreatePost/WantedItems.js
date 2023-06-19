import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import ItemImg from "../ItemImage/ItemImg"
import "./CreatePost.css"
import ApiService from "../../services/ApiService"
import useWantedItems from "../../hooks/useWantedItems"

export default function OfferItems({gameName}){
    const{token} = useContext(UserContext)
    const [filteredItems,setFilteredItems] = useState([])
    const {wantedItems,deleteItem,addItem} = useWantedItems()
    /* Call the API to get all the items and filter them by game */
    useEffect(()=>{
        async function fetchInventory(){
            try{
                const inventory = await ApiService.getInventory()
                setFilteredItems(inventory.filter((item) => item.game.name === gameName));
            }catch(error){
                console.error(error)
            }
        }

        if(gameName!==""){fetchInventory()}
            
    },[token,gameName])
    
    
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