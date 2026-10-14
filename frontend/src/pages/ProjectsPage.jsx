import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { getProjects } from '../api/projects';

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch(() => setError('Could not load projects. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <h1>Projects</h1>
      {projects.length === 0 ? (
        <p className="text-muted">There are no projects yet.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Project code</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Created</th>
              <th scope="col">
                <span className="visually-hidden">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <th>{project.id}</th>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{new Date(project.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`/projects/${project.id}`} className="btn btn-sm btn-outline-primary">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default ProjectsPage;
