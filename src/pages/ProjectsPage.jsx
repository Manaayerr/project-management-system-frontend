import React, {useEffect, useState} from "react";
import { getProjects } from "../api";
import { Link,useNavigate } from "react-router-dom"; 
import ProjectForm from "../components/ProjectForm";


const ProjectsPage =() =>{
    const [projects, setProjects] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const navigate = useNavigate();
    const [showProjectForm, setShowProjectForm] = useState(false);


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
                navigate('/'); 
            } else {
                setProjects([]); 
            }
        });
    }, [navigate]);

    if (isLoading){
        return <h1>Loading Projects...</h1>
    }

return (
  <div className="columns m-0" style={{ minHeight: "100vh" }}>

    {/* Sidebar */}
    <aside className="column is-2 has-background-white p-4"
      style={{ borderRight: "1px solid #eee" }}>
      
      <h1 className="title is-5 mb-5" style={{ color: "var(--color-primary-purple)" }}>
        Project.io
      </h1>

      <aside className="menu">
        <ul className="menu-list">
          
          <li>
            <Link to="/projects" className="is-active">Dashboard</Link>
          </li>
          
          <li>
            <Link to="/projects">Projects</Link>
          </li>

        </ul>
      </aside>
    </aside>

    {/* Main */}
    <div className="column p-5">

      {/* Top Bar */}
      <div className="is-flex is-justify-content-space-between is-align-items-center mb-4">
        <div>
          <h2 className="title is-4">Hi, {username || "User"} 👋</h2>
          <p>Ready to manage your projects?</p>
        </div>

        <div className="dropdown is-right is-hoverable">
          <div className="dropdown-trigger">
            <button className="button is-light">
              <span className="icon">👤</span>
              <span>Account</span>
            </button>
          </div>
          <div className="dropdown-menu">
            <div className="dropdown-content">
              <a className="dropdown-item" style={{ cursor: "pointer" }}
                 onClick={() => {
                   localStorage.removeItem('access_token');
                   localStorage.removeItem('refresh_token');
                   localStorage.removeItem('username');
                   navigate('/');
                 }}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="columns mb-5">
        <div className="column">
          <div className="box has-background-warning-light">📊 Projects: <b>{projects?.length}</b></div>
        </div>
        <div className="column">
          <div className="box has-background-info-light">👥 Users: <b>1</b></div>
        </div>
        <div className="column">
          <div className="box has-background-primary-light">✅ Completed: <b>{projects?.filter(p=>p.status==="completed").length}</b></div>
        </div>
      </div>

      {/* Add New Project Button */}
      <button 
   className="button is-primary mb-4"
   onClick={() => setShowProjectForm(true)}
>
   + Create New Project
</button>


      {/* Project Form */}
      {showProjectForm && (
  <div className="modal is-active">
    <div className="modal-background" 
         onClick={() => setShowProjectForm(false)}></div>
    
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Create New Project</p>
        <button className="delete" onClick={() => setShowProjectForm(false)}></button>
      </header>

      <section className="modal-card-body">
        <ProjectForm onProjectCreated={(newProject) => {
            handleProjectCreated(newProject);
            setShowProjectForm(false);
        }} />
      </section>
    </div>
  </div>
)}


      {/* Project List */}
      <h2 className="subtitle is-4 mb-3">My Projects</h2>

      {projects.length === 0 ? (
        <p>No projects yet! Create one above 👆</p>
      ) : (
        projects.map(project => (
          <Link 
            to={`/projects/${project.id}`} 
            key={project.id}
            className="box has-background-white p-4 mb-3 is-flex is-justify-content-space-between is-align-items-center"
            style={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
          >
            <span className="has-text-weight-semibold">
              {project.title}
            </span>
            <span className="tag is-info is-light">
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </Link>
        ))
      )}
    </div>
  </div>
);
};

export default ProjectsPage;

