export default function StatCard({title, stat}){
    return <div className="stat-card">
        <div className="stat-title">{title}</div>
        <div className="stat">{stat}</div>
    </div>
}