import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMode } from '../ModeContext';
import '../styles/Header.css'; // Importamos el CSS externo

function Header() {
  const { mode, toggleMode } = useMode();
  const navigate = useNavigate();
  const location = useLocation();

  const isEmpresaLoggedIn = mode === 'empresa' && localStorage.getItem('empresaId');
  const isClienteLoggedIn = mode === 'cliente' && localStorage.getItem('usuarioId');
  const isLoggedIn = isEmpresaLoggedIn || isClienteLoggedIn;

  useEffect(() => {
    const rutasPublicas = ['/login', '/register'];
    const rutasEmpresa = [
      '/enterprise-main-page',
      '/perfil-empresa',
      '/editar-perfil-empresa',
      '/misofertas',
      '/añadir-oferta',
      '/editar-oferta',
    ];
    const rutasCliente = [
      '/',
      '/perfil',
      '/empleos',
      '/empresas',
      '/editar-perfil',
      '/postular',
      '/generador-cv',
      '/empresas/perfil',
    ];

    if (!mode) return;
    const path = decodeURIComponent(location.pathname);

    if (rutasPublicas.includes(path)) return;

    if (mode === 'empresa') {
      const rutaValida = rutasEmpresa.some((ruta) => path === ruta || path.startsWith(ruta + '/'));
      if (!rutaValida) navigate('/enterprise-main-page');
    } else if (mode === 'cliente') {
      const rutaValida = rutasCliente.some((ruta) => path === ruta || path.startsWith(ruta + '/'));
      if (!rutaValida) navigate('/');
    }
  }, [mode, location.pathname, navigate]);

  const handleLogout = () => {
    if (mode === 'empresa') {
      localStorage.removeItem('empresaId');
    } else {
      localStorage.removeItem('usuarioId');
    }
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleToggleMode = () => {
    toggleMode();
    if (mode === 'cliente') {
      navigate('/enterprise-main-page');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="header">
      <nav className="header__navbar navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="header__brand navbar-brand" to={mode === 'empresa' ? '/enterprise-main-page' : '/'}>
            DevConnect {mode === 'empresa' && '(Empresa)'}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse header__menu" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 header__links">
              {isLoggedIn && (
                <>
                  {mode === 'empresa' ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/misofertas">
                          <i className="bi bi-briefcase me-1"></i>Mis Ofertas de Empleo
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/perfil-empresa">
                          <i className="bi bi-building me-1"></i>Perfil Empresa
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/perfil">
                          <i className="bi bi-person me-1"></i>Perfil
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/empleos">
                          <i className="bi bi-briefcase me-1"></i>Empleos
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/empresas">
                          <i className="bi bi-building me-1"></i>Empresas
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/generador-cv">
                          <i className="bi bi-file-earmark-person me-1"></i>Generar CV
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>

            <div className="header__actions d-flex align-items-center">
              {isLoggedIn ? (
                <>
                  <button onClick={handleLogout} className="btn btn-outline-danger me-2">
                    Cerrar Sesión
                  </button>
                  <button onClick={handleToggleMode} className="btn btn-warning">
                    {mode === 'cliente' ? 'Modo Empresa' : 'Modo Cliente'}
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-success me-2">
                    Iniciar Sesión
                  </Link>
                  <Link to="/register" className="btn btn-outline-success me-2">
                    Registrarse
                  </Link>
                  <button onClick={handleToggleMode} className="btn btn-warning">
                    {mode === 'cliente' ? 'Modo Empresa' : 'Modo Cliente'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
