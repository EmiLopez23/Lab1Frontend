import "./navbar.css"
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";


export default function Navbar(){
    const navigate = useNavigate()
    const {logout} = useContext(UserContext)
    const logo = "logoTradePal.png"
    

    return <div className="navbar navbar-expand-lg bg-dark p-3 justify-content-between">
    <div className="items-container">
      <img src={logo} alt="logo" className="logo" onClick={()=>navigate("/",{replace:true})}/>
      <ul className="navbar-items">
        <li className="navbar-li"><Link className="navbar-link" to={"/inventory"}>Inventory</Link></li>
        <li className="navbar-li"><Link className="navbar-link" to={"/create-post"}>Create Post</Link></li>
      </ul>
            
    </div>
        
        <button className="btn btn-outline-danger flex-end" onClick={logout}>Log Out</button>
    </div>

}

//<form className="d-flex">
      //      <input className="form-control me-2 " type="search" placeholder="Search"/>
      //      <button className="btn search-btn" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      //  </form>
