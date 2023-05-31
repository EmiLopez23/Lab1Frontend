import React, { useContext,useState } from "react";
import "./inventory.css"
import { UserContext } from "../../contexts/UserContext";
import AddItem from "../../components/AddItem/AddItem";
import PopUpContainer from "../../components/PopUpContainer/PopUpContainer";
import GeneralInventory from "../../components/Inventories/GeneralInventory";
import PersonalInventory from "../../components/Inventories/PersonalInventory";
import AddGamePopUp from "../../components/AddGamePopUp/AddGamePopUp";

export default function Inventory(){
    const {role} = useContext(UserContext)
    const [addItem,toggleItem] = useState(false)
    const [addGame,toggleGame] = useState(false)
    const [inventory,setInventory] = useState(0)



    return <>
        <div className="main-section px-5 mt-4">
        
        <div className="d-flex justify-content-between align-items-center gap-2">
            <div className="d-flex gap-2">
                <button className={`btn toggle-inventory-btn ${inventory===0 ? "active" : ""}`} onClick={()=>setInventory(0)}>All</button>
                <button className={`btn toggle-inventory-btn ${inventory===1 ? "active" : ""}`} onClick={()=>setInventory(1)}>My Inventory</button>
            </div>
            {role==="ADMIN" && <div className="d-flex gap-2">
                        <button onClick={()=>toggleGame(true)} className="btn toggle-inventory-btn">Add Game</button>
                        <button onClick={()=>toggleItem(true)} className="btn toggle-inventory-btn" >Add New Item</button>
                    </div>
            }
        
        </div>
        {inventory === 0 ?
            <GeneralInventory/>
        :
            <PersonalInventory/>
        }
        </div>
        {addItem && <PopUpContainer element={<AddItem/>} onClick={()=>toggleItem(false)} />}
        {addGame && <PopUpContainer element={<AddGamePopUp/>} onClick={()=>toggleGame(false)} />}
    </> 
}