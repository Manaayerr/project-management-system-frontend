import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProjectsPage from './pages/ProjectsPage'; 

const checkAuth = () => {
    return !!localStorage.getItem('access_token');
};

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

const Projects = () => {
    return <h1>Welcome to Projects Dashboard! (Data Fetching Logic Goes Here)</h1>;
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());
    

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <div style={{ padding: '20px' }}>
                <Routes>
                    <Route path="/" element={<h1>Welcome to the Project Management System! Please Log In or Register.</h1>} />
                    
                    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<Register />} />

                    <Route 
                path="/projects" 
                element={<PrivateRoute element={ProjectsPage} isAuthenticated={isAuthenticated} />} // 👈 استخدام ProjectsPage
            />

                    {/* To add  Task ,Kanban later   */}

                </Routes>
            </div>
        </Router>
    );
};

export default App;