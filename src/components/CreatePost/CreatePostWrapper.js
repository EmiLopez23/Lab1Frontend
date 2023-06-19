import { CreatePostProvider } from "../../contexts/CreatePostContext";
import CreatePost from "./CreatePost";

export default function CreatePostWrapper(){
    return <CreatePostProvider>
        <CreatePost/>
    </CreatePostProvider>
}