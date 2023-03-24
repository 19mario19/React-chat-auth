import useSignup from "../hooks/useSignup"
import { useState } from "react"

export default function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signup, error, isLoading } = useSignup()

    async function handleSubmit(e) {
        e.preventDefault()

        console.log(error, isLoading)
        await signup(email, password)
    }


    return (
        <form className="signup">
            <h3>Sign up</h3>
            <label>Email:</label>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading} onClick={handleSubmit} >Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}