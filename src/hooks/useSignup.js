import { useState } from "react"
import useAuthContext from "./useAuthConext"

export default function useSignup() {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  async function signup(email, password) {
    setIsLoading(true)
    setError(null)

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }

    const response = await fetch("/api/user/signup", requestOptions)
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      // save the user to local sotrage
      localStorage.setItem("user", JSON.stringify(json))

      // update authContext
      dispatch({ type: "LOGIN", payload: json })
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}
