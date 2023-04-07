import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../components/button/FormButton";
import "./Login.css"
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";


export default function Login(){
    const navigate = useNavigate()
    const [user,setUser] = useState({username:"",password:""})
    const [error, setError] = useState(false)
    const [validation,SetValidation] = useState(false)
    const {updateToken} = useContext(UserContext)


    const handleInputChange = (event)=>{
      const{name,value} = event.target;
      setUser({...user,[name]:value})
    }


    const handleSubmit = async (event) => {
      event.preventDefault();
      if(!event.target.checkValidity()){
        event.stopPropagation()
        SetValidation(true)}
      else{
        try {
          const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          if (!response.ok) {
            throw new Error(await response.text());
          }
          const data = await response.json();
          updateToken(data.token)
          navigate("/", { replace: true })
        } catch (error) {
          setError(true)
        }
      }
     };



    return <div className="d-flex justify-content-center align-items-center bg-dark vh-100">
      <div className="login text-light form-card p-5 rounded-3">
        <form className={`mb-5 ${validation ? "was-validated" : "needs-validation"}`} onSubmit={handleSubmit} noValidate>
          <h3 className="text-center mb-3">LOG IN</h3>
          
          

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className={`form-control validation-form-control ${error ? "is-invalid" : ""}`} type="text" value={user.username} name="username" placeholder="Username" onChange={handleInputChange} required/>
            <div className="invalid-feedback">
              Check Credentials.
            </div>
          </div>
          
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input className={`form-control validation-form-control ${error ? "is-invalid" : ""}`} type="password" value={user.password} name="password" placeholder="Password" onChange={handleInputChange} required/>
            <div className="invalid-feedback">
            Check Credentials.
            </div>
          </div>
          
          <div>
            <FormButton className="w-75 fs-5" text="Log In"/>
          </div>
        </form>
        <p className="text-center">Don't have an account? <Link to="/register" className="link text-decoration-none">Register</Link></p>
      </div>
    </div>
}

//<input
//type="password"
//value={password}
//name="password"
//id="password"
//className="form-control"
//placeholder="Password"
//onChange={(e)=>setPassword(e.target.value)}
//required/>

//<input
//type="text"
//value={username}
//name="name"
//id="username"
//className="form-control"
//placeholder="Username"
//onChange={(e)=>{setUsername(e.target.value); setError(null)}}
//required/>