import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/useAuth";

export default function AppLayout() {
    const { accessToken, logout } = useAuth();
    return (
        <>
            <Navbar 
                isAuthenticated={!!accessToken}
                onLogout={logout}
            />
            <main>
                <Outlet />
            </main>
        </>
    );
}