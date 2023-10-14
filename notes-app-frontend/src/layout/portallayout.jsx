import { Link, json, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import React, { MouseEvent, useEffect, useState } from "react";

export default function PortalLayout({ children }) {
    const auth = useAuth();

    const [values, setValues] = useState({
        email: "",
        username: ""
    });

    const goTo = useNavigate()
    const [showNavbar, setShowNavbar] = useState(false);

    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };

    const Hamburger = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="52"
            height="24"
            viewBox="0 0 52 24"
        >
            <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
                <rect
                    id="Rectangle_3"
                    data-name="Rectangle 3"
                    width="42"
                    height="4"
                    rx="2"
                    transform="translate(304 47)"
                    fill="#574c4c"
                />
                <rect
                    id="Rectangle_5"
                    data-name="Rectangle 5"
                    width="42"
                    height="4"
                    rx="2"
                    transform="translate(304 67)"
                    fill="#574c4c"
                />
                <rect
                    id="Rectangle_4"
                    data-name="Rectangle 4"
                    width="52"
                    height="4"
                    rx="2"
                    transform="translate(294 57)"
                    fill="#574c4c"
                />
            </g>
        </svg>
    );


    const Logo = () => (
        <div></div>
    );



    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setValues(user);
        }

    }, [])

    async function handleSignOut(e) {
        e.preventDefault();
        auth.signout();
    }

    return (
        <>
            <header>
                <nav className="navbar">
                    <div className="container">
                        <div className="logo">
                            <Logo />
                        </div>
                        <div className="menu-icon" onClick={handleShowNavbar}>
                            <Hamburger />
                        </div>
                        <div className={`nav-elements  ${showNavbar && "active"}`}>
                            <ul>
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>

                                <li>
                                    {values.username}
                                </li>
                                <li>
                                    <a href="#" onClick={handleSignOut}>
                                        Sign out
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <main>

                {children}
            </main>
        </>

    )
}