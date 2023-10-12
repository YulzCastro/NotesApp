import { useState } from "react";
import DefaultLayout from "../layout/defaultlayout";
import { useAuth } from '../auth/AuthProvider';
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";

export default function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState();

    const auth = useAuth()
    const goTo = useNavigate()

    if (auth.isAuthenticated) {
        return <Navigate to="/dashboard"/>
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (response.ok) {
                setErrorResponse("")
                
                const json = (await response.json())
                console.log(json)

                if(json.token)
                {
                    auth.saveUser(json)
                    goTo("/dashboard")
                }

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
        <form className="form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
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

            <button>Login</button>
        </form>
    </DefaultLayout>)
}