import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Page not found.</p>
      <Link to="/projects" className="btn btn-primary">
        Go to projects
      </Link>
    </div>
  );
}

export default NotFoundPage;
