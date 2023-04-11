import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import ItemCard from "../../components/ItemCard/ItemCard";
import "./Inventory.css"
import { UserContext } from "../../contexts/UserContext";
import AddItem from "../../components/AddItem/AddItem";

export default function Inventory(){
    const {token} = useContext(UserContext)
    const [items,setItems] = useState([])
    const [add,setAdd] = useState(false)

    useEffect(()=>{
        fetch("http://localhost:8080/inventory/all", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data =>{
            setItems(data)
        })
    },[token])

    function open(){
        setAdd(true)
    }

    function close(){
        setAdd(false)
    }



    return <>
        <header className="header">
                <Navbar/>
            </header>
        <div className="main-section px-5">
        <div>
            <h1 className="text-light">Inventory</h1>
        </div>
        <div className="d-flex justify-content-end ">
            <button onClick={open} className="btn add-btn">Add New Item</button>
        </div>
            <div className="items-container p-3">
                {items.map(item=><ItemCard key={item.name} item={item}/>)}
            </div>
        </div>
        {add && <div className="popup-container">
            <AddItem/>
            <button onClick={close}>Close</button>
            </div>}
    </> 
}