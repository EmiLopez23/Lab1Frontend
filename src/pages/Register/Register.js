import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Register(){
    const navigate = useNavigate()
    const [email,setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const[error,setError]=useState(null)


    function handleSubmit(event){
        event.preventDefault()
        const user={username,password,email}
        try{
            fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
              }).then(resp=>{
                if (!resp.ok) {
                    throw new Error(resp.text());
                  }
                navigate("/login");
              })

              
        }catch(error){
            setError(error.message)
        }
    }

    return <div className="body"> 
        <div className="card">
            <div className="title">
                <h1>REGISTER</h1>
            </div>
            <form onSubmit={handleSubmit}>
            <input
                    type="email"
                    value={email}
                    name="email"
                    placeholder="Email"
                    onChange={(e)=>setEmail(e.target.value)}
                    required/>
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
                <button>Register</button>
            </form>
            
            <div className="login-btn">
                    <p>Already have an Account? <Link to="/login" className="link">Log In</Link></p>
                </div>
        </div>
    </div>
}