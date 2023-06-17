import { useState } from "react"
import { toast } from "react-hot-toast"

export default function ReportUserForm({username,token,close}){
    const [content,setContent]=useState("")

    function handleSubmit(event){
        event.preventDefault()
        const form = {subjectUsername:username,content:content}
        fetch("http://localhost:8080/user/report",{
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type":"application/json"
            },
            method:"POST",
            body:JSON.stringify(form)
        })
        .then(resp=>{
            if(!resp.ok){
                toast.error("error reporting user")
            }
            else {
                close()
                toast.success("report sent to admins")}
        })
    }
    return (
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div>
                <label htmlFor="content" className="form-label">Report Reason</label>
                <textarea id="content" className="form-control" value={content} onChange={(e)=>setContent(e.target.value)} style={{resize:"none",width:200,height:170}} />
            </div>
            <button type="submit" className="btn btn-danger">Report User</button>
        </form>
    )
}