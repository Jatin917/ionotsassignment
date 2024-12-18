import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await axios.get('http://localhost:5000/api/projects');
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  const acceptProject = async (id) => {
    await axios.put(`http://localhost:5000/api/projects/accept/${id}`);
    alert("Project Accepted!");
  };

  const updateProgress = async (id) => {
    const status = prompt("Enter status: Pending, In Progress, Completed");
    const score = prompt("Enter score:");
    await axios.put(`http://localhost:5000/api/projects/update/${id}`, { status, score });
    alert("Progress Updated!");
  };

  return (
    <div>
      <h1>Project Assignments</h1>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            <strong>{project.title}</strong> - {project.status} - Score: {project.score}
            <button onClick={() => acceptProject(project._id)}>Accept</button>
            <button onClick={() => updateProgress(project._id)}>Update Progress</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
