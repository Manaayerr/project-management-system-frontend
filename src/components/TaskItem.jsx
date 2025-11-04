import React, { useState } from 'react';
import { updateTask } from '../api'; 

const STATUS_CHOICES = [
    { value: 'todo', label: 'To Do' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
];

const TaskItem = ({ task, projectId, onDelete, onStatusUpdated }) => {
    const [currentStatus, setCurrentStatus] = useState(task.status);
    const [isLoading, setIsLoading] = useState(false);
    
    const getStatusStyles = (status) => {
        const base = { padding: '3px 8px', borderRadius: '4px', fontWeight: 'bold' };
        switch (status) {
            case 'todo':
                return { ...base, backgroundColor: '#f0f0f0', color: '#888' }; 
            case 'in_progress':
                return { ...base, backgroundColor: 'var(--color-yellow-accent)', color: 'var(--color-dark-text)' }; 
            case 'done':
                return { ...base, backgroundColor: 'var(--color-success)', color: 'white' }; 
            default:
                return {};
        }
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setCurrentStatus(newStatus); 
        setIsLoading(true);

        try {
            const updatedTask = await updateTask(projectId, task.id, { status: newStatus });
            
            onStatusUpdated(updatedTask); 
            
        } catch (error) {
            setCurrentStatus(task.status);
            console.error("Failed to update status:", error);
            alert("Failed to update task status.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="box has-background-white p-4 mb-3 is-flex is-justify-content-space-between is-align-items-center"
        style={{ borderRadius: '8px', borderLeft: `5px solid ${getStatusStyles(currentStatus).backgroundColor}` }}
        >
            <div className="is-flex is-align-items-center">
                <span className="has-text-weight-semibold mr-4" style={{ color: 'var(--color-dark-text)' }}>
                    {task.title}
                </span>

                <div className="select is-small" disabled={isLoading}>
                    <select value={currentStatus} onChange={handleStatusChange} 
                            style={getStatusStyles(currentStatus)}>
                        {STATUS_CHOICES.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="is-flex is-align-items-center">
                <span className="task-details mr-4 has-text-grey is-size-7">
                    Due: {task.due_date} | Assigned to: {task.assigned_to?.username || 'Unassigned'}
                </span>
                <button 
                    className="button is-danger is-small is-outlined" 
                    onClick={() => onDelete(task.id)}
                    disabled={isLoading}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TaskItem;