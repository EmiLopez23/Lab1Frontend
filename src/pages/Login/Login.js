import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"


export default function Login(){
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");

    const user = {username,password}

    function handleSubmit(event){
        event.preventDefault()
        fetch("http://localhost:8080/login",{
            headers:{
                "Content-Type":"application/json"
            },
            method:"post",
            body: JSON.stringify(user)
        }).then((response)=>{
            if (!response.ok) {
            throw new Error(response.statusText);
            }
            return response.json()})
            .then(data=>{
                localStorage.setItem("token",data)
                navigate("/")
            })
            .catch(error=>{
            alert("Wrong Credentials")
            console.error("error: ", error )
            })
        
    }

    return <div className="body"> 
        <div className="card">
            <div className="title">
                <h1>LOG IN</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    name="name"
                    placeholder="Username"
                    onChange={(e)=>setUsername(e.target.value)}
                    required/>
                <input
                    type="password"
                    value={password}
                    name="password"
                    placeholder="Password"
                    onChange={(e)=>setPassword(e.target.value)}
                    required/>
                <button>Log In</button>
            </form>
            <div className="register-btn">
                    <p>Don´t have an Account? <Link to="/register" className="link">Register</Link></p>
                </div>
        </div>
    </div>
}