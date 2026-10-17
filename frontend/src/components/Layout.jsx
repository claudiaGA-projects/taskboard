import { NavLink, Outlet } from 'react-router';
import { useTranslation } from 'react-i18next';

function Layout() {
  const { t, i18n } = useTranslation();
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-primary mb-4">
        <div className="container">
          <NavLink to="/projects" className="navbar-brand">
            TaskBoard
          </NavLink>
          <div className="navbar-nav me-auto">
            <NavLink to="/projects" className="nav-link">
              {t('nav.projects')}
            </NavLink>
          </div>
          <div className="btn-group btn-group-sm">
            <button
              type="button"
              className={`btn btn-outline-light ${i18n.resolvedLanguage === 'es' ? 'active' : ''}`}
              onClick={() => i18n.changeLanguage('es')}
            >
              ES
            </button>
            <button
              type="button"
              className={`btn btn-outline-light ${i18n.resolvedLanguage === 'en' ? 'active' : ''}`}
              onClick={() => i18n.changeLanguage('en')}
            >
              EN
            </button>
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
