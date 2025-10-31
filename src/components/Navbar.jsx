import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({isAuthenticated, setIsAuthenticated}) => {
    const navigate = useNavigate();

    const handleLogout =() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        setIsAuthenticated(false);

        navigate('/login');
    }

    return (
        <nav style={{ padding: '10px 20px', background: '#333', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
                Project Manager
            </Link>
            <div>
                {isAuthenticated ? (
                    <>
                        <Link to="/projects" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Projects</Link>
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>
                            Sign in 
                        </Link>
                        <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;