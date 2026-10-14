import { Link } from 'react-router';

const mockProjects = [
  {
    id: 1,
    name: 'Web redesign',
    description: 'New company website',
    createdAt: '2026-10-13T10:00:00Z',
  },
  {
    id: 2,
    name: 'Mobile app',
    description: 'iOS and Android app',
    createdAt: '2026-10-14T09:30:00Z',
  },
  { id: 3, name: 'Platform dual', description: 'Double entry', createdAt: '2026-10-14T15:30:00Z' },
];

function ProjectsPage() {
  return (
    <>
      <h1>Projects</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Project code</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Created</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {mockProjects.map((project) => (
            <tr key={project.id}>
              <th scope="row">{project.id}</th>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>{project.createdAt}</td>
              <td>
                <Link to={`/projects/${project.id}`} className="btn btn-sm btn-outline-primary">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ProjectsPage;
