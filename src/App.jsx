import React, { useEffect, useState } from "react"
import { getProjects } from "./api"

const Projects = () => {
  const [projects, setProjects] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getProjects().then(data => {
      console.log(data) 
      setProjects(data)
      setIsLoading(false)
    });
  }, []);

  if (isLoading){
    return <h1>Loading Projects...</h1>
  }

  if (!projects || projects.length ===0){
    return <h1>No projects found!</h1>
  }
  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;