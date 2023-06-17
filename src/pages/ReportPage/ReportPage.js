import { useContext, useEffect, useState } from "react"
import ApiService from "../../services/ApiService"
import { UserContext } from "../../contexts/UserContext"
import ReportInfo from "../../components/ReportInfo/ReportInfo"
import NoContent from "../../components/NoContent/NoContent"
import { useNavigate } from "react-router-dom"

export default function ReportPage(){
    const {token,role} = useContext(UserContext)
    const [reports,setReports] = useState([])
    const navigate = useNavigate()
    
    async function fetchReports(){
        try{
            const reports = await ApiService.getReports(token)
            setReports(reports)
            console.log(reports)
            }catch(error){
                console.log(error)
            }
        }
    
    useEffect(()=>{
        if(role!=="ADMIN"){
            navigate("/home")
        }
        else fetchReports()
           
    },[token,role])

    
    
    return <div className="text-light p-3">
        <h3>Reports</h3>
        <div className="info-header">
            <div>Subject</div>
            <div>Reporter</div>
            <div>Content</div>
            <div>Actions</div>
        </div>
        {reports.length === 0
        ? <NoContent text={"No reports"} height={"50vh"}/>
        : reports?.map((report,index)=><ReportInfo report={report} key={index} fetchReports={fetchReports}/>)}
    </div>
}