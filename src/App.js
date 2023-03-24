import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import useAuthContext from "./hooks/useAuthConext"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
export default function App() {
  const { user } = useAuthContext()
  
  
  

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer message="Created by Mario" />
      </BrowserRouter>
    </div>
  )
}
