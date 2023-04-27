import React, { useContext, useEffect, useState } from "react";
import ItemCard from "../../components/ItemCard/ItemCard";
import "./Inventory.css"
import { UserContext } from "../../contexts/UserContext";
import AddItem from "../../components/AddItem/AddItem";
import PopUpContainer from "../../components/PopUpContainer/PopUpContainer";
import AddGame from "../../components/AddGame/AddGame";
import AddToInventory from "../../components/AddToInventory/AddToInventory";

export default function Inventory(){
    const {token,role} = useContext(UserContext)
    const [items,setItems] = useState([])
    const [addItem,toggleItem] = useState(false)
    const [addGame,toggleGame] = useState(false)
    const [addToInventory,toggleToInventory] = useState(false)

    useEffect(()=>{
        fetch("http://localhost:8080/inventory/all", {
            method: "GET"
        })
        .then(res => res.json())
        .then(data =>{
            setItems(data)
        })
    },[token])



    return <>
        <div className="main-section px-5">
        <div>
            <h1 className="text-light">Inventory</h1>
        </div>
        
        <div className="d-flex justify-content-end gap-2">
            <div className="">
                <button onClick={()=>toggleToInventory(true)} className="btn btn-outline-violet">Add Item to Inventory</button>
            </div>
            {role==="ADMIN" && <>
                <div className="">
                    <button onClick={()=>toggleGame(true)} className="btn btn-outline-violet">Add Game</button>
                </div>
                <div className="">
                    <button onClick={()=>toggleItem(true)} className="btn btn-outline-violet">Add New Item</button>
                </div>
            </>
            }
        </div>
        <div className="items-container p-3">
            {items.map(item=><ItemCard key={item.name} item={item}/>)}
        </div>
        </div>
        {addToInventory && <PopUpContainer element={<AddToInventory/>} onClick={()=>toggleToInventory(false)}/>}
        {addItem && <PopUpContainer element={<AddItem/>} onClick={()=>toggleItem(false)} />}
        {addGame && <PopUpContainer element={<AddGame/>} onClick={()=>toggleGame(false)} />}
    </> 
}