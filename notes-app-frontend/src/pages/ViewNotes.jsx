import React, { useEffect, useState } from "react";
import { Notascard } from "../components/Notascard";
import style from '../components/Notascard.modules.css'


export function ViewNotas() {

    const [values, setValues] = React.useState({
        email: "",
        password: "",
        token: "",
        username: ""
    });
    const [notas, SetNotas] = useState([]);


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setValues(user);
        }
    }, [])

    useEffect(() => {
        let config = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'authorization': values.token,
                'body': "{'user': '" + values.username + "'}"
            }
        }

        if (values.token) {
            fetch("https://notes-app-backend-67f2.onrender.com/notes/", config)
                .then((result) => result.json())
                .then(data => {
                    SetNotas(data)
                })
        }

    }, [values])

    console.log(notas)

    return (
        <div class="cardGrid">

            {notas.map((nota) => (
                <Notascard key={nota._id} nota={nota} />
            ))}

        </div>
    )
}