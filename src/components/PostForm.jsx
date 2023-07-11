import { useState } from "react"
import useAuthContext from "../hooks/useAuthConext"
import usePostsContext from "../hooks/usePostsContext"
import BASE_URL from "../global/baseUrl"


export default function PostForm() {
    const reset = {
        message: ""
    }
    const [post, setPost] = useState(reset)

    const { dispatch } = usePostsContext()

    const { user } = useAuthContext()

    async function handleSubmit(e) {
        e.preventDefault()

        const requestOptions = {
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${user.token}`
            }
        }


        const response = await fetch(BASE_URL + "/api/chat", requestOptions)
        const json = await response.json()






        if (response.ok) {


            console.log(json.user_id)
            console.log("New message added", post)
            dispatch({ type: "CREATE_POST", payload: json })
            setPost(reset)
        }

        console.log(post)


    }



    return (
        <form className="create">
            <input
                type="text"
                value={post.message}
                onChange={(e) => setPost(prev => {
                    return {
                        message: e.target.value
                    }
                })}
            />
            <button onClick={handleSubmit}>Send</button>
        </form>
    )
}