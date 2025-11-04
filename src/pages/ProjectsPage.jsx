import React, {useEffect, useState} from "react";
import { getProjects } from "../api";
import { Link,useNavigate } from "react-router-dom"; 
import ProjectForm from "../components/ProjectForm";


const ProjectsPage =() =>{
    const [projects, setProjects] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()

    const handleProjectCreated = (newProject) => {
        setProjects(prevProjects => [newProject, ...prevProjects]);
    };

    useEffect(()=>{
        getProjects()
        .then(data =>{
            setProjects(data)
            setIsLoading(false)
        })
        .catch(error =>{
            setIsLoading(false)
            if (error.response && error.response.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/login'); 
        } else {
            setProjects([]); 
        }
    });
    }, [navigate]);


if (isLoading){
    return <h1>Loading Projects...</h1>
}

if (!projects || projects.length === 0) {
    return (
        <div>
            <h1>Projects Dashboard</h1>
            <ProjectForm onProjectCreated={handleProjectCreated} />
            <p>No projects found. Start by creating a new one!</p>
        </div>
    );
}


return (
    <div className="container is-max-desktop p-4"> 
        <h1 className="title is-2 mb-4" style={{ color: 'var(--color-dark-text)' }}>Projects Dashboard</h1>
        
        <div className="box has-background-white p-5 mb-5" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
            <ProjectForm onProjectCreated={handleProjectCreated} />
        </div>

        <h2 className="subtitle is-3 mb-4" style={{ color: 'var(--color-primary-purple)' }}>My Projects</h2>
        
        <div className="list-group">
            {projects.map(project => (
                <Link 
                    to={`/projects/${project.id}`} 
                    key={project.id}
                    className="box has-background-white p-4 mb-3 is-flex is-justify-content-space-between is-align-items-center"
                    style={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
                >
                    <span className="has-text-weight-semibold" style={{ color: 'var(--color-dark-text)' }}>
                        {project.title}
                    </span>
                    <span className="tag is-info is-light" style={{ backgroundColor: 'var(--color-light-purple)', color: 'var(--color-primary-purple)' }}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                </Link>
            ))}
        </div>
    </div>
);
};

export default ProjectsPage;