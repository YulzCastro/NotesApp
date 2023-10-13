import { Link, json } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import React, { MouseEvent, useEffect, useState } from "react";

export default function PortalLayout({ children }) {
    const auth = useAuth();

    const [values, setValues] = useState({
        email: "",
        username: ""
    });

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
                <nav>
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
                        <li>
                            <Link to="/create">Nueva Nota</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </>

    )
}