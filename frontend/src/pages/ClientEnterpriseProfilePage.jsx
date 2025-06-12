import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import companyPlaceholder from '../img/ejemploempresa.png';
import '../styles/ClientEnterpriseProfilePage.css';

function ClientEnterpriseProfilePage() {
  const { id } = useParams();
  const [empresa, setEmpresa] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('ID de empresa no proporcionado.');
      return;
    }

    fetch(`http://backend.devconnect.local:8000/api/empresas/${id}`, {
      headers: {
        Accept: 'application/ld+json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar empresa');
        return res.json();
      })
      .then(setEmpresa)
      .catch((err) => {
        console.error(err);
        setError('No se pudo cargar la empresa.');
      });
  }, [id]);

  if (error) {
    return <div className="enterprise-profile__loading">{error}</div>;
  }

  if (!empresa) {
    return (
      <div className="enterprise__loading">
        <div className="enterprise__spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  const imageUrl = `http://backend.devconnect.local:8000/uploads/fotos/empresa_${id}.jpg?${Date.now()}`;

  return (
    <div className="enterprise-profile">
      <div className="container">
        <div className="enterprise-profile__header text-center mb-4">
          <img
            src={imageUrl}
            alt={empresa.nombre || 'Empresa'}
            className="enterprise-profile__image mb-3"
            onError={(e) => {
              e.currentTarget.onerror = null; // evitar loop infinito
              e.currentTarget.src = companyPlaceholder;
            }}
          />
          <h1 className="enterprise-profile__name">{empresa.nombre}</h1>
          <p className="enterprise-profile__description">
            {empresa.descripcion || 'Sin descripción.'}
          </p>
        </div>

        <section className="enterprise-profile__info">
          <div className="row g-4">
            <div className="col-md-6 d-flex">
              <article className="enterprise-card flex-fill">
                <h3 className="enterprise-card__title">Email</h3>
                <p className="enterprise-card__text">{empresa.email}</p>
              </article>
            </div>
            <div className="col-md-6 d-flex">
              <article className="enterprise-card flex-fill">
                <h3 className="enterprise-card__title">Teléfono</h3>
                <p className="enterprise-card__text">{empresa.telefono || 'No especificado'}</p>
              </article>
            </div>
            <div className="col-md-6 d-flex">
              <article className="enterprise-card flex-fill">
                <h3 className="enterprise-card__title">Sector</h3>
                <p className="enterprise-card__text">{empresa.sector || 'No especificado'}</p>
              </article>
            </div>
            <div className="col-md-6 d-flex">
              <article className="enterprise-card flex-fill">
                <h3 className="enterprise-card__title">Número de Empleados</h3>
                <p className="enterprise-card__text">{empresa.num_empleados || 'No especificado'}</p>
              </article>
            </div>
            <div className="col-md-12 d-flex">
              <article className="enterprise-card flex-fill">
                <h3 className="enterprise-card__title">Sitio Web</h3>
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
              </article>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ClientEnterpriseProfilePage;
