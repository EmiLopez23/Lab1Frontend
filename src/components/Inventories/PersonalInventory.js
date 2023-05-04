import { useContext, useEffect, useState } from "react"
import "./GeneralInventory.css"
import { UserContext } from "../../contexts/UserContext"
import ItemCard from "../ItemCard/ItemCard"
import{ApiURL} from ".../"

export default function PersonalInventory(){
    const {token} = useContext(UserContext)
    const [items,setItems] = useState([])

    useEffect(()=>{
        fetch(ApiURL.localHost + "inventory/all", {
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