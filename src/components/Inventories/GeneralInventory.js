import { useContext, useEffect, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./GeneralInventory.css"
import { UserContext } from "../../contexts/UserContext";
import Filter from "../Filter/Filter";


export default function GeneralInventory(){
    const {token} = useContext(UserContext)
    const [items,setItems] = useState([])
    const [filteredItems,setFilteredItems] = useState([])

    useEffect(()=>{
        fetch("http://localhost:8080/inventory/all", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data =>{
            setItems(data)
            setFilteredItems(data)            
        })
    },[token])


    return(
        <div> 
            <Filter allItems={items} setFilteredItems={setFilteredItems}/>
            <div className="inventory-container py-3">
                {filteredItems.map(item=><ItemCard key={item.name} item={item}/>)}
            </div>
        </div>)
}