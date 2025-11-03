import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectDetails, getProjectsTasks,deleteTask } from '../api'; 

const ProjectDetailsPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([])
    const fetchProjectAndTasks = async () => {
        try{
            const [projectData, taskData] = await Promise.all([
                getProjectDetails(id),
                getProjectsTasks(id)
            ])
            setProject(projectData)
            setTasks(taskData)
        }catch (err){
            if(err.response && err.response.status === 401){
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                navigate('/login')
            }else if (err.response && err.response.status === 404){
                setError('Project Not Found')
            }else{
                setError('Failed to load project details or tasks')
            }
        }finally{
            setIsLoading(false)
        }
    }

    const handleTaskDelete = async (taskId) =>{
        const confirmed = window.confirm('Are you sure you want to delete this task?')
        if(confirmed){
            try{
                await deleteTask(id,taskId)
                setTasks(tasks.filter(task => task.id !== taskId))
            }catch (error){
                alert('Failed to delete task. check console for details')
            }
        }
    }

    useEffect(() => {
        fetchProjectAndTasks()
        setIsLoading(true);
        getProjectDetails(id)
            .then(data => {
                setProject(data);
                setIsLoading(false);
            },[id])
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
            <hr />
            <h2>Poject Tasks ({tasks.length})</h2>

            {/* Task form here later */}
            <div className='task-list'>
                {tasks.length>0 ?(
                    <ul>
                        {tasks.map(task =>(
                            <li key={task.id} className={`task-item task-${task.status}`}>
                                <strong>{task.title}</strong>
                                <span>Status: {task.status}</span>
                                <span>Due: {task.due_date}</span>
                                <span>Assigned to: **{task.assigned_to ? task.assigned_to.username : 'Unassigned'}**</span>
                                <button onClick={() => handleTaskDelete(task.id)} className="delete-btn">
                                    
                                </button>
                            </li>
                        ))}
                    </ul>
                ): (
                    <p>No tasks found for this project. Start by adding one!</p>
                )}
            </div>
        </div>
    );
};

export default ProjectDetailsPage;