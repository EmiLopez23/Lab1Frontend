import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../components/button/FormButton";
import "./Register.css"
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import ApiService from "../../services/ApiService";


export default function Register(){
    const navigate = useNavigate()
    const [newUser,setNewUser] = useState({email:"", username:"",password:""})
    const[error,setError]=useState(false)
    const {login,token} = useContext(UserContext)
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"); 
    
    useEffect(()=>{
        if(token){
          navigate("/", { replace: true })
        }
      })


    const handleInputChange = (event)=>{
        const{name,value} = event.target;
        setNewUser({...newUser,[name]:value})

        if (name === 'password') {
            passwordRegex.test(value) 
            ? event.target.classList.remove("is-invalid")
            : event.target.classList.add("is-invalid");
          }
      }

    async function handleSubmit(event){
        event.preventDefault()
        if(!event.target.checkValidity()){
            event.stopPropagation()
            setError(true)
            return;
        }
        try{
            const data = await ApiService.register(newUser)
            login(data.token, data.role)
            navigate("/", { replace: true })

        }catch(error){
            setError(true)
        }
        }



    
    return <div className="d-flex justify-content-center align-items-center bg-dark vh-100"> 
        <div className="register text-light form-card p-5 rounded-3">
            <form className={`mb-5 ${error ? "was-validated" : "needs-validation"}`} onSubmit={handleSubmit}>
                <h3 className="text-center mb-3">REGISTER</h3>
                <div className="form-group mb-3 ">
                    <label className="form-label">Email</label>
                    <input className={`form-control validation-form-control`} type="email" placeholder="Email" name="email" value={newUser.email} onChange={handleInputChange} required/>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Username</label>
                    <input className={`form-control validation-form-control`} type="text" placeholder="Username" name="username" value={newUser.username}  onChange={handleInputChange} required/>
                </div>
                <div className="form-group mb-3">
                    <label className="form-label">Password</label>
                    <input className={`form-control validation-form-control`} type="password" placeholder="Password" name="password" value={newUser.password} onChange={handleInputChange} required/>
                    <div className="invalid-feedback">
                        Password must have at least 8 characters, one upperCase letter, one lowerCase letter and one number.
                    </div>
                </div>
                <div>
                    <FormButton className="w-75 fs-5" text="Register"/>
                </div>
            </form>
            <p className="text-center">Already have an account? <Link to="/login" className="link text-decoration-none">Log In</Link></p>
        </div>
    </div>
}

