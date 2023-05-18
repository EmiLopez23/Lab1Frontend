import { useContext, useEffect, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import "./GeneralInventory.css"
import { UserContext } from "../../contexts/UserContext";
import Filter from "../Filter/Filter";


export default function GeneralInventory(){
    const {token} = useContext(UserContext)
    /*This array persist all the items in inventory */
    const [items,setItems] = useState([])
    /*This array filter all the items in inventory */
    const [filteredItems,setFilteredItems] = useState([])

    /*Call the API to set all the items in general inventory.*/
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