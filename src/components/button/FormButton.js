import React from "react";
import "./formButton.css"

export default function FormButton(props){
    
    
    return <div className="d-flex justify-content-center">
    <button type="submit" className={`btn btn-violet mt-3 ${props.className}`}>{props.text}</button>
    </div>
}