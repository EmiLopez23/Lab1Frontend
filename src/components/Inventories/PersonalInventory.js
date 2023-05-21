import { useContext, useEffect, useState } from "react"
import "./GeneralInventory.css"
import { UserContext } from "../../contexts/UserContext"
import ItemCard from "../ItemCard/ItemCard"
import Filter from "../Filter/Filter"

export default function PersonalInventory(){
    const {token} = useContext(UserContext)
    /*This array persist all the items in inventory */
    const [itemsData,setItemsData] = useState([])
    /*This array filter all the items in inventory */
    const [filteredItems, setFilteredItems] = useState([])

    /*Call the API to set all the items in general inventory.*/
    useEffect(()=>{
        fetch("http://localhost:8080/user/inventory", {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data =>{
            setItemsData(data)
            setFilteredItems(data)
        })
    },[token])

    return (
        <div>
            <Filter allItems={itemsData} setFilteredItems={setFilteredItems} myItems={true}/>
            <div className="inventory-container py-3">
                {filteredItems.map((data)=>
                    <ItemCard item={data} hasQty={true}/>)}
            </div>
        </div>)
}