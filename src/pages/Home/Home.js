import { useNavigate } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import "./Home.css"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"

export default function Home(){
    
    const navigate = useNavigate()
    const {token} = useContext(UserContext) 
    



    return <div className="home"> 
            <header className="header">
                <Navbar/>
            </header>
            <div className="main p-5 vh-100">

            </div>
            </div>
}