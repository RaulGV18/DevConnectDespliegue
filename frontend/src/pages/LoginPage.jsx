import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMode } from '../ModeContext';
import '../styles/LoginPage.css';

function LoginPage() {
  const { mode, toggleMode } = useMode();
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isLoggedIn = localStorage.getItem('usuarioId') || localStorage.getItem('empresaId');

  useEffect(() => {
    const endpoint = mode === 'empresa' ? 'http://backenddevconnect.work.gd:8000/api/empresas' : 'http://backenddevconnect.work.gd:8000/api/usuarios';
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => setUsuarios(data.member || []))
      .catch((err) => {
        console.error('Error al cargar datos:', err);
        setError('No se pudo conectar con el servidor.');
      });
  }, [mode]);

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    if (!isLoggedIn && selectedMode !== mode) {
      toggleMode();
    }
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
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Iniciar Sesión</h1>

        <div className="login__account-type">
          <label className="login__account-type-label">Tipo de cuenta:</label>
          <div className="login__account-type-options">
            <label className="login__radio-label">
              <input
                type="radio"
                name="accountType"
                value="cliente"
                checked={mode === 'cliente'}
                onChange={handleModeChange}
                disabled={isLoggedIn}
              />
              Cliente
            </label>
            <label className="login__radio-label">
              <input
                type="radio"
                name="accountType"
                value="empresa"
                checked={mode === 'empresa'}
                onChange={handleModeChange}
                disabled={isLoggedIn}
              />
              Empresa
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__form-group">
            <label htmlFor="loginEmail" className="login__label">Correo Electrónico</label>
            <input
              type="email"
              className="login__input"
              id="loginEmail"
              placeholder="nombre@ejemplo.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login__form-group">
            <label htmlFor="loginPassword" className="login__label">Contraseña</label>
            <input
              type="password"
              className="login__input"
              id="loginPassword"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="login__error">{error}</p>}

          <button type="submit" className="login__button">Iniciar Sesión</button>
        </form>

        <p className="login__redirect">
          ¿No tienes una cuenta?{' '}
          <a href="/register" className="login__link">Registrarse</a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
