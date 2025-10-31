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
                ? <Navigate to="/projects" replace /> // ✅ موثق؟ اذهب للمشاريع
                : <h1>Welcome to the Project Management System! Please Log In or Register.</h1> // ❌ غير موثق؟ ابق هنا
        } 
    />

    <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
    <Route path="/register" element={<Register />} />
    
    <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/projects" element={<ProjectsPage />} /> 
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
    </Route>
                    

                    {/* To add  Task ,Kanban later   */}

                </Routes>
            </div>
        </Router>
    );
};

export default App;