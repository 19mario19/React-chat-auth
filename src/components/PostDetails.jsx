import { formatDistanceToNow } from "date-fns"
import useAuthContext from "../hooks/useAuthConext"
import usePostsContext from "../hooks/usePostsContext"

export default function PostDetails({ post }) {

    const { dispatch } = usePostsContext()

    const { user } = useAuthContext()

    const active = user.email === post.user_id ? "active" : ""

    async function handleClick(e) {
        e.preventDefault()

        if(user.email !== post.user_id){
            console.log("You cannot delete message from another user")
            return
        }

        console.log("Delete")

        if (!user) {
            return
        }
        const reqOptions = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }

        const res = await fetch(`/api/chat/${post._id}`, reqOptions)
        const json = await res.json()

        if (res.ok) {
            dispatch({ type: "DELETE_POST", payload: json })
        }
    }

    return (
        <div className={`post-details ${active}`}>
            <div className="left">
                <p className="email">{post.user_id}</p>
                <p className="message">{post.message}</p>
                <span>{
                    formatDistanceToNow(new Date(post.createdAt),
                        { addSuffix: true })
                }</span>

            </div>
            <div className="right">
                <span className="material-symbols-outlined" onClick={handleClick}>x</span>
            </div>


        </div>
    )
}