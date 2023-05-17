import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Post.css"
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import ItemImg from "../ItemCard/ItemImg";

export default function Post(){
    const [items,setItems] =useState([])
    const{token} = useContext(UserContext)

    useEffect(()=>{
        fetch("http://localhost:8080/inventory/all", {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data =>{
            setItems(data);
        })
    })

    return <div className="post-card rounded-1 text-secondary w-75 p-3">
        <div className="post-header mb-2 p-2 fs-5">
            <div className="profile-pic me-2"><FontAwesomeIcon icon={faCircleUser} /></div>
            <div className="username">username</div>
        </div>
        <div className="post-main">
            <div>
                <div className="mb-2">Offered</div>
                <div className="items">
                    {items.map((item,index)=><ItemImg key={index} width={100} item={item}/>)}
                </div>
            </div>
            <div className="text-light trade-btn-container">
                <FontAwesomeIcon icon={faRotate} className="trade-icon"/>
            </div>
            <div>
                <div className="mb-2">Wanted</div>
                <div className="items">
                    {items.map((item,index)=><ItemImg key={index} width={100} item={item}/>)}
                </div>
            </div>
        </div>
    </div>
}