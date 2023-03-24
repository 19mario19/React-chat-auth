import { useEffect, useState } from "react"
import useLogin from "../hooks/useLogin"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, error, isLoading } = useLogin()

    async function handleSubmit(e) {
        e.preventDefault()

        await login(email, password)
    }

   

    return (
        <form className="login">
            <h3>Log in</h3>
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
            <button disabled={isLoading} onClick={handleSubmit} >Log in</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}