import { useContext, useEffect } from "react"
import { useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import "./CreatePost.css"
import ItemImg from "../ItemCard/ItemImg"

export default function OfferItems({gameName,offeredItems,setOfferedItems}){
    const{token} = useContext(UserContext)
    const [myItems,setItems] = useState([])
    const [filteredItems,setFilteredItems] = useState([])

    useEffect(()=>{
        fetch("http://localhost:8080/user/inventory", {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data =>{
            setFilteredItems(data)
            setItems(data)
        })
    },[token])


    useEffect(()=>{
        setFilteredItems(myItems.filter((itemData)=>itemData.item.game.name===gameName))
    },[gameName])
    
    function deleteItem(item){
        setOfferedItems(offeredItems.filter(wanted=>wanted!==item))
    }

    function addItem(item){
        const index = offeredItems.indexOf(item)
        if(index>-1){
            offeredItems[index].qty += 1
        }
        else{
            item.qty=1
            setOfferedItems([...offeredItems,item])
        }
    }
    
    
    return (<div className="offer-item-container">
        <h6 className="text-light">Your Items</h6>
            <div className="items">
                {filteredItems.map((itemData,index)=>
                        <ItemImg key={index} width={100}  item={itemData.item} onClick={()=>addItem(itemData.item)}/>)
                }
            </div>
        <h5 className="text-light">Items you Offer</h5>
        {offeredItems.map(itemOffer=><div className="text-light items-to-trade">
                        <div>{`${itemOffer.name}(${itemOffer.qty})`}</div>
                        <button onClick={()=>deleteItem(itemOffer)} className="btn btn-danger">Delete</button>
                    </div>)}
        </div>)
}