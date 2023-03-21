import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import "./Home.css"

export default function Home(){
    
    const navigate = useNavigate()
    useEffect(()=>{
    if(!localStorage.getItem("token")){
      navigate("/login")
    }
    })



    return <div className="home"> 
            <header className="App-header">
                <Navbar/>
            </header>
            </div>
}