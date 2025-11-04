import React from 'react';

const Alert = ({ message, type, onClose }) => {
    if (!message) return null;

    let bulmaClass = '';
    let bgColor = ''; 

    switch (type) {
        case 'success':
            bulmaClass = 'is-success';
            bgColor = 'var(--color-success)'; 
            break;
        case 'error':
            bulmaClass = 'is-danger';
            bgColor = 'var(--color-red-accent)'; 
            break;
        default:
            bulmaClass = 'is-info';
            bgColor = 'var(--color-blue-accent)'; 
            break;
    }

    return (
        <div 
            className={`notification ${bulmaClass} is-light`} 
            style={{ 
                borderLeft: `5px solid ${bgColor}`,
                borderRadius: '6px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                marginBottom: '1rem',
                color: 'var(--color-dark-text)'
            }}
            role="alert"
        >

            {onClose && (
                <button 
                    onClick={onClose} 
                    className="delete" 
                    aria-label="delete"
                ></button>
            )}
            
            <span>{message}</span>
        </div>
    );
};

export default Alert;