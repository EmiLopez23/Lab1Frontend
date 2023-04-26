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

    
    function openItemToInventoryAdder(){
        toggleToInventory(true)
    }

    function closeItemToInventoryAdder(){
        toggleToInventory(false)
    }

    function openItemGenerator(){
        toggleItem(true)
    }

    function closeItemGenerator(){
        toggleItem(false)
    }

    function openGameGenerator(){
        toggleGame(true)
    }

    function closeGameGenerator(){
        toggleGame(false)
    }


    return <>
        <div className="main-section px-5">
        <div>
            <h1 className="text-light">Inventory</h1>
        </div>
        
        <div className="d-flex justify-content-end gap-2">
            <div className="">
                <button onClick={openItemToInventoryAdder} className="btn add-btn">Add Item to Inventory</button>
            </div>
            {role==="ADMIN" && <>
                <div className="">
                    <button onClick={openGameGenerator} className="btn add-btn">Add Game</button>
                </div>
                <div className="">
                    <button onClick={openItemGenerator} className="btn add-btn">Add New Item</button>
                </div>
            </>
            }
        </div>
        <div className="items-container p-3">
            {items.map(item=><ItemCard key={item.name} item={item}/>)}
        </div>
        </div>
        {addToInventory && <PopUpContainer element={<AddToInventory/>} onClick={closeItemToInventoryAdder}/>}
        {addItem && <PopUpContainer element={<AddItem/>} onClick={closeItemGenerator} />}
        {addGame && <PopUpContainer element={<AddGame/>} onClick={closeGameGenerator} />}
    </> 
}