import { Link } from "react-router-dom"
import React from 'react'
import useAuthContext from "../hooks/useAuthConext"
import useLogout from "../hooks/useLogout"

export default function Navbar() {
    const { user } = useAuthContext()
    const { logout } = useLogout()

    function handleClick(){
        logout()
    }

    return (
        <header>
            <div className="container-navbar">
                <Link to="/">
                    <h1>Chat app</h1>
                </Link>
                {user ? (
                    <div>
                        <span>{user.email}</span>
                        <button onClick={handleClick}>Log out</button>
                    </div>
                ) : (
                    <div>
                        <Link to="/login">Log in</Link>
                        <Link to="/signup">Sign up</Link>
                    </div>
                )}
            </div>
        </header>
    )
}

