import useAuthContext from "./useAuthConext"
import usePostsContext from "./usePostsContext"

export default function useLogout() {
  const { dispatch } = useAuthContext()
  const { dispatch: postsDispatch } = usePostsContext()

  function logout() {
    // remove user from local storage
    localStorage.removeItem("user")

    // dispatch logout action
    dispatch({ type: "LOGOUT" })
    postsDispatch({ type: "SET_POSTS", payload: null })
  }

  return { logout }
}
