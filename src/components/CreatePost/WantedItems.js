import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import ItemImg from "../ItemCard/ItemImg"
import "./CreatePost.css"

export default function OfferItems({gameName,wantedItems,setWantedItems}){
    const{token} = useContext(UserContext)
    const [allItems,setItems] = useState([])
    const [filteredItems,setFilteredItems] = useState([])

    useEffect(()=>{
        fetch("http://localhost:8080/inventory/all", {
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
        setFilteredItems(allItems.filter((item)=>item.game.name===gameName))
    },[gameName])

    function addItem(item){
        const index =wantedItems.indexOf(item)
        if(index>-1){
            wantedItems[index].qty += 1 
        }
        else{
            item.qty=1
            setWantedItems([...wantedItems,item])
        }
    }
    

    function deleteItem(item){
        setWantedItems(wantedItems.filter(wanted=>wanted!==item))
    }
    
    
    return (<div className="wanted-item-container">
        <h6 className="text-light">Items from Inventory</h6>
            <div className="items">
                {filteredItems.map((item,index)=><ItemImg key={index} width={100} item={item} onClick={()=>addItem(item)}/>)}
            </div>
            <h5 className="text-light">Items you Want</h5>
            {wantedItems.map((itemWanted)=>
                    <div className="text-light items-to-trade">
                        <div>{itemWanted.name + "(" + itemWanted.qty + ")"}</div>
                        <button onClick={()=>deleteItem(itemWanted)} className="btn btn-danger">Delete</button>
                    </div>)}
    </div>)
}