import React,{useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../components/button/FormButton";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import ApiService from "../../services/ApiService";
import { Toaster, toast } from "react-hot-toast";


export default function Login(){
    const navigate = useNavigate()
    const [user,setUser] = useState({username:"",password:""})
    const [error,setError] = useState(false)
    const {login,token} = useContext(UserContext)

    useEffect(()=>{
      if(token){
        navigate("/", { replace: true })
      }
    })


    const handleInputChange = (event)=>{
      const{name,value} = event.target;
      setUser({...user,[name]:value})

      if(error) setError(false)
    }


    async function handleSubmit(event){
      event.preventDefault();
      
      try {  
          const data = await ApiService.login(user)
          login(data.token, data.role,data.username)
          navigate("/", { replace: true })

        } catch (error) {
          setError(true)
          toast.error(error.message)
        }
      
      };



    return <div className="d-flex justify-content-center align-items-center bg-dark vh-100">
      <Toaster position="top-center" toastOptions={{duration: 3000,style: {background: '#333',color: '#fff',}}}/>
      <div className="auth-container text-light form-card p-5 rounded-3">
        <form className={`mb-5`} onSubmit={handleSubmit}>
        
          <h3 className="text-center mb-3">LOG IN</h3>
        
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input className={`form-control validation-form-control ${error ? "invalid" : ""}`} type="text" value={user.username} name="username" placeholder="Username" onChange={handleInputChange} required/>
            {error && <p style={{color:"rgb(196, 54, 54)",paddingTop:5}}>Check credentials</p>}
          </div>
          
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input className={`form-control validation-form-control ${error ? "invalid" : ""}`} type="password" value={user.password} name="password" placeholder="Password" onChange={handleInputChange} required/>
            {error && <p style={{color:"rgb(196, 54, 54)",paddingTop:5}}>Check credentials</p>}
          </div>
          
          <div>
            <FormButton className="w-75 fs-5" text="Log In"/>
          </div>
        </form>
        <p className="text-center">Don't have an account? <Link to="/register" className="link text-decoration-none">Register</Link></p>
      </div>
    </div>
}
