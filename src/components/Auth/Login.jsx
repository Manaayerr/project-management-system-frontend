import React, { useState } from 'react';
import { loginUser } from '../../api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => { 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
    await loginUser(formData);

    localStorage.setItem("username", formData.username);
    setIsAuthenticated(true);

    navigate('/projects');
} catch (err) {
            setError("❌ Incorrect username or password");
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username"
                    value={formData.username} onChange={handleChange} required />

                <input type="password" name="password" placeholder="Password"
                    value={formData.password} onChange={handleChange} required />

                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;
