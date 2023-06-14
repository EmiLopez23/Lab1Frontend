import { faStar } from "@fortawesome/free-regular-svg-icons"
import { faStar as solidStar} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"

export default function StarRating({setRating,rating}){    
    const [clicked,setClicked] = useState([false,false,false,false,false])

    function setStar(i){
        const click = clicked.map((c,index)=>index === i ? c = !c : c)
        setClicked(click)
    }
    
    return (<div style={{color:"yellow"}}>
        {clicked.map((star,index)=><span onClick={()=>{setStar(index); setRating(rating+1)}}><FontAwesomeIcon icon={star ? solidStar : faStar}/></span>)}
    </div>
        
    )
}