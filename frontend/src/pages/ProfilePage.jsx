import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from '../img/ejemplo.png';
import '../styles/ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const usuarioId = localStorage.getItem('usuarioId');

  useEffect(() => {
    if (!usuarioId) {
      navigate('/login');
      return;
    }

    fetch(`http://backenddevconnect.work.gd:8000/api/usuarios/${usuarioId}`, {
      headers: {
        Accept: 'application/ld+json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar usuario');
        return res.json();
      })
      .then((data) => setUsuario(data))
      .catch(() => navigate('/login'));
  }, [navigate, usuarioId]);

  if (!usuario) {
    return (
      <div className="profile-page__loading">
        <div className="profile-page__spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  // Ruta fija para la imagen basada en usuarioId con timestamp para evitar cache
  const fotoPerfilUrl = `http://backenddevconnect.work.gd:8000/uploads/fotos/usuario_${usuarioId}.jpg?${Date.now()}`;

  return (
    <div className="profile-page">
      <div className="container">
        <div className="row profile-page__header d-flex align-items-center">
          <div className="col-md-3 text-center">
            <img
              src={fotoPerfilUrl}
              alt="Imagen de Perfil"
              className="profile-page__image rounded-circle border border-success"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null; // evita loop infinito
                e.target.src = profileImg; // si falla, imagen por defecto
              }}
            />
          </div>
          <div className="col-md-9 text-white">
            <h1 className="profile-page__name">
              {usuario.nombre} {usuario.apellido}
            </h1>
            <p className="profile-page__description fst-italic fs-6">
              {usuario.descripcion || 'Esta es una breve descripción del usuario.'}
            </p>
            <button
              className="btn btn-success rounded-pill px-4 py-2 shadow profile-page__edit-button"
              onClick={() => navigate('/editar-perfil')}
              style={{ fontWeight: '600', fontSize: '1rem' }}
            >
              Editar Perfil
            </button>
          </div>
        </div>

        <section className="profile-page__contact mt-5">
          <h2 className="profile-page__contact-title text-white mb-4">
            Información de Contacto
          </h2>
          <div className="profile-page__contact-list row g-4">
            <div className="col-md-4 d-flex">
              <article className="contact-card flex-fill">
                <h3 className="contact-card__title">
                  <i className="bi bi-envelope-fill"></i> Email
                </h3>
                <p className="contact-card__text">{usuario.email}</p>
              </article>
            </div>

            <div className="col-md-4 d-flex">
              <article className="contact-card flex-fill">
                <h3 className="contact-card__title">
                  <i className="bi bi-telephone-fill"></i> Teléfono
                </h3>
                <p className="contact-card__text">{usuario.telefono || '+34 600 000 000'}</p>
              </article>
            </div>

            <div className="col-md-4 d-flex">
              <article className="contact-card flex-fill">
                <h3 className="contact-card__title">
                  <i className="bi bi-github"></i> GitHub
                </h3>
                {usuario.github ? (
                  <a
                    href={usuario.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-card__link"
                  >
                    {usuario.github}
                  </a>
                ) : (
                  <p className="contact-card__text">No proporcionado</p>
                )}
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfilePage;
