import React,{useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../components/button/FormButton";
import "./Login.css"
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import ApiService from "../../services/ApiService";


export default function Login(){
    const navigate = useNavigate()
    const [user,setUser] = useState({username:"",password:""})
    const [error, setError] = useState(false)
    const [validation,SetValidation] = useState(false)
    const {login,token} = useContext(UserContext)

    useEffect(()=>{
      if(token){
        navigate("/", { replace: true })
      }
    })


    const handleInputChange = (event)=>{
      const{name,value} = event.target;
      setUser({...user,[name]:value})
    }


    async function handleSubmit(event){
      event.preventDefault();
      
      if(!event.target.checkValidity()){
        event.stopPropagation();
        SetValidation(true)
        return;
      }
      
      
      try {  
          const data = await ApiService.login(user)
          login(data.token, data.role)
          navigate("/", { replace: true })

        } catch (error) {
          setError(true)
          SetValidation(false)
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
