// src/pages/EnterpriseProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      headers: {
        Accept: 'application/ld+json',
      },
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
      <div
        className="d-flex justify-content-center align-items-center text-white"
        style={{ height: '100vh', backgroundColor: '#000' }}
      >
        Cargando perfil de empresa...
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '40px 0' }}>
      <div className="container text-white">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>{empresa.nombre}</h1>
          <button
            className="btn btn-outline-success mt-4"
            onClick={() => navigate('/editar-perfil-empresa')}
          >
            Editar Perfil
          </button>
        </div>
        <p className="fs-5 mb-4 fst-italic">{empresa.descripcion || 'Sin descripción.'}</p>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card bg-dark text-white shadow h-100 p-3">
              <h5>Email</h5>
              <p>{empresa.email}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-dark text-white shadow h-100 p-3">
              <h5>Teléfono</h5>
              <p>{empresa.telefono || 'No especificado'}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-dark text-white shadow h-100 p-3">
              <h5>Sector</h5>
              <p>{empresa.sector || 'No especificado'}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card bg-dark text-white shadow h-100 p-3">
              <h5>Número de Empleados</h5>
              <p>{empresa.num_empleados || 'No especificado'}</p>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card bg-dark text-white shadow h-100 p-3">
              <h5>Sitio Web</h5>
              {empresa.sitio_web ? (
                <a
                  href={empresa.sitio_web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-success text-decoration-underline"
                >
                  {empresa.sitio_web}
                </a>
              ) : (
                <p>No proporcionado</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterpriseProfilePage;
