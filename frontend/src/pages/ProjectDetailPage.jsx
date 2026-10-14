import { Link, useParams } from 'react-router';

function ProjectDetailPage() {
  const { projectId } = useParams();

  return (
    <>
      <Link to="/projects" className="btn btn-link px-0 mb-3">
        ← Back to projects
      </Link>
      <h1>Project {projectId}</h1>
    </>
  );
}

export default ProjectDetailPage;
