import { useState } from "react";
import DefaultLayout from "../layout/defaultlayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";


export default function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState();
    const auth = useAuth()
    const goTo = useNavigate()


    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard" />
    }


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            if (response.ok) {
                console.log("User creado")
                setErrorResponse("")
                goTo("/")
            } else {
                const json = (await response.json())
                setErrorResponse(json.error)
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (<DefaultLayout>
        <div className="content-form">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Signup</h1>
                {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button>Create User</button>
            </form>
        </div>

    </DefaultLayout>)
}