import { toast } from "react-hot-toast"
import "./ReportInfo.css"
import { useState } from "react"
import AdminChat from "../Chat/AdminChat"

export default function ReportInfo({report,fetchReports}){
    const {subjectUsername,subjectId,reporterUsername,reporterId,reportId,content} = report
    const [showChat,setShowChat] = useState(false)


    function handleBan(action){
        fetch(`http://localhost:8080/admin/report/${reportId}?ban=${action}`,{
            method:"POST"
        })
        .then(resp=>{
            if(!resp.ok){
                toast.error("couldn't ban user")
            }
            else if(action){ toast.success(`${subjectUsername} banned`)
                    fetchReports()}
            else{ toast.success(`Report Dismissed`)
                    fetchReports()}
        })
    }


    return <section className="report-section"> 
        <div className="report-container">
            <div className="subject">{subjectUsername}</div>
            <div className="reporter">{reporterUsername}</div>
            <div className="content">{content}</div>
            <div className="actions-btn">
                <button className="btn btn-primary" onClick={()=>setShowChat(!showChat)}>Chat</button>
                <button className="btn btn-success" onClick={()=>handleBan(false)}>Dismiss Report</button>
                <button className="btn btn-danger" onClick={()=>handleBan(true)}>Ban User</button>
            </div>
        </div>
        {showChat && <AdminChat senderId={reporterId} receiverId={subjectId} className={"report-chat"}/>}
    </section>
}