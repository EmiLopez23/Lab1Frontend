import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Wrapper(){
    return(
        <>
        <div className="header mb-4">
            <Navbar/>
        </div>
        <Outlet/>
        </>
    )
}