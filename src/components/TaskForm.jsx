import React, { useState, useEffect } from "react";
import { createTask, getAllUsers } from "../api";
import Alert from "./Alert"; 


const TaskForm = ({ projectId, onTaskCreated }) => {
    const [taskData, setTaskData] = useState({
        title: '',
        status: 'in_progress', 
        due_date: '',
        assigned_to_id: '',
    });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState(null);


    useEffect(() => {
        const fetchUsers = async () => {
        
            try {
                const fetchedUsers = await getAllUsers();
                setUsers(fetchedUsers);
            } catch (err) {
                console.error("Failed to fetch users:", err);
            }
        };
        fetchUsers()
    }, []);
    
    const closeAlert = () => {
        setAlertMessage(null);
        setAlertType(null);
    };

    const handleChange = (e) => {
        closeAlert();
        const { name, value } = e.target; 
        setTaskData({ ...taskData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        closeAlert(); 
        setLoading(true);

        const dataToSend = { ...taskData };

        
        if (dataToSend.assigned_to_id === '') {
            dataToSend.assigned_to_id = null; 
        }

        try {
            const newTask = await createTask(projectId, dataToSend);

            onTaskCreated(newTask);
            
            setAlertMessage('Task created successfully!');
            setAlertType('success');

    
            setTaskData({ title: '', status: 'in_progress', due_date: '', assigned_to_id: '' });
            

        } catch (err) {
        
            const errorDetails = err.response?.data?.title?.[0] || 
                                err.response?.data?.assigned_to_id?.[0] || 
                                'Check required fields or server connection.';

            setAlertMessage(`Failed to create task: ${errorDetails}`);
            setAlertType('error');
            
            console.error("Creation Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="task-form-container">
            <h3 className="title is-5" style={{ color: 'var(--color-dark-text)' }}>Add New Task</h3>
            
            
            <Alert message={alertMessage} type={alertType} onClose={closeAlert} />

            <form onSubmit={handleSubmit}>
                <div className="field is-horizontal">
                    <div className="field-body">
                        <div className="field is-expanded">
                            <p className="control">
                                <input
                                    className="input" 
                                    type="text"
                                    name="title"
                                    value={taskData.title}
                                    onChange={handleChange}
                                    placeholder="Task Title"
                                    required
                                />
                            </p>
                        </div>
                        
                        <div className="field">
                            <p className="control">
                                <input
                                    className="input" 
                                    type="date"
                                    name="due_date"
                                    value={taskData.due_date}
                                    onChange={handleChange}
                                />
                            </p>
                        </div>
                    </div>
                </div>

                <div className="field is-horizontal">
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select name="status" value={taskData.status} onChange={handleChange}>
                                        <option value="todo">To Do</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select name="assigned_to_id" value={taskData.assigned_to_id} onChange={handleChange}>
                                        <option value="">Unassigned</option>
                                        {users.map(user => (
                                            <option key={user.id} value={user.id}>
                                                {user.username}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                    
                        <div className="field is-narrow">
                            <div className="control">
                                <button 
                                    className="button is-primary" 
                                    type="submit" 
                                    disabled={loading || !taskData.title}
                                    style={{ backgroundColor: 'var(--color-primary-purple)', borderColor: 'var(--color-primary-purple)' }}
                                >
                                    {loading ? 'Creating...' : 'Create Task'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TaskForm;