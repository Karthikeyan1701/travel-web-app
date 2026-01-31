import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';
import { useLoginMutation } from '../features/auth/authApi';

export default function Login() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const dispatch = useDispatch(); 
  const isAuthenticated = useIsAuthenticated();

  const [login, { isLoading, error }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    try {
        const res = await login({ email, password }).unwrap();
        dispatch(loginSuccess(res.accessToken));
    } catch {
        console.error('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login Form</h2>

      {error && <p className="text-red-600">Login failed</p>}
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
