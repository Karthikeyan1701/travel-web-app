export default function Navbar({ isAuthenticated, onLogout }) {
    return (
        <nav>
            <a href="/travels">Travels</a>{" "}
            <a href="/bookings">Bookings</a>

            {isAuthenticated && (
                <button
                    onClick={onLogout}
                >
                    Logout
                </button>
            )}
        </nav>
    );
}