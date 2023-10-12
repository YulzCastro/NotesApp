import { useContext, createContext, useState, useEffect } from 'react';
import { API_URL } from "../auth/constants";

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => { },
    saveUser: (userData) => { },
    getRefreshToken: () => { },
    getUser: () => { },
})

export function AutoProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false)
    const [accessToken, setAccessToken] = useState("");
    const [user, setUser] = useState([]);
    

    async function checkAuth() {
        const accessTokenLocal = window.localStorage.getItem('token')
        setAccessToken(JSON.parse(accessTokenLocal));
        const verifyTokenGood = await verifyToken(JSON.parse(accessTokenLocal));
        if (verifyTokenGood === "ok") {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
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
                    return json;
                }
            } catch (error) { console.log(error) }
        } else {
            console.log("no tenia token")
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    function getAccessToken() {
        return accessToken;
    }

    function getUser() {
        const DataUser = window.localStorage.getItem('user')
        setUser(DataUser);
        return user.username;
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

    return <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, getUser }}>
        {children}
    </AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext)
