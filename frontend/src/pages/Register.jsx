import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../features/auth/authApi';
import { loginSuccess } from '../features/auth/authSlice';
import { useIsAuthenticated } from '../hooks/useIsAuthenticated';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useIsAuthenticated();
    const nameRef = useRef(null);

    const [register, { isLoading, error: apiError }] = useRegisterMutation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uiError, setUiError] = useState(null);

    useEffect(() => {
        nameRef.current?.focus();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/travels', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUiError(null);

        if (!name || !email || !password) {
            setUiError('All fields are required');
            return;
        }

        try {
            const res = await register({
                name,
                email,
                password,
            }).unwrap();

            // Backend returns access token on successful registration
            dispatch(loginSuccess(res.accessToken));
        } catch (err) {
            setUiError(
                err?.data?.message || 'Registration failed. Please try again.'
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            {/* Error Handling */}
            <ErrorMessage 
                message={uiError || apiError?.data?.message}
            />

            <input 
                ref={nameRef}
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input 
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
            </button>
        </form>
    );
}