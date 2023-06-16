import { useContext, useEffect } from "react"
import { useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import "./CreatePost.css"
import ApiService from "../../services/ApiService"
import ItemImgWithQty from "../ItemImage/ItemImgWithQty"

export default function OfferItems({gameName,offeredItems,setOfferedItems}){
    const{token} = useContext(UserContext)
    const [filteredItems,setFilteredItems] = useState([])

    /* Call the API to get all the items and filter them by game */
    useEffect(()=>{
        async function fetchUserInventory(){
            try{
                const userInventory = await ApiService.getUserInventory(token)
                setFilteredItems(userInventory.filter((itemData) => itemData.item.game.name === gameName));
            }catch(error){
                console.error(error)
            }
        }
        if(gameName!=="") {fetchUserInventory()}
        
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
                        <ItemImgWithQty key={index} width={100}  data={itemData} onClick={()=>addItem(itemData.item)}/>)
                }
            </div>
        <h5 className="text-light">Items you Offer</h5>
        {offeredItems.map((itemOffer,index)=><div className="text-light items-to-trade" key={index}>
                        <div key={index + itemOffer.name}>{`${itemOffer.name}(${itemOffer.qty})`}</div>
                        <button onClick={()=>deleteItem(itemOffer)} key={index + "btn"} className="btn btn-danger">Delete</button>
                    </div>)}
        </div>)
}