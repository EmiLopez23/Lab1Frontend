import React, { useContext,useState } from "react";
import "./Inventory.css"
import { UserContext } from "../../contexts/UserContext";
import AddItem from "../../components/AddItem/AddItem";
import PopUpContainer from "../../components/PopUpContainer/PopUpContainer";
import AddGame from "../../components/AddGame/AddGame";
import GeneralInventory from "../../components/Inventories/GeneralInventory";

export default function Inventory(){
    const {role} = useContext(UserContext)
    const [addItem,toggleItem] = useState(false)
    const [addGame,toggleGame] = useState(false)
    const [inventory,setInventory] = useState(0)



    return <>
        <div className="main-section px-5">
        
        <div className="d-flex justify-content-between align-items-center gap-2">
            <div className="d-flex gap-2">
                <button className={`btn toggle-inventory-btn ${inventory===0 ? "active" : ""}`} onClick={()=>setInventory(0)}>All</button>
                <button className={`btn toggle-inventory-btn ${inventory===1 ? "active" : ""}`} onClick={()=>setInventory(1)}>My Inventory</button>
            </div>
            {role==="ADMIN" && <div className="d-flex gap-2">
                <div className="">
                    <button onClick={()=>toggleGame(true)} className="btn toggle-inventory-btn">Add Game</button>
                </div>
                <div className="">
                    <button className="btn toggle-inventory-btn" onClick={()=>toggleItem(true)}>Add New Item</button>
                </div>
            </div>
            }
        </div>
        {inventory === 0 ?
            <GeneralInventory/>
        :
        <div></div>}
        </div>
        {addItem && <PopUpContainer element={<AddItem/>} onClick={()=>toggleItem(false)} />}
        {addGame && <PopUpContainer element={<AddGame/>} onClick={()=>toggleGame(false)} />}
    </> 
}