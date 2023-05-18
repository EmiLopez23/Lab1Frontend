import { useContext, useEffect } from "react"
import { useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import "./CreatePost.css"
import ItemImg from "../ItemCard/ItemImg"

export default function OfferItems({gameName,offeredItems,setOfferedItems}){
    const{token} = useContext(UserContext)
    const [filteredItems,setFilteredItems] = useState([])

    /* Call the API to get all the items and filter them by game */
    useEffect(()=>{
        if(gameName!==""){fetch("http://localhost:8080/user/inventory", {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data =>{
            setFilteredItems(data.filter((itemData) => itemData.item.game.name === gameName));
        })}
    },[token,gameName])

    /* Filters the array to delete the item */
    function deleteItem(item){
        setOfferedItems(offeredItems.filter(wanted=>wanted!==item))
    }

    /* If item doesn´t exists push to array, else udpdate qty and array */
    function addItem(item){
        const index = offeredItems.indexOf(item)
        if(index>-1){
            item.qty += 1
            const withoutItem = offeredItems.filter(element => element.id !== item.id)
            setOfferedItems([...withoutItem, item])
        }
        else{
            item.qty=1
            setOfferedItems([...offeredItems,item])
        }
    }
    
    
    return (<div className="offer-item-container">
        <h6 className="text-light">Your Items</h6>
            <div className="items mb-3">
                {filteredItems.map((itemData,index)=>
                        <ItemImg key={index} width={100}  item={itemData.item} onClick={()=>addItem(itemData.item)}/>)
                }
            </div>
        <h5 className="text-light">Items you Offer</h5>
        {offeredItems.map((itemOffer,index)=><div className="text-light items-to-trade" key={index}>
                        <div key={index + itemOffer.name}>{`${itemOffer.name}(${itemOffer.qty})`}</div>
                        <button onClick={()=>deleteItem(itemOffer)} key={index + "btn"} className="btn btn-danger">Delete</button>
                    </div>)}
        </div>)
}