import React, { useState } from 'react';
import { loginUser } from '../../api';

const Login = ({ history, setIsAuthenticated }) => { 
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await loginUser(formData);
            
            if (setIsAuthenticated) {
                setIsAuthenticated(true);
            }

            alert('Login successful!');

        } catch (err) {
            setError('Login failed. Check your username and password.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;