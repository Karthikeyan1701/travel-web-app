import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '../features/auth/authApi';
import { logout as logoutAction } from '../features/auth/authSlice';
import { apiSlice } from '../features/api/apiSlice';

export function useLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApi, { isLoading }] = useLogoutMutation();

  const logout = async () => {
    try {
      // Backend logout
      await logoutApi().unwrap();
    } catch {
      // Backend failure should not block frontend logout
      console.error('Logout API Failed');
    } finally {
      // Clear auth state
      dispatch(logoutAction());

      // Clear RTK Query cache
      dispatch(apiSlice.util.resetApiState());

      // Redirect
      navigate('/login', { replace: true });
    }
  };

  return {
    logout,
    isLoggingOut: isLoading,
  };
}
