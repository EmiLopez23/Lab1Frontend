import { useEffect, useState } from "react"
import "./SideBar.css"
import ApiService from "../../services/ApiService"
import { useNavigate } from "react-router-dom"

export default function SideBar({username,token}){
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
        <h2 className="sidebar-username">{username}</h2>
        <div className="sidebar-chats">
            {contacts?.map((contact,index)=><div className="contact" key={index} onClick={()=>navigate(`/chat/${contact.id}`)}>{contact.username}</div>)}
            
        </div>
    </div>
}