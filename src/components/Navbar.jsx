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
        <nav className="navbar is-white" role="navigation" aria-label="main navigation"
             // خلفية بيضاء مع ظل خفيف
             style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }} 
        >
            <div className="navbar-brand">
                <Link className="navbar-item" to="/" 
                      // 🟢 شعار بنفسجي
                      style={{ color: 'var(--color-primary-purple)', fontWeight: 'bold', fontSize: '1.4em' }}>
                    Project Manager
                </Link>
            </div>

            <div id="navbarBasicExample" className="navbar-menu is-active">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/projects" 
                          // 🟢 تنسيق الروابط
                          style={{ color: 'var(--color-dark-text)' }}>
                        Projects
                    </Link>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {/* زر تسجيل الخروج */}
                            <button className="button is-light is-danger" onClick={handleLogout}
                                    style={{ 
                                        backgroundColor: 'var(--color-red-accent)', 
                                        color: 'white', 
                                        fontWeight: 'bold' 
                                    }}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;