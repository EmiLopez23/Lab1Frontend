import { useContext } from "react";
import Chat from "./Chat";
import "./ChatRoom.css"
import SideBar from "./SideBar";
import { UserContext } from "../../contexts/UserContext";

export default function ChatRoom(){
    const {username,id,token} = useContext(UserContext)
    return <div className="chat-room-container">
        <SideBar username={username} token={token}/>
        <Chat username={username} senderId={id}/>
    </div>
}