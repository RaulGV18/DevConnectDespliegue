import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMode } from '../ModeContext';
import '../styles/RegisterPage.css';

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
  const [modeLocked, setModeLocked] = useState(false);

  // Detectar si ya hay sesión activa
  useEffect(() => {
    const usuarioId = localStorage.getItem('usuarioId');
    const empresaId = localStorage.getItem('empresaId');
    if (usuarioId || empresaId) {
      setModeLocked(true);
    }
  }, []);

  const handleModeChange = (e) => {
    const selectedMode = e.target.value;
    if (!modeLocked && selectedMode !== mode) {
      toggleMode();
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

    const payload =
      mode === 'cliente'
        ? { nombre, apellido, email, password }
        : { nombre: nombreEmpresa, email, password };

    const endpoint =
      mode === 'cliente'
        ? 'http://localhost:8000/api/usuarios'
        : 'http://localhost:8000/api/empresas';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
          Accept: 'application/ld+json',
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
    <div className="register">
      <div className="register__container">
        <h1 className="register__title">Registrarse</h1>

        <div className="register__account-type">
          <label className="register__account-label">Tipo de cuenta:</label>
          <div className="register__account-options">
            <div className="register__account-option">
              <input
                type="radio"
                id="cliente"
                name="accountType"
                value="cliente"
                checked={mode === 'cliente'}
                onChange={handleModeChange}
                disabled={modeLocked}
              />
              <label htmlFor="cliente" className="register__radio-label">
                Cliente
              </label>
            </div>
            <div className="register__account-option">
              <input
                type="radio"
                id="empresa"
                name="accountType"
                value="empresa"
                checked={mode === 'empresa'}
                onChange={handleModeChange}
                disabled={modeLocked}
              />
              <label htmlFor="empresa" className="register__radio-label">
                Empresa
              </label>
            </div>
          </div>
        </div>

        <form className="register__form" onSubmit={handleSubmit}>
          {mode === 'cliente' ? (
            <>
              <div className="register__form-group">
                <label htmlFor="registerNombre" className="register__label">Nombre</label>
                <input
                  type="text"
                  className="register__input"
                  id="registerNombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="register__form-group">
                <label htmlFor="registerApellido" className="register__label">Apellido</label>
                <input
                  type="text"
                  className="register__input"
                  id="registerApellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                />
              </div>
            </>
          ) : (
            <div className="register__form-group">
              <label htmlFor="registerNombreEmpresa" className="register__label">Nombre de la Empresa</label>
              <input
                type="text"
                className="register__input"
                id="registerNombreEmpresa"
                value={nombreEmpresa}
                onChange={(e) => setNombreEmpresa(e.target.value)}
                required
              />
            </div>
          )}

          <div className="register__form-group">
            <label htmlFor="registerEmail" className="register__label">Correo Electrónico</label>
            <input
              type="email"
              className="register__input"
              id="registerEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="register__form-group">
            <label htmlFor="registerPassword" className="register__label">Contraseña</label>
            <input
              type="password"
              className="register__input"
              id="registerPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="register__error">{error}</div>}

          <button type="submit" className="register__submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <p className="register__footer">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="register__login-link">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
