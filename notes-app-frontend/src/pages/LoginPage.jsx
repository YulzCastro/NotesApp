import style from './Login.module.css'
import React, { useEffect } from "react";


export function LoginPage() {

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setValues(user);
        }
    }, [])

    const [values, setValues] = React.useState({
        email: "",
        password: "",
        token: "",
        username: ""
    });

    const handleSubmit = async evt => {
        evt.preventDefault();

        try {
            let config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }
            let res = await fetch('http://192.168.1.15:3000/auth/login', config);
            let json = await res.json()
            console.log(json)
            values.token = json.token;
            values.username = json.username;
            window.localStorage.setItem(
                'loggedNoteAppUser', JSON.stringify(values)
            )

        } catch (error) {

        }
    }

   

    function handleChange(evt) {
        const { target } = evt;
        const { name, value } = target;
        const newValues = {
            ...values,
            [name]: value,
        };
        setValues(newValues);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Login Here</h3>
                <label for="username">Username</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                />
                <label for="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
}