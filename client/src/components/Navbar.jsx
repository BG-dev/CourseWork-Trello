import React from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/auth.hook";

function Navbar() {

    const { logout } = useAuth()
    const navigate = useNavigate();

    const logoutHandler = event => {
        event.preventDefault()
        logout()
        navigate('/')
    }

    return(
        <nav>
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">TimeM</a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><a href="/" onClick={logoutHandler}>Logout</a></li>
              </ul>
            </div>
        </nav>
    )
}

export default Navbar