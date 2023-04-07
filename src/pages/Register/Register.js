import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import FormButton from "../../components/button/FormButton";
import "./Register.css"
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";


export default function Register(){
    const navigate = useNavigate()
    const [newUser,setNewUser] = useState({email:"", username:"",password:""})
    const[error,setError]=useState(false)
    const {updateToken} = useContext(UserContext)
    const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$"); 
    
    
    const handleInputChange = (event)=>{
        const{name,value} = event.target;
        setNewUser({...newUser,[name]:value})

        if (name === 'password') {
            const isValid = passwordRegex.test(value);
            isValid 
            ? event.target.classList.remove("is-invalid")
            : event.target.classList.add("is-invalid");
          }
      }

    async function handleSubmit(event){
        event.preventDefault()
        if (event.target.elements.password.validity.patternMismatch) {
            setError(true);
            console.log("La contraseña no cumple con el patrón especificado");
            
            console.log(passwordRegex.test(newUser.password))
          }
        else if(!event.target.checkValidity()){
            event.stopPropagation()
            setError(true)
            console.log("NO se mando el formulario")
        }
        else{
            console.log("se mando el formulario")
           // try{
           //     const response = await fetch("http://localhost:8080/api/auth/register", {
           //         method: "POST",
           //         headers: {
           //           "Content-Type": "application/json",
           //         },
           //         body: JSON.stringify(newUser),
           //       })
           //   
           //     if (!response.ok) {
           //         throw new Error(await response.text());
           //         }
           //     const data = await response.json();
           //     updateToken(data.token)
           //     navigate("/")
           // }catch(error){
           //     setError(true)
           // }
        }
    }



    
    return <div className="d-flex justify-content-center align-items-center bg-dark vh-100"> 
        <div className="register text-light form-card p-5 rounded-3">
            <form className={`mb-5 ${error ? "was-validated" : "needs-validation"}`} onSubmit={handleSubmit} noValidate>
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


//<input
//type="email"
//value={email}
//name="email"
//placeholder="Email"
//onChange={(e)=>setEmail(e.target.value)}
//required/>
//<input
//type="text"
//value={username}
//name="name"
//placeholder="Username"
//onChange={(e)=>setUsername(e.target.value)}
//required/>
//<input
//type="password"
//value={password}
//name="password"
//placeholder="Password"
//onChange={(e)=>setPassword(e.target.value)}
//required/>