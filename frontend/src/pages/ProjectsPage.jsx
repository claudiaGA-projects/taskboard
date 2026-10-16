import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { getProjects } from '../api/projects';

function ProjectsPage() {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch(() => setError('projects.loadError'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t('common.loading')}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{t(error)}</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="mb-0">{t('projects.title')}</h1>
        <Link to="/projects/new" className="btn btn-primary">
          {t('projects.new')}
        </Link>
      </div>
      {projects.length === 0 ? (
        <p className="text-muted">{t('projects.empty')}</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">{t('projects.columns.code')}</th>
              <th scope="col">{t('projects.columns.name')}</th>
              <th scope="col">{t('projects.columns.description')}</th>
              <th scope="col">{t('projects.columns.created')}</th>
              <th scope="col">
                <span className="visually-hidden">{t('projects.columns.actions')}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <th>{project.id}</th>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{new Date(project.createdAt).toLocaleDateString(i18n.resolvedLanguage)}</td>
                <td>
                  <Link to={`/projects/${project.id}`} className="btn btn-sm btn-outline-primary">
                    {t('projects.view')}
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
