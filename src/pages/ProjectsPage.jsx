import React, {useEffect, useState} from "react";
import { getProjects } from "../api";
import { useNavigate } from "react-router-dom";

const ProjectsPage =() =>{
    const [projects, setProjects] = useState(null)
    const [isLoading,setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        getProjects()
        .then(data =>{
            setProjects(data)
            setIsLoading(false)
        })
        .catch(error =>{
            setIsLoading(false)
            if (error.response && error.response.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/login'); 
        } else {
            setProjects([]); 
        }
    });
    }, [navigate]);


if (isLoading){
    return <h1>Loading Projects...</h1>
}


    return (
    <div>
    <h1>Projects Dashboard</h1>

    </div>
    );
};

export default ProjectsPage; 
    