import { useContext, useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import { UserContext } from "../../contexts/UserContext";
import Post from "../../components/PostCard/Post";
import "./PostInvite.css"
import { faMessage, faRepeat, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-hot-toast";

export default function PostInvite(){
    const {id} = useParams()
    const {token} = useContext(UserContext)
    const [invite,setInvite] = useState({})
    const [trade,setTrade] = useState({id:0,gameName:"",username:"",offered:[],wanted:[]})
    const navigate = useNavigate()

    useEffect(()=>{
        async function fetchInvites(){
            const data = await ApiService.getInvites(token)
            const filtered = data.find(trade=>trade.tradeId === parseInt(id))
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

    function acceptTrade(){
        fetch(`http://localhost:8080/post/accept-invite/${invite.tradeId}`,{
            method:'POST',
            headers:{Authorization:`Bearer ${token}`}
        }).then(resp=>{
            if(!resp.ok){
                throw new Error("Couldn't accept Trade")
            }
            else{
                toast.success("Trade Accepted, you can see your new Items in your Inventory")
                navigate("/home")}
            }
        )
        .catch(error=>{
            toast.error(error.message)
        })
    }

    function chat(){
        fetch(`http://localhost:8080/create-chat?id=${invite.requesterId}`,{
            method:"POST",
            headers:{Authorization:`Bearer ${token}`}
        })
        .then(resp=>{
            if(resp.ok){
                navigate("/chat")
            }
        }
        )
    }


    return <div className="invite-container">
        <h3 className="invite-desc text-light mb-0">{invite.requesterUsername} wants to trade with you the following items</h3>
        <div className="post-container">
            <Post canTrade={false} trade={trade}/>
        </div>
        <div className="invite-btns">
            <button className="btn btn-primary" onClick={()=>chat()}><FontAwesomeIcon icon={faMessage} /> Chat</button>
            <button className="btn btn-success" onClick={()=>acceptTrade()}><FontAwesomeIcon icon={faRepeat}/> Accept Trade</button>
            <button className="btn btn-danger"><FontAwesomeIcon icon={faXmark} /> Reject Trade</button>
        </div>
    </div>
}