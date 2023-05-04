import "./navbar.css"
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";


export default function Navbar(){

    const {logout} = useContext(UserContext)
    

    return <div className="navbar navbar-expand-lg bg-dark p-3 justify-content-between">
    <div className="items-container">
      <ul className="navbar-items">
        <li className="navbar-li"><Link className="navbar-link" to={"/"}>Home</Link></li>
        <li className="navbar-li"><Link className="navbar-link" to={"/inventory"}>Inventory</Link></li>
      </ul>
            
    </div>
        
        <button className="btn btn-outline-danger flex-end" onClick={logout}>Log Out</button>
    </div>

}

//<form className="d-flex">
      //      <input className="form-control me-2 " type="search" placeholder="Search"/>
      //      <button className="btn search-btn" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      //  </form>
