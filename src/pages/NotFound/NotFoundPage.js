
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import React from "react";


export default function NotFoundPage(){
    return <div className="bg-dark vh-100 d-flex align-items-center justify-content-center flex-column">
        <div className="text-light fs-1 d-flex align-items-center gap-2 ">
            <FontAwesomeIcon icon={faCircleXmark} className="text-danger"/>
            <h1>404</h1>
            </div>
        <div className="text-light">PAGE NOT FOUND</div>
    </div>    
}