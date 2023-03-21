import React, {useState} from "react";
import { Link } from "react-router-dom";


export default function Register(){
    const [email,setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");


    function handleSubmit(event){
        event.preventDefault()
        const user={
            username: event.target.name.value,
            password:event.target.password.value,
            email: event.target.email.value
        }
        console.log(user)
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
                    onChange={(target)=>setEmail(target.value)}
                    required/>
                <input
                    type="text"
                    value={username}
                    name="name"
                    placeholder="Username"
                    onChange={(target)=>setUsername(target.value)}
                    required/>
                <input
                    type="password"
                    value={password}
                    name="password"
                    placeholder="Password"
                    onChange={(target)=>setPassword(target.value)}
                    required/>
                <button>Register</button>
            </form>
            
            <div className="login-btn">
                    <p>Already have an Account? <Link to="/login" className="link">Log In</Link></p>
                </div>
        </div>
    </div>
}