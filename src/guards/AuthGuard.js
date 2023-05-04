import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import {PrivateRoutes} from "../consts/Constants.js"



export default function AuthGuard(){
    const {token} = useContext(UserContext)
    return (token) ? <Outlet/> : <Navigate replace to={PrivateRoutes.LOGIN}/> 
}