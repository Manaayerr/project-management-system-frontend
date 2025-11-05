import React, { useState } from 'react';
import { updateTask } from '../api'; 

const STATUS_CHOICES = [
    { value: 'todo', label: 'To Do' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
];

// ✅ Status color logic
const getStatusColor = (status) => {
    switch (status) {
        case 'todo': return '#da3232ff';
        case 'in_progress': return '#3b82f6';
        case 'done': return '#22c55e';
        default: return '#ccc';
    }
};

const TaskItem = ({ task, projectId, onDelete, onStatusUpdated }) => {
    const [currentStatus, setCurrentStatus] = useState(task.status);
    const [isLoading, setIsLoading] = useState(false);

    // ✅ Edit task states
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);
    const [newAssignedTo, setNewAssignedTo] = useState(task.assigned_to?.username || '');

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setCurrentStatus(newStatus);
        setIsLoading(true);

        try {
            const updatedTask = {
                ...task,
                status: newStatus,
                project_id: projectId,
            };

            const result = await updateTask(projectId, task.id, updatedTask);
            if (onStatusUpdated) onStatusUpdated(result);

        } catch (err) {
            console.error("Failed to update status: ", err);
            alert("Failed to update task status");
            setCurrentStatus(task.status);
        } finally {
            setIsLoading(false);
        }
    };

    // ✅ Save edit
    const handleSaveEdit = async () => {
        setIsLoading(true);
        try {
            const updatedTask = {
                ...task,
                title: newTitle,
                assigned_to: newAssignedTo,
                project_id: projectId,
            };

            const result = await updateTask(projectId, task.id, updatedTask);
            if (onStatusUpdated) onStatusUpdated(result);
            setIsEditing(false);
        } catch (err) {
            alert("Failed to update task");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
        {/* ✅ Task Card */}
        <div 
            className="box has-background-white p-4 mb-3 is-flex is-justify-content-space-between is-align-items-center"
            style={{ 
                borderRadius: '8px', 
                borderLeft: `5px solid ${getStatusColor(currentStatus)}` 
            }}
        >
            <div className="is-flex is-align-items-center">
                <span className="has-text-weight-semibold mr-4" style={{ color: 'var(--color-dark-text)' }}>
                    {task.title}
                </span>

                <div className="select is-small">
                    <select value={currentStatus} onChange={handleStatusChange} disabled={isLoading}>
                        {STATUS_CHOICES.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="is-flex is-align-items-center">
                <span className="task-details mr-4 has-text-grey is-size-7">
                    Due: {task.due_date} | Assigned to: {task.assigned_to?.username || 'Unassigned'}
                </span>

                {/* ✅ Edit button */}
                <button 
                    className="button is-info is-small is-outlined mr-2" 
                    onClick={() => setIsEditing(true)}
                >
                    Edit
                </button>

                {/* ✅ Delete */}
                <button 
                    className="button is-danger is-small is-outlined" 
                    onClick={() => onDelete(task.id)}
                    disabled={isLoading}
                >
                    Delete
                </button>
            </div>
        </div>

        {/* ✅ Edit Modal */}
        {isEditing && (
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Edit Task</p>
                        <button className="delete" aria-label="close" onClick={() => setIsEditing(false)}></button>
                    </header>

                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Task Title</label>
                            <input className="input" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                        </div>

                        
                    </section>

                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={handleSaveEdit}>Save</button>
                        <button className="button" onClick={() => setIsEditing(false)}>Cancel</button>
                    </footer>
                </div>
            </div>
        )}
        </>
    );
};

export default TaskItem;
