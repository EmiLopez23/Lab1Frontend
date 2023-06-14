import { useContext, useEffect, useState } from "react"
import ApiService from "../../services/ApiService"
import { UserContext } from "../../contexts/UserContext"
import ReportInfo from "../../components/ReportInfo/ReportInfo"

export default function ReportPage(){
    const {token} = useContext(UserContext)
    const [reports,setReports] = useState([])
    useEffect(()=>{
        async function fetchReports(){
            try{
                const reports = await ApiService.getReports(token)
                setReports(reports)
                console.log(reports)
            }catch(error){
                console.log(error)
            }
        }
        fetchReports()   
    },[token])
    
    return <div className="text-light p-3">
        <h3>Reports</h3>
        <div className="info-header">
            <div>Subject</div>
            <div>Reporter</div>
            <div>Content</div>
            <div>Actions</div>
        </div>
        {reports?.map((report,index)=><ReportInfo subject={report.subjectUsername} reporter={report.reporterUsername} content={report.content} reportId={report.reportId} key={index}/>)}
    </div>
}