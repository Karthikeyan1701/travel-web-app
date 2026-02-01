import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';
import { useLoginMutation } from '../features/auth/authApi';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const dispatch = useDispatch(); 
  const isAuthenticated = useIsAuthenticated();

  const [login, { isLoading, error: apiError }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uiError, setUiError] = useState(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // useEffect for redirecting to travels page
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/travels', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUiError(null);

    if (!email || !password) {
      setUiError('Email and password are required');
      return;
    }

    try {
        const res = await login({ email, password }).unwrap();
        dispatch(loginSuccess(res.accessToken));
    } catch (err) {
        setUiError(
          err?.data?.message || 'Invalid email or password'
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Form</h2>

      {/* Error Handling */}
      <ErrorMessage 
        message={uiError || apiError?.data?.message}
      />

      <input
        type="email"
        ref={emailRef}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
