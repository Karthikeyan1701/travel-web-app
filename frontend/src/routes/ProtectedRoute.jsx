import { Navigate, useLocation } from 'react-router-dom';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
