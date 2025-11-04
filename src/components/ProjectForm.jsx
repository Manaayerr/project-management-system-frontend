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

            setFormData({
                title: '',
                description: '',
                status: 'planned',
            });

        } catch (err) {
            const errorMsg = "Failed to create project. Please check the required fields.";
            setError(errorMsg);
            console.error('Project Creation Error:', err.response?.data || err.message);
        } finally {
            setIsLoading(false);
        }
    };

 return (
        <div className="project-form-container box" style={{ backgroundColor: '#fff', padding: '20px' }}>
            <h3 className="title is-4" style={{ color: 'var(--color-dark-green)' }}>Add New Project</h3>
            
            {error && (
                <div className="notification is-danger is-light">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input
                            className="input" 
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Project Title"
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <textarea
                            className="textarea" 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description (Optional)"
                        />
                    </div>
                </div>
                
                <div className="field">
                    <label className="label">Status</label>
                    <div className="control">
                        <div className="select is-fullwidth"> 
                            <select name="status" value={formData.status} onChange={handleChange}>
                                {STATUS_CHOICES.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="control">
                    <button 
                        className="button is-primary is-fullwidth" 
                        type="submit" 
                        disabled={isLoading || !formData.title}
                        style={{ backgroundColor: 'var(--color-medium-green)', borderColor: 'var(--color-medium-green)' }}
                    >
                        {isLoading ? 'Creating...' : 'Create Project'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProjectForm;