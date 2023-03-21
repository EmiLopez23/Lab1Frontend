import "./navbar.css"


export default function Navbar(){

    return <div className="nav-bar">
        <div className="logo">TradePal</div>
        <button className="log-out" onClick={()=>{localStorage.removeItem("token"); window.location.reload(false);}}>Log Out</button>
    </div>

}
