import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../components/button/FormButton";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ApiService from "../../services/ApiService";
import { Toaster, toast } from "react-hot-toast";


export default function Register(){
    const navigate = useNavigate()
    const [newUser,setNewUser] = useState({email:"", username:"",password:""})
    const [error,setError] = useState(false)
    const {login,token} = useContext(UserContext) 
    
    useEffect(()=>{
        if(token){
          navigate("/", { replace: true })
        }
      })


    const handleInputChange = (event)=>{
        const{name,value} = event.target;
        setNewUser({...newUser,[name]:value})

        if(error) setError(false)
      }

    async function handleSubmit(event){
        event.preventDefault()
        try{
            const data = await ApiService.register(newUser)
            login(data.token, data.role, data.username,data.id)
            navigate("/", { replace: true })

        }catch(error){
            setError(true)
            toast.error(error.message)
        }
        }



    
    return <div className="d-flex justify-content-center align-items-center bg-dark vh-100"> 
        <Toaster position="top-center" toastOptions={{duration: 3000,style: {background: '#333',color: '#fff',}}}/>
        <div className="auth-container text-light form-card p-5 rounded-3">
            <form className={"mb-5"} onSubmit={handleSubmit}>
                <h3 className="text-center mb-3">REGISTER</h3>
                <div className="form-group mb-3 ">
                    <label className="form-label">Email</label>
                    <input className={`form-control validation-form-control  ${error ? "invalid" : ""}`} type="email" placeholder="Email" name="email" value={newUser.email} onChange={handleInputChange} required/>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Username</label>
                    <input className={`form-control validation-form-control  ${error ? "invalid" : ""}`} type="text" placeholder="Username" name="username" value={newUser.username}  onChange={handleInputChange} required/>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Password</label>
                    <input className={`form-control validation-form-control  ${error ? "invalid" : ""}`} type="password" placeholder="Password" name="password" value={newUser.password} onChange={handleInputChange} required/>
                </div>
                <div>
                    <FormButton className="w-75 fs-5" text="Register"/>
                </div>
            </form>
            <p className="text-center">Already have an account? <Link to="/login" className="toggle-auth text-decoration-none">Log In</Link></p>
        </div>
    </div>
}

