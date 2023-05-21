import React, { useState } from "react";
import "./ItemCard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import ItemInfoCard from "../ItemInfoCard/ItemInfoCard";
import PopUpContainer from "../PopUpContainer/PopUpContainer";
import ItemImg from "../ItemImage/ItemImg";
import ItemImgWithQty from "../ItemImage/ItemImgWithQty";

export default function ItemCard({item, hasQty=false}){
    const [info,showInfo] = useState(false)

    function popUpInfo(){
        return hasQty
        ? <ItemInfoCard item={item.item}/>
        : <ItemInfoCard item={item}/>
    }
    /*Container to show the item images.
     When Hover it shows an info btn that shows a popup with more info*/
    return <div className="rounded-1 item-card">
        {!hasQty
            ?<ItemImg item={item} width={134}/>
            :<ItemImgWithQty data={item} width={134}/>}
        <div className="info-btn">
            <button className="btn rounded-5 info-button" onClick={()=>showInfo(true)}><FontAwesomeIcon className="mx-1" icon={faInfo} /></button>
        </div>
        {info && <PopUpContainer element={popUpInfo()} onClick={()=>showInfo(false)}/>}
    </div>
}