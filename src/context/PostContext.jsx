import { createContext, useReducer } from "react"

export const PostContext = createContext()

export function postReducer(state, action) {
    switch (action.type) {
        case "SET_POSTS":
            return {
                posts: action.payload
            }
        case "CREATE_POST":
            return {
                posts: [action.payload, ...state.posts]
            }
        case "DELETE_POST":
            return {
                posts: [...state.posts].filter(item => item._id !== action.payload._id)
            }
        default:
            return state
    }
}

export default function PostContextProvider({ children }) {

    const [state, dispatch] = useReducer(postReducer, {
        posts: null
    })

    return (
        <PostContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PostContext.Provider>
    )
}
