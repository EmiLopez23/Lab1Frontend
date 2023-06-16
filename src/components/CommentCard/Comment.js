import "./Comment.css"

export default function Comment({commenter, content}){
    return <div className="comment-card rounded-1 text-secondary p-3">
        <div className="comment-header mb-2 px-2 pb-2">
            <div className="username fs-5">{commenter}:</div>
        </div>
        <div className="comment-main">
            {content}
        </div>
    </div>
}
