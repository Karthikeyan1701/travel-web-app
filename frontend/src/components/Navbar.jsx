import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar(isAuthenticated, onLogout, isLoggingOut) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav
      className="flex items-center gap-4 p-4 border-b
                bg-white text-black
                dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
    >
      <Link to="/travels">Travels</Link> <Link to="/bookings">Bookings</Link>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="px-3 py-1 rounded border
                   hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {isDark ? '🌙 Dark' : '☀️ Light'}
      </button>
      {isAuthenticated && (
        <button onClick={onLogout} disabled={isLoggingOut}>
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </button>
      )}
    </nav>
  );
}
