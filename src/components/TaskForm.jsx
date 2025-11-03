import React, { useState } from "react";
import { createTask, getAllUsers } from "../api";

const TaskForm =({projectId, onTaskCreated}) => {
    const [taskData,setTaskData] = useState({
        title: '',
        status: 'todo', 
        due_date: '',
        assigned_to_id: '',
    });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
        
                const usersList = await getAllUsers(); 
                setUsers(usersList);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            }
        };
        fetchUsers()
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const newTask = await createTask(projectId, taskData);
            
            onTaskCreated(newTask); 
            
            setTaskData({
                title: '',
                status: 'todo',
                due_date: '',
                assigned_to_id: '',
            });
        } catch (err) {
            setError('Failed to create task. Check required fields.');
            console.error("Creation Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="task-form-container">
            <h3>Add New Task</h3>
            <form onSubmit={handleSubmit}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                
                <input
                    type="text"
                    name="title"
                    value={taskData.title}
                    onChange={handleChange}
                    placeholder="Task Title"
                    required
                />
                
                <input
                    type="date"
                    name="due_date"
                    value={taskData.due_date}
                    onChange={handleChange}
                />
                
                <select name="status" value={taskData.status} onChange={handleChange}>
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
                
                <select name="assigned_to_id" value={taskData.assigned_to_id} onChange={handleChange}>
                    <option value="">Assign To...</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.username}</option>
                    ))}
                </select>

                <button type="submit" disabled={loading || !taskData.title}>
                    {loading ? 'Creating...' : 'Create Task'}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
