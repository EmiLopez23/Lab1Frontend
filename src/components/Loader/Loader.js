import React from "react";
import "./Loader.css"

export default function Loader(){
    return <div className="spinner-wrapper vh-100 bg-dark d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
        </div>
    </div>

}