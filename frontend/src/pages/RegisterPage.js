// src/pages/RegisterPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useMode } from '../ModeContext';

function RegisterPage() {
  const { mode, toggleMode } = useMode();

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    if (selectedMode !== mode) {
      toggleMode();
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '400px' }}>
      <h1 className="mb-4 text-center" style={{ color: '#fff' }}>Registrarse</h1>

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
          <label htmlFor="registerName" className="form-label" style={{ color: '#fff' }}>Nombre Completo</label>
          <input 
            type="text" 
            className="form-control" 
            id="registerName" 
            placeholder="Tu nombre" 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="registerEmail" className="form-label" style={{ color: '#fff' }}>Correo Electrónico</label>
          <input 
            type="email" 
            className="form-control" 
            id="registerEmail" 
            placeholder="nombre@ejemplo.com" 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="registerPassword" className="form-label" style={{ color: '#fff' }}>Contraseña</label>
          <input 
            type="password" 
            className="form-control" 
            id="registerPassword" 
            placeholder="Contraseña" 
            required 
          />
        </div>
        <button type="submit" className="btn btn-success w-100">Registrarse</button>
      </form>
      <p className="mt-3 text-center" style={{ color: '#fff' }}>
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login" style={{ color: 'green', textDecoration: 'underline' }}>
          Iniciar Sesión
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
