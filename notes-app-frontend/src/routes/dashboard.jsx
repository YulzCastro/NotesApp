import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";



export default function Dashboard() {
    const [notes, setNotes] = useState([]);
    const auth = useAuth();


    useEffect(() => {
        loadNotes();
    }, [])


    async function loadNotes() {
        try {
            const response = await fetch(`${API_URL}/notes/`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `${auth.getAccessToken()}`,
                    body: `{user: ${auth.getUser()}}`
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

        <div>
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
        </div>



    )
}