export default function NoContent({text, height="auto"}){
    return <div className="text-light" style={{height:height,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.5rem"}}>
        {text}
    </div>
}