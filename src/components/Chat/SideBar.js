import { useEffect, useState } from "react"
import "./SideBar.css"
import ApiService from "../../services/ApiService"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"

export default function SideBar({username,token, id}){
    const [contacts,setContacts] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
        async function fetchContacts(){
            try{
                const contacts = await ApiService.getContacts(token)
                const c = contacts?.map(contact=>contact={id:contact.id,username:contact.username})
                setContacts(c)
            }catch(error){
                console.log(error)
            }
        }
        fetchContacts()
    },[token])


    return <div className="sidebar-container text-light">
        <div className="sidebar-username">
            <h4 className="m-0">{username}</h4>
            <button className="btn btn-secondary"><FontAwesomeIcon icon={faHouse} size="xs" /></button>    
        </div>
        
        <div className="sidebar-chats">
            {contacts?.map((contact,index)=><div className={`contact ${parseInt(id)===contact.id ? "active" : ""}`} key={index} onClick={()=>navigate(`/chat/${contact.id}`)}>{contact.username}</div>)}
        </div>
    </div>
}