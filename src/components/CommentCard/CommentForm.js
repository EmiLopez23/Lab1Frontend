import { useState } from "react"
import { toast } from "react-hot-toast"

export default function CommentForm({token,username,subjectUsername,commentSetter,comments}){
    const [comment,setComment] = useState("")

    function postComment(event){
        event.preventDefault()
        setComment("")
        const sendObject = {subjectUsername,content:comment}
        fetch("http://localhost:8080/user/comment",{
            method:"POST",
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json"},
            body:JSON.stringify(sendObject)
        })
        .then(resp=>{
            if(!resp.ok){
                toast.error("Couldn't post comment")
            }
            else commentSetter([{commenter:username,content:comment},...comments])
        })
    }
    return <form onSubmit={postComment} style={{display:"flex", flexDirection:"row",gap:10, marginBottom:10}}> 
            <input type="text" className="form-control" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Leave a comment..."/>
            <button type="submit" className="btn btn-primary">Comment</button>
        </form>
}