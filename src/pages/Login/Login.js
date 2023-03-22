import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"


export default function Login(){
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error, setError] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const credentials = { username, password };
    
        try {
          const response = await fetch("http://localhost:8080/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });
          if (!response.ok) {
            throw new Error(await response.text());
          }
          const data = await response.json();
          localStorage.setItem("token",data.token);
          navigate("/");
        } catch (error) {
          setError(error.message);
        }
      };

    return <div className="body"> 
        <div className="card">
            <div className="title">
                <h1>LOG IN</h1>
            </div>
            {error && <div>{error}</div>}
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