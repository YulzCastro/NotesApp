import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";
import PortalLayout from "../layout/portallayout";
import { useNavigate } from "react-router-dom";



export default function Dashboard() {
    const [notes, setNotes] = useState([]);
    const auth = useAuth();
    const goTo = useNavigate()

    const [values, setValues] = useState({
        email: "",
        username: ""
    });


    const handleClick = (event) => { // handleClick recibe el evento original
        onClick(id)
    }

    const handleClickCreate = (event) => { // handleClick recibe el evento original

        goTo("/create")

    }

    async function onClick(id) {

        try {
            const response = await fetch(`${API_URL}/notes/${id}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    authorization: `${auth.getAccessToken()}`,
                }
            });

            if (response.ok) {

                goTo("/")
            } else {
                const json = (await response.json())
                console.log(json)
                return
            }
        } catch (error) {
            console.log(error)
        }
    }

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
            <div className="content_button">
                <button onClick={handleClickCreate}>Crear Nuevo</button>
            </div>
            <div className="cardGrid">

                {notes.map((todo) => (
                    <div className="card-todo" key={todo._id}>
                        <div className="card" >
                            <div className="card-container">
                                <h4><b>{todo.title} </b></h4>
                                <p>{todo.content} </p>
                            </div>

                        </div>
                        <button onClick={() => onClick(todo._id)}>
                            Borrar
                        </button>
                    </div>


                ))}

            </div>
        </PortalLayout>



    )
}