import React, { useState } from "react";
import { registerUser } from "../../api";
import { useNavigate } from 'react-router-dom'; 

const Register = ()=>{ 
    const [formData , setFormData] = useState({
        username:'', email:'', password:'',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate(); 

    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await registerUser(formData);

            setSuccess("✅ Registration successful! Redirecting...");
            setTimeout(() => navigate('/login'), 1000);

        } catch (err) {
            setError("❌ Registration failed. Please check your info.");
        }
    };

    return (
        <div>
            <h2>Register New Account</h2>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
