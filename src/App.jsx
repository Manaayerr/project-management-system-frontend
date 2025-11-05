import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProjectsPage from './pages/ProjectsPage'; 
import PrivateRoute from './utils/PrivateRoute'; 
import ProjectDetailsPage from './pages/ProjectDetailsPage';



const checkAuth = () => {
    return !!localStorage.getItem('access_token');
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <div style={{ padding: '20px' }}>
                <Routes>
                    
                    <Route 
                        path="/" 
                        element={
                            isAuthenticated 
                                ? <Navigate to="/projects" replace /> 
                                : (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '80vh',
                                        flexDirection: 'column',
                                        gap: '20px',
                                        textAlign: 'center'
                                    }}>
                                        <h1>Welcome to Project Management System</h1>
                                        <p>Please Login or Register to continue.</p>

                                        <div style={{ display: 'flex', gap: '15px' }}>
                                            <a 
                                                href="/login" 
                                                style={{
                                                    padding: '12px 24px',
                                                    background: '#c26ee9ff',
                                                    color: 'white',
                                                    borderRadius: '8px',
                                                    textDecoration: 'none',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                Login
                                            </a>

                                            <a 
                                                href="/register"
                                                style={{
                                                    padding: '12px 24px',
                                                    background: '#f4f4f4',
                                                    color: '#333',
                                                    borderRadius: '8px',
                                                    textDecoration: 'none',
                                                    fontWeight: 'bold',
                                                    border: '1px solid #ccc'
                                                }}
                                            >
                                                Register
                                            </a>
                                        </div>
                                    </div>
                                )
                        }
                    />

                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                        <Route path="/projects" element={<ProjectsPage />} /> 
                        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                    </Route>

                </Routes>
            </div>
        </Router>
    );
};

export default App;
