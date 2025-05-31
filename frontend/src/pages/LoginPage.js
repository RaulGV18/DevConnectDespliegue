// src/pages/LoginPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useMode } from '../ModeContext';

function LoginPage() {
  const { mode, toggleMode } = useMode();

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    // Si la opción seleccionada es distinta al modo actual, se invierte el modo.
    if (selectedMode !== mode) {
      toggleMode();
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '400px' }}>
      <h1 className="mb-4 text-center" style={{ color: '#fff' }}>Iniciar Sesión</h1>

      {/* Opción para seleccionar el tipo de cuenta */}
      <div className="mb-3 text-center">
        <label style={{ color: '#fff', marginRight: '10px' }}>Tipo de cuenta:</label>
        <input
          type="radio"
          id="cliente"
          name="accountType"
          value="cliente"
          checked={mode === 'cliente'}
          onChange={handleModeChange}
        />
        <label htmlFor="cliente" style={{ color: '#fff', marginRight: '10px' }}>Cliente</label>
        <input
          type="radio"
          id="empresa"
          name="accountType"
          value="empresa"
          checked={mode === 'empresa'}
          onChange={handleModeChange}
        />
        <label htmlFor="empresa" style={{ color: '#fff' }}>Empresa</label>
      </div>

      <form>
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label" style={{ color: '#fff' }}>Correo Electrónico</label>
          <input 
            type="email" 
            className="form-control" 
            id="loginEmail" 
            placeholder="nombre@ejemplo.com" 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="loginPassword" className="form-label" style={{ color: '#fff' }}>Contraseña</label>
          <input 
            type="password" 
            className="form-control" 
            id="loginPassword" 
            placeholder="Contraseña" 
            required 
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Iniciar Sesión</button>
      </form>
      <p className="mt-3 text-center" style={{ color: '#fff' }}>
        ¿No tienes una cuenta?{' '}
        <Link to="/register" style={{ color: 'green', textDecoration: 'underline' }}>
          Registrarse
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
