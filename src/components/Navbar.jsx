import React from "react";
import { Link } from 'react-router-dom';

const Navbar = ({isAuthenticated}) => {
  const username = localStorage.getItem("username");

  return (
    <nav className="navbar is-white" role="navigation" aria-label="main navigation"
        style={{ boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        
        <div className="navbar-brand">
            <Link className="navbar-item" to="/" 
                style={{ color: 'var(--color-primary-purple)', fontWeight: 'bold', fontSize: '1.4em' }}>
                Project Managment
            </Link>
        </div>

        <div className="navbar-menu is-active">
            <div className="navbar-end">
                {isAuthenticated && (
                    <div className="navbar-item" style={{ fontWeight: "bold", color: "#444" }}>
                        👋 Hi, {username}
                    </div>
                )}
            </div>
        </div>

    </nav>
  );
};

export default Navbar;
