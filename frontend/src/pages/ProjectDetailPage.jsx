import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getProject } from '../api/projects';
import { getProjectTasks } from '../api/tasks';

function ProjectDetailPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([getProject(projectId), getProjectTasks(projectId)])
      .then((data) => {
        setProject(data[0]);
        setTasks(data[1]);
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          setError('Project not found.');
        } else {
          setError('Could not load the project. Please try again later.');
        }
      })
      .finally(() => setLoading(false));
  }, [projectId]);

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
    return (
      <>
        <Link to="/projects" className="btn btn-link px-0 mb-3">
          ← Back to projects
        </Link>
        <div className="alert alert-danger">{error}</div>
      </>
    );
  }

  return (
    <>
      <Link to="/projects" className="btn btn-link px-0 mb-3">
        ← Back to projects
      </Link>
      <h1>Project: {project.name}</h1>
      <p className="text-muted">{project.description}</p>
      <h2>Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-muted">There are no tasks yet.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th scope="col">Priority</th>
              <th scope="col">Due at</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>{task.priority}</td>
                <td>{task.dueAt ? new Date(task.dueAt).toLocaleDateString() : ' - '}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default ProjectDetailPage;
