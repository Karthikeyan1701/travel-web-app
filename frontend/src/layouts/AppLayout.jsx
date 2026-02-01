import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useLogout } from "../hooks/useLogout";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";

export default function AppLayout() {
    const isAuthenticated = useIsAuthenticated();

    const { logout, isLoggingOut } = useLogout();

    return (
        <>
            <Navbar 
                isAuthenticated={isAuthenticated}
                onLogout={logout}
                isLoggingOut={isLoggingOut}
            />
            <main>
                <Outlet />
            </main>
        </>
    );
}