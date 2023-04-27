import React from "react";
import "./ItemCard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";

export default function ItemCard({item}){
    return <div className="rounded-1 item-card">
        <div>
        <img src={`http://localhost:8080/${item.imgPath}`} className="rounded-1 item-img" alt="autito"></img>
        </div>
        <div className="info-btn">
            <button className="btn rounded-5 info-button"><FontAwesomeIcon className="mx-1" icon={faInfo} /></button>
        </div>
    </div>
}