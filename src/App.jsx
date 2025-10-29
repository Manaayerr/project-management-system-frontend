import React, { useEffect, useState } from "react";
import { getProjects } from "./api";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects().then(data => {
      console.log(data);  // راقبي البيانات
      setProjects(data);
    });
  }, []);

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

export default Projects;
