import { useContext } from "react"
import { PostContext } from "../context/PostContext"

export default function usePostsContext() {
  const context = useContext(PostContext)
  if (!context) {
    throw Error("Must be used within PostContextProvider")
  }
  return context
}
