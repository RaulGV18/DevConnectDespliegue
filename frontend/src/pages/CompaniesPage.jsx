// src/pages/CompaniesPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import companyImg from '../img/ejemploempresa.png'; // Imagen genérica

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/empresas');
        if (!res.ok) {
          throw new Error(`Error al cargar empresas: ${res.statusText}`);
        }
        const data = await res.json();
        const companiesList = data.member || [];
        setCompanies(companiesList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <div className="container py-5 text-white">Cargando empresas...</div>;
  if (error) return <div className="container py-5 text-danger">Error: {error}</div>;

  return (
    <div className="container py-5">
      <h1 className="mb-4" style={{ color: '#fff' }}>Empresas</h1>

      <div className="row">
        {companies.length === 0 && (
          <p style={{ color: '#fff' }}>No hay empresas disponibles.</p>
        )}

        {companies.map((company) => (
          <div key={company.id} className="col-md-4 mb-3">
            <div
              className="card h-100 shadow text-center d-flex flex-column"
              style={{
                backgroundColor: '#d6d6d6',
                border: '1px solid #ccc',
                padding: '15px',
              }}
            >
              <img
                src={companyImg}
                alt={company.nombre || 'Empresa'}
                className="img-fluid rounded-circle mx-auto"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                }}
              />
              <h5 className="card-title mt-3" style={{ color: '#000' }}>
                {company.nombre}
              </h5>
              <p className="card-text" style={{ color: '#000' }}>
                <strong>Número de empleados:</strong> {company.num_empleados || 'N/A'}
              </p>
              <p className="card-text" style={{ color: '#000' }}>
                <strong>Teléfono:</strong> {company.telefono || 'N/A'}
              </p>
              <p className="card-text" style={{ color: '#000', textAlign: 'left' }}>
                <strong>Descripción:</strong> {company.descripcion || 'No hay descripción disponible.'}
              </p>
              <p className="card-text" style={{ color: '#000' }}>
                <strong>Sitio web:</strong>{' '}
                {company.sitio_web ? (
                  <a href={company.sitio_web} target="_blank" rel="noreferrer">
                    {company.sitio_web}
                  </a>
                ) : (
                  'N/A'
                )}
              </p>
              <Link to={`/empresas/perfil/${company.id}`} className="btn btn-outline-success mt-auto">
                Ver perfil
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompaniesPage;
