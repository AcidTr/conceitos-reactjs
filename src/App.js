import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  // Initialize the projects with an empty array
  const [projects, setProjects] = useState([]);

  // Get repositories from api
  useEffect(() => {
    api.get("repositories").then((response) => {
      setProjects(response.data);
    });
  }, []);

  // Add new repository
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Repositório ${Date.now()}`,
      url: `url-repo/${Date.now()}`,
      techs: ["React", "ReactJS"],
    });

    setProjects([...projects, response.data]);
  }

  // Delete an repository
  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
