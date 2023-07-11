import { formatDistanceToNow } from "date-fns"
import useAuthContext from "../hooks/useAuthConext"
import usePostsContext from "../hooks/usePostsContext"
import BASE_URL from "../global/baseUrl"

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

        const res = await fetch(`${BASE_URL}${post._id}`, reqOptions)
        const json = await res.json()

        if (res.ok) {
            dispatch({ type: "DELETE_POST", payload: json })
        }
    }

    return (
        <div className={`post-details element ${active}`}>
            <div className="left">
                <p className="email">{active? "Me" : post.user_id}</p>
                <p className="message">{post.message}</p>
                <span>{
                    formatDistanceToNow(new Date(post.createdAt),
                        { addSuffix: true })
                }</span>

            </div>
            <div className="right">
                {active && <span className="material-symbols-outlined" onClick={handleClick}>delete</span>}
            </div>


        </div>
    )
}