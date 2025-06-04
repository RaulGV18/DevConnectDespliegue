import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EnterpriseProfilePage.css';

function EnterpriseProfilePage() {
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    const empresaId = localStorage.getItem('empresaId');
    if (!empresaId) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:8000/api/empresas/${empresaId}`, {
      headers: { Accept: 'application/ld+json' },
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar empresa');
        return res.json();
      })
      .then(setEmpresa)
      .catch(() => navigate('/login'));
  }, [navigate]);

  if (!empresa) {
    return (
    <div className="enterprise__loading">
      <div className="enterprise__spinner"></div>
      <p>Cargando perfil...</p>
    </div>)
  }

  return (
    <div className="enterprise-profile">
      <div className="container text-white">
        <div className="enterprise-profile__header text-center mb-4">
          <h1 className="enterprise-profile__name">{empresa.nombre}</h1>
          <p className="enterprise-profile__description">
            {empresa.descripcion || 'Sin descripción.'}
          </p>
          <button
            className="btn btn-success rounded-pill px-4 py-2 mt-3 enterprise-profile__edit-button"
            onClick={() => navigate('/editar-perfil-empresa')}
          >
            Editar Perfil
          </button>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <div className="enterprise-card">
              <h5 className="enterprise-card__title">Email</h5>
              <p className="enterprise-card__text">{empresa.email}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="enterprise-card">
              <h5 className="enterprise-card__title">Teléfono</h5>
              <p className="enterprise-card__text">{empresa.telefono || 'No especificado'}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="enterprise-card">
              <h5 className="enterprise-card__title">Sector</h5>
              <p className="enterprise-card__text">{empresa.sector || 'No especificado'}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="enterprise-card">
              <h5 className="enterprise-card__title">Número de Empleados</h5>
              <p className="enterprise-card__text">{empresa.num_empleados || 'No especificado'}</p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="enterprise-card">
              <h5 className="enterprise-card__title">Sitio Web</h5>
              {empresa.sitio_web ? (
                <a
                  href={empresa.sitio_web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enterprise-card__link"
                >
                  {empresa.sitio_web}
                </a>
              ) : (
                <p className="enterprise-card__text">No proporcionado</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterpriseProfilePage;
