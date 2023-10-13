import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";
import PortalLayout from "../layout/portallayout";



export default function Dashboard() {
    const [notes, setNotes] = useState([]);
    const auth = useAuth();

    const [values, setValues] = useState({
        email: "",
        username: ""
    });

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('user')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            loadNotes(user)
        }

    }, [])


    async function loadNotes(user) {
        try {
            const response = await fetch(`${API_URL}/notes/`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `${auth.getAccessToken()}`,
                    body: `{user: ${user.username}}`
                },
            });
            if (response.ok) {
                const json = await response.json();
                setNotes(json)
            } else {
                console.log("error")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (

        <PortalLayout>
            <div className="cardGrid">

                {notes.map((todo) => (
                    <div key={todo._id} className="card">
                        <div className="container">
                            <h4><b>{todo.title} </b></h4>
                            <p>{todo.content} </p>
                        </div>
                    </div>

                ))}

            </div>
        </PortalLayout>



    )
}