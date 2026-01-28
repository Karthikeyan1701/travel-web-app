import { useState } from "react";
import api from "../api/axios";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });
        setAccessToken(res.data.accessToken);
    };

    const logout = async () => {
        await api.post("/auth/logout");
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider value={{ accessToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};