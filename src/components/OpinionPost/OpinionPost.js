import { useState } from "react"
import StarRating from "../StartRating/StarRating"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function OpinionPost({username,token,acceptTrade}){
    const [rating,setRate] = useState(0)
    const [content,setContent] = useState("")
    const navigate = useNavigate()

    function handleSubmit(event){
        event.preventDefault()
        const send = {subjectUsername:username,rating,content}
        acceptTrade()
        fetch("http://localhost:8080/user/review",{
            method:"POST",
            headers:{Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"},
            body:JSON.stringify(send)
        })
        .then(resp=>{
            if(!resp.ok){
                toast.error("couldn't send review")
            }
            else{
                navigate("/home")
            }
        })
    }

    return <form onSubmit={handleSubmit} className="text-light d-flex flex-column gap-2">
        <label>How was your experience with {username}</label>
        <StarRating rating={rating} setRating={setRate}/>
        <label>Leave a comment</label>
        <textarea id="content" className="form-control" value={content} onChange={(e)=>setContent(e.target.value)} style={{resize:"none",height:200}} />
        <button type="submit" className="btn btn-success">Send feedback</button>
    </form>


}