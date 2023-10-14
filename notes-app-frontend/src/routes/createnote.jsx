import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import PortalLayout from "../layout/portallayout";
import { useEffect, useState } from "react";
import { API_URL } from "../auth/constants";

export default function CreateNote() {
    const auth = useAuth();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [errorResponse, setErrorResponse] = useState();
    const goTo = useNavigate()

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



    async function handleSubmit(e) {
        e.preventDefault();
        const user = values.username
        console.log(JSON.stringify({
            title,
            content,
            user
        }))

        try {
            const response = await fetch(`${API_URL}/notes/`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    authorization: `${auth.getAccessToken()}`,
                },
                body: JSON.stringify({
                    title,
                    content,
                    user
                })
            });

            if (response.ok) {
                console.log("Nota creada")
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

    return (
        <PortalLayout>
            <div className="content-form">
                <form className="form" onSubmit={handleSubmit}>
                    <h1>Crear Nota</h1>
                    {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
                    <label>Titulo</label>
                    <input
                        type="text"
                        value={title}
                        size="10"
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label>Detalle</label>
                    <textarea
                        type="text"
                        value={content}
 
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button>Crear Nota</button>
                </form>
            </div>
        </PortalLayout>
    )
}