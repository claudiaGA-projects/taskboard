import { NavLink, Outlet } from 'react-router';

function Layout() {
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-primary mb-4">
        <div className="container">
          <NavLink to="/projects" className="navbar-brand">
            TaskBoard
          </NavLink>
          <div className="navbar-nav">
            <NavLink to="/projects" className="nav-link">
              Projects
            </NavLink>
          </div>
        </div>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
