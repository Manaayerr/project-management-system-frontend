import React, { useState } from 'react';
import { createProject } from '../api'; 

const STATUS_CHOICES = [
    { value: 'planned', label: 'Planned' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
    { value: 'archived', label: 'Archived' },
];

const ProjectForm = ({ onProjectCreated }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'planned', 
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError(null); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!formData.title) {
            setError("Title is required.");
            return;
        }

        setIsLoading(true);

        try {
            const newProject = await createProject(formData);
            onProjectCreated(newProject); 
            setFormData({ title: '', description: '', status: 'planned' });

        } catch (err) {
            setError("Failed to create project.");
            console.error('Project Creation Error:', err.response?.data || err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && (
                <div className="notification is-danger is-light">{error}</div>
            )}

            <div className="field">
                <label className="label">Title</label>
                <div className="control">
                    <input className="input" name="title" value={formData.title}
                        onChange={handleChange} placeholder="Project Title" required/>
                </div>
            </div>

            <div className="field">
                <label className="label">Description</label>
                <div className="control">
                    <textarea className="textarea" name="description"
                        value={formData.description} onChange={handleChange}
                        placeholder="Description (Optional)"/>
                </div>
            </div>

            <div className="field">
                <label className="label">Status</label>
                <div className="select is-fullwidth">
                    <select name="status" value={formData.status} onChange={handleChange}>
                        {STATUS_CHOICES.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button className="button is-primary is-fullwidth"
                type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Project"}
            </button>
        </form>
    );
};

export default ProjectForm;
