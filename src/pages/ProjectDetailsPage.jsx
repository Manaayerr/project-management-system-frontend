import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectDetails } from '../api'; 

const ProjectDetailsPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getProjectDetails(id)
            .then(data => {
                setProject(data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    navigate('/login');
                } else if (err.response && err.response.status === 404) {
                    setError('Project not found.');
                } else {
                    setError('Failed to load project details.');
                }
            });
    }, [id, navigate]); 

    if (isLoading) {
        return <h1 className="loading">Loading Project Details...</h1>;
    }

    if (error) {
        return <h1 style={{color: 'red'}}>{error}</h1>;
    }

    if (!project) {
        return <h1>Project data is missing.</h1>;
    }

    return (
        <div className="project-details-container">
            <h1>Project: {project.title}</h1>
            <p><strong>ID:</strong> {project.id}</p>
            <p><strong>Description:</strong> {project.description || 'No description provided.'}</p>
            
        </div>
    );
};

export default ProjectDetailsPage;