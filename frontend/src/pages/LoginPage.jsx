import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMode } from '../ModeContext';

function LoginPage() {
  const { mode, toggleMode } = useMode();
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const endpoint = mode === 'empresa' ? 'http://localhost:8000/api/empresas' : 'http://localhost:8000/api/usuarios';
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setUsuarios(data.member || []))
      .catch((err) => {
        console.error('Error al cargar datos:', err);
        setError('No se pudo conectar con el servidor.');
      });
  }, [mode]); // Se vuelve a cargar si se cambia el modo

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    if (selectedMode !== mode) toggleMode();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const usuario = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuario) {
      const idKey = mode === 'empresa' ? 'empresaId' : 'usuarioId';
      localStorage.setItem(idKey, usuario.id);
      localStorage.setItem('mode', mode);
      localStorage.setItem('token', 'mock-token');

      if (mode === 'cliente') {
        navigate('/perfil');
      } else {
        navigate('/enterprise-main-page');
      }
    } else {
      setError('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: '400px' }}>
      <h1 className="mb-4 text-center" style={{ color: '#fff' }}>Iniciar Sesión</h1>

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
        <div className="mb-3">
          <label htmlFor="loginEmail" className="form-label" style={{ color: '#fff' }}>Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            id="loginEmail"
            placeholder="nombre@ejemplo.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-danger text-center">{error}</p>}
        <button type="submit" className="btn btn-success w-100">Iniciar Sesión</button>
      </form>

      <p className="mt-3 text-center" style={{ color: '#fff' }}>
        ¿No tienes una cuenta?{' '}
        <a href="/register" style={{ color: 'green', textDecoration: 'underline' }}>
          Registrarse
        </a>
      </p>
    </div>
  );
}

export default LoginPage;
