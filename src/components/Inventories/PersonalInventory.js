import { useContext, useEffect, useState } from "react"
import "./GeneralInventory.css"
import "./PersonalInventory.css"
import { UserContext } from "../../contexts/UserContext"
import ItemCard from "../ItemCard/ItemCard"
import PersonalFilter from "../Filter/PersonalFilter"

export default function PersonalInventory(){
    const {token} = useContext(UserContext)
    const [itemsData,setItemsData] = useState([])
    const [filteredItems, setFilteredItems] = useState([])

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
            <PersonalFilter allItems={itemsData} setFilteredItems={setFilteredItems}/>
            <div className="inventory-container py-3">
                {filteredItems.map((data,index)=>
                    <div className="personal-items-container" key={index}>
                    <div className="personal-item-qty" key={data.quantity}>{data.quantity}</div>
                    <ItemCard key={data.item.name} item={data.item}/>
                    </div>)}
            </div>
        </div>)
}