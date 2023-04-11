import React from "react";
import "./ItemCard.css"

export default function ItemCard({item}){
    return <div className="bg-secondary rounded-1 item-card">
        <div>
        <img src={`http://localhost:8080/${item.imgPath}`} className="rounded-1 item-img" alt="autito"></img>
        </div>
    </div>
}