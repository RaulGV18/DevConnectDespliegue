// src/pages/EnterpriseProfilePage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMode } from '../ModeContext';
import profileImg from '../img/ejemplo.png';

function EnterpriseProfilePage() {
  const { mode } = useMode();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode !== 'empresa') {
      // Si el usuario no está en modo empresa, se redirige a la página principal
      navigate('/');
    }
  }, [mode, navigate]);

  return (
    <div className="container py-5">
      {/* Información principal de la empresa */}
      <div className="row align-items-center mb-4">
        <div className="col-md-3 text-center">
          {/* Foto de la Empresa */}
          <img
            src={profileImg}
            alt="Foto de la Empresa"
            className="img-fluid rounded-circle"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="col-md-9">
          <h1 style={{ color: '#fff' }}>Nombre de la Empresa</h1>
          <p style={{ color: '#fff' }}>
            Breve descripción de la empresa. Aquí se resaltan la misión, visión y
            valores corporativos, así como los servicios ofrecidos.
          </p>
        </div>
      </div>

      {/* Información Adicional de la Empresa */}
      <div className="empresa-details mb-5">
        <h2 style={{ color: '#fff' }}>Información de la Empresa</h2>
        <p style={{ color: '#fff' }}><strong>Email:</strong> empresa@ejemplo.com</p>
        <p style={{ color: '#fff' }}><strong>Teléfono:</strong> +34 600 111 222</p>
        <p style={{ color: '#fff' }}><strong>Ubicación:</strong> Madrid, España</p>
        <p style={{ color: '#fff' }}><strong>Año de Fundación:</strong> 2010</p>
        <p style={{ color: '#fff' }}><strong>Número de Empleados:</strong> 250</p>
      </div>

      {/* Sección de Ofertas Publicadas */}
      <div className="ofertas-section">
        <h2 style={{ color: '#fff' }}>Mis Ofertas</h2>
        <p style={{ color: '#fff' }}>
          Aquí se mostrarán las ofertas publicadas por tu empresa.
        </p>
        {/* Puedes implementar el listado de ofertas aquí */}
      </div>
    </div>
  );
}

export default EnterpriseProfilePage;
