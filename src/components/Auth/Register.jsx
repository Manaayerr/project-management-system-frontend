import React, { useState } from "react";
import { registerUser } from "../../api";

const Register = ({history})=>{
    const [formData , setFormData] = useState({
        username:'',
        email:'',
        password:'',

    });
    
    const handleChange = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await registerUser(formData);
            alert('Registration successful! Please log in.');
        } catch (err) {
            setError('Registration failed. Please check your details.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Register New Account</h2>
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
                {/* <input
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                /> */}
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
