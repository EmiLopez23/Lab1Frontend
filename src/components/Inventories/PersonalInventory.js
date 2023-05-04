import { useContext, useEffect, useState } from "react"
import "./GeneralInventory.css"
import "./PersonalInventory.css"
import { UserContext } from "../../contexts/UserContext"
import ItemCard from "../ItemCard/ItemCard"

export default function PersonalInventory(){
    const {token} = useContext(UserContext)
    const [itemsData,setItemsData] = useState([])

    useEffect(()=>{
        fetch("http://localhost:8080/user/inventory", {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            setItemsData(data)
        })
    },[token])

    return <div className="inventory-container py-3">
            {itemsData.map((data,index)=>
                <div className="personal-items-container" key={index}>
                <div className="personal-item-qty" key={data.quantity}>{data.quantity}</div>
                <ItemCard key={data.item.name} showBtn={false} item={data.item}/>
                </div>)}
        </div>
}