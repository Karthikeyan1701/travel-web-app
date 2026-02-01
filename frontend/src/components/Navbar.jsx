import { Link } from 'react-router-dom';

export default function Navbar(
  isAuthenticated,
  onLogout,
  isLoggingOut
) {
  return (
    <nav>
      <Link to='/travels'>Travels</Link>{' '}
      <Link to='/bookings'>Bookings</Link>

      {isAuthenticated && ( 
        <button onClick={onLogout} disabled={isLoggingOut}>
            {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      )}
    </nav>
  );
}