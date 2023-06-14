import { toast } from "react-hot-toast"
import "./ReportInfo.css"

export default function ReportInfo({subject,reporter,content,reportId}){

    function handleBan(action){
        fetch(`http://localhost:8080/admin/report/${reportId}?ban=${action}`,{
            method:"POST"
        })
        .then(resp=>{
            if(!resp.ok){
                toast.error("couldn't ban user")
            }
            else if(action){ toast.success(`${subject} banned`)}
            else toast.success(`Report Dismissed`)
        })
    }


    return <div className="report-container">
        <div className="subject">{subject}</div>
        <div className="reporter">{reporter}</div>
        <div className="content">{content}</div>
        <div className="actions-btn">
            <button className="btn btn-danger" onClick={()=>handleBan(true)}>Ban User</button>
            <button className="btn btn-success" onClick={()=>handleBan(false)}>Dismiss Report</button>
        </div>
    </div>
}