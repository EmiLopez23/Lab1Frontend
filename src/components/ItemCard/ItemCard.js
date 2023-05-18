import React, { useState } from "react";
import "./ItemCard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import ItemInfoCard from "../ItemInfoCard/ItemInfoCard";
import PopUpContainer from "../PopUpContainer/PopUpContainer";
import ItemImg from "./ItemImg";

export default function ItemCard({item}){
    const [info,showInfo] = useState(false)
    /*Container to show the item images.
     When Hover it shows an info btn that shows a popup with more info*/
    return <div className="rounded-1 item-card">
        <ItemImg item={item} width={134}/>
        <div className="info-btn">
            <button className="btn rounded-5 info-button" onClick={()=>showInfo(true)}><FontAwesomeIcon className="mx-1" icon={faInfo} /></button>
        </div>
        {info && <PopUpContainer element={<ItemInfoCard item={item}/>} onClick={()=>showInfo(false)}/>}
    </div>
}