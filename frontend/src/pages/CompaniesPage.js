// src/pages/CompaniesPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import companyImg from '../img/ejemploempresa.png'; // Todas las imágenes usarán esta

function CompaniesPage() {
  return (
    <div className="container py-5">
      {/* Título principal */}
      <h1 className="mb-4" style={{ color: '#fff' }}>Empresas</h1>

      {/* Lista de empresas */}
      <div className="row">
        {/* Empresa 1 */}
        <div className="col-md-4 mb-3">
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
              alt="Acme Corp"
              className="img-fluid rounded-circle mx-auto"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
              }}
            />
            <h5 className="card-title mt-3" style={{ color: '#000' }}>
              Acme Corp
            </h5>
            <p className="card-text" style={{ color: '#000' }}>
              <strong>Número de empleados:</strong> 150
            </p>
            <p
              className="card-text"
              style={{ color: '#000', textAlign: 'left' }}
            >
              <strong>Descripción:</strong> Empresa dedicada a la fabricación
              y distribución de productos innovadores en el sector tecnológico.
              <br />
              <strong>Tiempo en el mercado:</strong> 10 años.
            </p>
            <Link to="/empresas/perfil" className="btn btn-outline-success mt-auto">
              Ver perfil
            </Link>
          </div>
        </div>

        {/* Empresa 2 */}
        <div className="col-md-4 mb-3">
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
              alt="Innovatech"
              className="img-fluid rounded-circle mx-auto"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
              }}
            />
            <h5 className="card-title mt-3" style={{ color: '#000' }}>
              Innovatech
            </h5>
            <p className="card-text" style={{ color: '#000' }}>
              <strong>Número de empleados:</strong> 75
            </p>
            <p
              className="card-text"
              style={{ color: '#000', textAlign: 'left' }}
            >
              <strong>Descripción:</strong> Especializada en soluciones de software
              y hardware, Innovatech ha revolucionado la gestión tecnológica en
              empresas.
              <br />
              <strong>Tiempo en el mercado:</strong> 7 años.
            </p>
            <Link to="/empresas/perfil" className="btn btn-outline-success mt-auto">
              Ver perfil
            </Link>
          </div>
        </div>

        {/* Empresa 3 */}
        <div className="col-md-4 mb-3">
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
              alt="GreenTech Solutions"
              className="img-fluid rounded-circle mx-auto"
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
              }}
            />
            <h5 className="card-title mt-3" style={{ color: '#000' }}>
              GreenTech Solutions
            </h5>
            <p className="card-text" style={{ color: '#000' }}>
              <strong>Número de empleados:</strong> 200
            </p>
            <p
              className="card-text"
              style={{ color: '#000', textAlign: 'left' }}
            >
              <strong>Descripción:</strong> Líder en soluciones sostenibles y
              ecológicas para empresas, comprometida con reducir la huella de
              carbono.
              <br />
              <strong>Tiempo en el mercado:</strong> 15 años.
            </p>
            <Link to="/empresas/perfil" className="btn btn-outline-success mt-auto">
              Ver perfil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompaniesPage;
