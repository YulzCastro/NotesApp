import { useContext, createContext, useState, useEffect } from 'react';
import { API_URL } from "../auth/constants";

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => { },
    saveUser: (userData) => { },
    getRefreshToken: () => { },
    //getUser: () => {},
    signout: () => {},
})

export function AutoProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [accessToken, setAccessToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);

      
    async function checkAuth() {
        const accessTokenLocal = window.localStorage.getItem('token')
        setAccessToken(JSON.parse(accessTokenLocal));
        const verifyTokenGood = await verifyToken(JSON.parse(accessTokenLocal));
        if (verifyTokenGood === "ok") {
            setAuthenticated(true);
            setIsLoading(false)
        } else {
            setAuthenticated(false);
        }
        setIsLoading(false)
    }

    async function verifyToken(accessToken) {
        if (accessToken) {
            try {
                const response = await fetch(`${API_URL}/auth/verifyToken`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `${accessToken}`,
                    },
                });

                if (response.ok) {
                    const json = await response.json();
                    setAuthenticated(true);
                    setIsLoading(true)
                    return json;
                }
            } catch (error) { 
                setIsLoading(false) 
            }
        } else {
            setAuthenticated(false);
            setIsLoading(false)
        }
    }

    function getAccessToken() {
        return accessToken;
    }

    function getRefreshToken() {
        const token = localStorage.getItem("token")
        if (token) {
            const { refreshToken } = JSON.parse(token)
            return refreshToken;
        }
        return null;
    }

    function saveUser(userData) {

        setAccessToken(userData.token)

        localStorage.setItem("token", JSON.stringify(userData.token));
        localStorage.setItem("user", JSON.stringify(userData.username));

        setAuthenticated(true);
    }

    function signout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAccessToken("");
        setAuthenticated(false);
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, signout }}>
        {isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext)
