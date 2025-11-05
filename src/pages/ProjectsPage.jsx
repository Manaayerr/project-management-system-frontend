import React, {useEffect, useState} from "react";
import { getProjects } from "../api";
import { Link, useNavigate } from "react-router-dom"; 
import ProjectForm from "../components/ProjectForm";

const ProjectsPage = () => {
    const [projects, setProjects] = useState(null);
    const [isLoading,setIsLoading] = useState(true);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    // ✅ Edit Modal States
    const [editModal, setEditModal] = useState(false);
    const [editProjectId, setEditProjectId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editStatus, setEditStatus] = useState("");

    const handleProjectCreated = (newProject) => {
        setProjects(prevProjects => [newProject, ...prevProjects]);
        setShowModal(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("username");
        window.location.href = "http://localhost:5173/";
    };

    useEffect(() => {
        getProjects()
        .then(data => {
            setProjects(data);
            setIsLoading(false);
        })
        .catch(error => {
            setIsLoading(false);
            if (error.response && error.response.status === 401) {
                handleLogout();
            } else {
                setProjects([]);
            }
        });
    }, []);

    const handleDeleteProject = async (id) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            await fetch(`http://127.0.0.1:8000/api/projects/${id}/`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            setProjects(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            alert("Failed to delete project");
        }
    };

    // ✅ Update Project
    const handleEditProject = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/projects/${editProjectId}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: JSON.stringify({
                    title: editTitle,
                    status: editStatus
                }),
            });

            const updated = await res.json();
            setProjects(prev =>
                prev.map(p => (p.id === editProjectId ? updated : p))
            );
            setEditModal(false);
        } catch (err) {
            alert("Failed to update project");
        }
    };

    if (isLoading){
        return <h1 className="p-5">Loading Projects...</h1>
    }

    return (
      <div className="p-5" style={{ minHeight: "100vh" }}>
        
        {/* Header */}
        <div className="is-flex is-justify-content-space-between is-align-items-center mb-5">
          <div>
            <h2 className="title is-4">Hi, {username || "User"} 👋</h2>
            <p>Welcome back! Here's your dashboard.</p>
          </div>

          <button 
            className="button is-danger is-light" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="columns mb-5">
          <div className="column"><div className="box has-background-warning-light">📊 Projects: <b>{projects?.length}</b></div></div>
          <div className="column"><div className="box has-background-info-light">👥 Users: <b>1</b></div></div>
          <div className="column"><div className="box has-background-primary-light">✅ Completed: <b>{projects?.filter(p=>p.status==="completed").length}</b></div></div>
        </div>

        {/* Add New Project Button */}
        <button className="button is-primary mb-4" onClick={() => setShowModal(true)}>
          + Add New Project
        </button>

        {/* Create Modal */}
        {showModal && (
          <div className="modal is-active">
            <div className="modal-background" onClick={() => setShowModal(false)}></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">Create New Project</p>
                <button className="delete" onClick={() => setShowModal(false)}></button>
              </header>
              <section className="modal-card-body">
                <ProjectForm onProjectCreated={handleProjectCreated}/>
              </section>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editModal && (
          <div className="modal is-active">
            <div className="modal-background" onClick={() => setEditModal(false)}></div>
            <div className="modal-card">

              <header className="modal-card-head">
                <p className="modal-card-title">Edit Project</p>
                <button className="delete" onClick={() => setEditModal(false)}></button>
              </header>

              <section className="modal-card-body">
                <div className="field">
                  <label className="label">Project Name</label>
                  <input 
                    className="input"
                    value={editTitle}
                    onChange={(e)=>setEditTitle(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label className="label">Status</label>
                  <div className="select is-fullwidth">
                    <select 
                      value={editStatus}
                      onChange={(e)=>setEditStatus(e.target.value)}
                    >
                      <option value="planned">Planned</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </section>

              <footer className="modal-card-foot">
                <button className="button is-success" onClick={handleEditProject}>
                  Save
                </button>
                <button className="button" onClick={() => setEditModal(false)}>
                  Cancel
                </button>
              </footer>

            </div>
          </div>
        )}

        {/* Projects List */}
        <h2 className="subtitle is-4 mb-3">My Projects</h2>

        {projects.length === 0 ? (
          <p>No projects yet! Create one above 👆</p>
        ) : (
          projects.map(project => (
            <div 
              key={project.id}
              className="box has-background-white p-4 mb-3"
              style={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
            >
              <div className="is-flex is-justify-content-space-between is-align-items-center">
                <Link 
                  to={`/projects/${project.id}`}
                  className="has-text-weight-semibold"
                  style={{ fontSize: "18px" }}
                >
                  {project.title}
                </Link>

                <span className="tag is-info is-light">
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
              </div>

              <div className="buttons mt-3">
                <button 
                  className="button is-small is-warning"
                  onClick={() => {
                    setEditProjectId(project.id);
                    setEditTitle(project.title);
                    setEditStatus(project.status);
                    setEditModal(true);
                  }}
                >
                  ✏️ Edit
                </button>

                <button 
                  className="button is-small is-danger"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    );
};

export default ProjectsPage;
