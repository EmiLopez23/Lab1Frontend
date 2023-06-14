import "./navbar.css"
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBell as faBellRegular} from "@fortawesome/free-regular-svg-icons";
import NotificationList from "../NotificationList/NotificationList";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import ChatNotification from "../ChatNotification.js/ChatNotification";
import image from "../../logoTradePal.png"


export default function Navbar(){
    const navigate = useNavigate()
    const {logout} = useContext(UserContext)
    const [showNoti,setShowNoti] = useState(false)
    

    return <> 
      <div className="navbar navbar-expand-lg bg-dark p-3 justify-content-between">
        <div className="items-container">
          <img src={image} alt="logo" className="logo" onClick={()=>navigate("/",{replace:true})}/>
          <ul className="navbar-items">
            <li className="navbar-li"><Link className="navbar-link" to={"/inventory"}>Inventory</Link></li>
          </ul>     
        </div>
        <div className="items-container btns-cont">
          <ChatNotification onClick={()=>navigate("/chat")}/>
          <FontAwesomeIcon icon={showNoti ? faBell : faBellRegular} className=" notification-icon btn btn-secondary" onClick={()=>setShowNoti(!showNoti)}/>
          <button className="btn btn-outline-danger flex-end" onClick={logout}>Log Out</button>
        </div>
      </div>
      {showNoti && <NotificationList show={showNoti}/>}
    </>
}

//<form className="d-flex">
      //      <input className="form-control me-2 " type="search" placeholder="Search"/>
      //      <button className="btn search-btn" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      //  </form>
