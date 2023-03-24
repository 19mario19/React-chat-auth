import { useEffect, useRef } from "react";
import PostDetails from "../components/PostDetails";
import PostForm from "../components/PostForm";
import useAuthContext from "../hooks/useAuthConext";
import usePostsContext from "../hooks/usePostsContext";

export default function Home() {
    const { posts, dispatch } = usePostsContext()
    const { user } = useAuthContext()
    const divRef = useRef(null);


    useEffect(() => {
        async function fetchPosts() {

            const headers = {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            }

            const res = await fetch("/api/chat", headers)
            const json = await res.json()


            if (res.ok) {
                dispatch({ type: "SET_POSTS", payload: json })
                // console.log(json)
            }
        }
        if (user) {
            fetchPosts()
        }
    }, [dispatch, user])

    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });




    return (
        <div className="home">
            <div className="posts">
                {
                    posts && posts.map(post => {
                        // console.log(posts)
                        return (
                            <PostDetails
                                key={post._id}
                                post={post}
                            />
                        )
                    })
                }
            </div>
            <PostForm />
            <div ref={divRef} />
        </div>
    )
}