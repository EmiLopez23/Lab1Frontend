import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { UserContext } from "../../contexts/UserContext";
import Post from "../../components/PostCard/Post";
import "./PostInvite.css"
import { faMessage, faRepeat, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PostInvite(){
    const {id} = useParams()
    const {token} = useContext(UserContext)
    const [invite,setInvite] = useState({})
    const [trade,setTrade] = useState({id:0,gameName:"",username:"",offered:[],wanted:[]})

    useEffect(()=>{
        async function fetchInvites(){
            const data = await ApiService.getInvites(token)
            const filtered = data.find(trade=>trade.tradeId == id)
            setTrade({
                id: filtered.postResponse.id,
                username:filtered.postResponse.username,
                gameName:filtered.postResponse.gameName,
                offered:filtered.postResponse.tradeItems.filter(t=>t.tradeDirection==='OFFERED'),
                wanted:filtered.postResponse.tradeItems.filter(t=>t.tradeDirection==='WANTED')
            })
            setInvite(filtered)
        }

        fetchInvites()
    },[token,id])


    return <div className="invite-container">
        <h3 className="invite-desc text-light mb-0">{invite.requesterUsername} wants to trade with you the following items</h3>
        <div className="post-container">
            <Post canTrade={false} trade={trade}/>
        </div>
        <div className="invite-btns">
            <button className="btn btn-primary"><FontAwesomeIcon icon={faMessage} /> Chat</button>
            <button className="btn btn-success"><FontAwesomeIcon icon={faRepeat} /> Accept Trade</button>
            <button className="btn btn-danger"><FontAwesomeIcon icon={faXmark} /> Reject Trade</button>
        </div>
    </div>
}