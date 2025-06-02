import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMode } from '../ModeContext';

function RegisterPage() {
  const { mode, toggleMode } = useMode();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    if (selectedMode !== mode) {
      toggleMode();
      // Reset form fields on mode change
      setNombre('');
      setApellido('');
      setNombreEmpresa('');
      setEmail('');
      setPassword('');
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Construir payload según modo
    const payload = mode === 'cliente' 
      ? { nombre, apellido, email, password } 
      : { nombre: nombreEmpresa, email, password };

    // Endpoint según modo
    const endpoint = mode === 'cliente' 
      ? 'http://localhost:8000/api/usuarios' 
      : 'http://localhost:8000/api/empresas';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json', // Importante para ApiPlatform
          'Accept': 'application/ld+json'
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Error en el registro');
      }

      setLoading(false);
      alert('Registro exitoso! Por favor revisa tu correo para verificar la cuenta.');
      navigate('/login');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '400px' }}>
      <h1 className="mb-4 text-center" style={{ color: '#fff' }}>Registrarse</h1>

      {/* Tipo de cuenta */}
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

      <form onSubmit={handleSubmit}>
        {mode === 'cliente' ? (
          <>
            <div className="mb-3">
              <label htmlFor="registerNombre" className="form-label" style={{ color: '#fff' }}>Nombre</label>
              <input
                type="text"
                className="form-control"
                id="registerNombre"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="registerApellido" className="form-label" style={{ color: '#fff' }}>Apellido</label>
              <input
                type="text"
                className="form-control"
                id="registerApellido"
                placeholder="Tu apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
          </>
        ) : (
          <div className="mb-3">
            <label htmlFor="registerNombreEmpresa" className="form-label" style={{ color: '#fff' }}>Nombre de la Empresa</label>
            <input
              type="text"
              className="form-control"
              id="registerNombreEmpresa"
              placeholder="Nombre de la empresa"
              value={nombreEmpresa}
              onChange={(e) => setNombreEmpresa(e.target.value)}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="registerEmail" className="form-label" style={{ color: '#fff' }}>Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="registerEmail"
            placeholder="nombre@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-success w-100" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
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
