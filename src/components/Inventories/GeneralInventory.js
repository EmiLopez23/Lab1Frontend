import { useContext, useEffect, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./GeneralInventory.css"
import { UserContext } from "../../contexts/UserContext";

export default function GeneralInventory(){
    const {token} = useContext(UserContext)
    const [items,setItems] = useState([])

    useEffect(()=>{
        fetch("http://localhost:8080/inventory/all", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data =>{
            setItems(data)
        })
    },[token])

    return <div className="inventory-container py-3">
            {items.map(item=><ItemCard key={item.name} item={item}/>)}
        </div>
}