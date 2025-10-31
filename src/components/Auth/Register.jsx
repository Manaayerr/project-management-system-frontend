import React, { useState } from "react";
import { registerUser } from "../../api";
import { useNavigate } from 'react-router-dom'; 

const Register = ({history})=>{ 
    const [formData , setFormData] = useState({
        username:'',
        email:'',
        password:'',
    });
    
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); 
    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            await registerUser(formData);
            
            setSuccess(true);
            alert('Registration successful! Please log in.');
            navigate('/login'); 
        } catch (err) {
            let errorMessage = 'Registration failed. Please check your details.';
            if (err.response && err.response.data) {
                errorMessage = JSON.stringify(err.response.data);
            }
            setError(errorMessage);
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Register New Account</h2>
            {success && <p style={{ color: 'green' }}>Registration successful! Redirecting to login...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            {!success && (
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
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
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
                    <button type="submit">Register</button>
                </form>
            )}
        </div>
    );
};

export default Register;