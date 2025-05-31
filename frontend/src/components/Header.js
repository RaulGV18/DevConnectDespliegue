// src/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMode } from '../ModeContext';

function Header() {
  const { mode, toggleMode } = useMode();
  const navigate = useNavigate();

  const handleToggleMode = () => {
    if (mode === 'cliente') {
      // Cambia a modo empresa y navega a EnterpriseMainPage
      toggleMode();
      navigate('/enterprise-main-page');
    } else {
      // Cambia a modo cliente y regresa a la página principal
      toggleMode();
      navigate('/');
    }
  };

  // Usamos un color de fondo fijo para ambos modos
  const headerStyle = {
    backgroundColor: '#343a40',
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark" style={headerStyle}>
        <div className="container">
          {/* Logotipo: si el usuario está en modo empresa, se redirige a EnterpriseMainPage */}
          <Link className="navbar-brand" to={mode === 'empresa' ? '/enterprise-main-page' : '/'}>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {mode === 'empresa' ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/misofertas">
                      Mis Ofertas de Empleo
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
                </>
              )}
            </ul>
            <form className="d-flex me-3">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar..."
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Buscar
              </button>
            </form>
            <div className="d-flex align-items-center">
              <Link to="/login" className="btn btn-outline-success me-2">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-outline-success me-2">
                Registrarse
              </Link>
              {/* Botón para alternar el modo */}
              <button onClick={handleToggleMode} className="btn btn-warning">
                {mode === 'cliente' ? 'Modo Empresa' : 'Modo Cliente'}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
