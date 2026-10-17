import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { createProject } from '../api/projects';

function NewProjectPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    setFieldErrors({});
    setError(null);

    createProject({ name, description })
      .then((created) => navigate(`/projects/${created.id}`))
      .catch((error) => {
        if (error.response?.status === 400) {
          setFieldErrors(error.response.data.errors ?? {});
        } else {
          setError('Could not create the project. Please try again later.');
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <Link to="/projects" className="btn btn-link px-0 mb-3">
        ← Back to projects
      </Link>
      <h1>New project</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${fieldErrors.name ? 'is-invalid' : ''}`}
            id="projectName"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setFieldErrors((current) => ({ ...current, name: undefined }));
            }}
            maxLength={100}
          />
          {fieldErrors.name && <div className="invalid-feedback">{fieldErrors.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="projectDescription" className="form-label">
            Description
          </label>
          <textarea
            className={`form-control ${fieldErrors.description ? 'is-invalid' : ''}`}
            rows={3}
            id="projectDescription"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              setFieldErrors((current) => ({ ...current, description: undefined }));
            }}
            maxLength={500}
          />
          {fieldErrors.description && (
            <div className="invalid-feedback">{fieldErrors.description}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          Create
        </button>
      </form>
    </>
  );
}

export default NewProjectPage;
