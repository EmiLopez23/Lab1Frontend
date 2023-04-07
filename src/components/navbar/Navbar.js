import "./navbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";


export default function Navbar(){

    const {updateToken} = useContext(UserContext)
    const logOut = ()=>{
        updateToken(null)
    }

    return <div className="navbar navbar-expand-lg bg-dark p-3 justify-content-between">
        <div className="">
            <a className="navbar-brand text-light" href="/">TradePal</a>
        </div>
        <form className="d-flex w-25">
            <input className="form-control me-2 " type="search" placeholder="Search"/>
            <button className="btn search-btn" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
        </form>
        <button className="btn btn-outline-danger flex-end" onClick={logOut}>Log Out</button>
    </div>

}
