import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div>
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>

            <Link to='/travels'>Go to Travels</Link>
        </div>
    );
}