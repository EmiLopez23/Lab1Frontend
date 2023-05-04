import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import {PublicRoutes} from "../consts/Constants.js"



export default function AuthGuard(){
    const {token} = useContext(UserContext)
    return (token) ? <Outlet/> : <Navigate replace to={PublicRoutes.LOGIN}/> 
}