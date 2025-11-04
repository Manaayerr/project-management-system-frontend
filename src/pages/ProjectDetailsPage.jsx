import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectDetails, getProjectsTasks, deleteTask } from '../api'; 
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

const ProjectDetailsPage = () => {
    const { id } = useParams(); 
    const [projectDetails, setProjectDetails] = useState(null);
    const [projectTasks, setProjectTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const details = await getProjectDetails(id);
                setProjectDetails(details);

                const tasks = await getProjectsTasks(id);
                setProjectTasks(tasks);

            } catch (err) {
                setError("Failed to fetch project details or tasks.");
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]);
    
    const handleStatusUpdated = (updatedTask) => {
        setProjectTasks(prevTasks => 
            prevTasks.map(task => 
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await deleteTask(id, taskId);
                setProjectTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
            } catch (err) {
                console.error("Deletion failed:", err);
                alert("Failed to delete the task.");
            }
        }
    };
    
    const handleTaskCreated = (newTask) => {
        setProjectTasks(prevTasks => [...prevTasks, newTask]);
    };

    if (isLoading) {
        return <div className="container p-5"><p className="has-text-info">Loading...</p></div>;
    }

    if (error) {
        return <div className="container p-5"><p className="notification is-danger">{error}</p></div>;
    }

    if (!projectDetails) {
        return <div className="container p-5"><p className="notification is-warning">Project not found.</p></div>;
    }

   return (
        <div className="container is-max-desktop p-4">
            <h1 className="title is-2 mb-2" style={{ color: 'var(--color-dark-text)' }}>
                Project: {projectDetails.title}
            </h1>
            <p className="subtitle is-6 mb-4 has-text-grey">
                ID: {projectDetails.id} | Description: {projectDetails.description}
            </p>
            
            
            <div className="box has-background-white p-5 mb-5" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
                <TaskForm projectId={id} onTaskCreated={handleTaskCreated} /> 
            </div>

            
            <h3 className="title is-4 mb-4" style={{ color: 'var(--color-dark-text)' }}>Project Tasks ({projectTasks.length})</h3>
            
            <div className="task-list">
                {projectTasks.length > 0 ? (
                    projectTasks.map(task => (
                        <TaskItem 
                            key={task.id} 
                            task={task} 
                            projectId={id} 
                            onDelete={handleDeleteTask} 
                            onStatusUpdated={handleStatusUpdated} 
                        />
                    ))
                ) : (
                    <p className="notification is-info is-light">No tasks yet for this project. Start adding one!</p>
                )}
            </div>
        </div>
    );
};

export default ProjectDetailsPage;