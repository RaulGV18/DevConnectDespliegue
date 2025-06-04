import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EnterpriseMainPage.css';

function EnterpriseMainPage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="enterprise-hero-section text-center py-5 bg-dark text-white">
        <div className="container">
          <h1 className="display-4">Encuentra el Talento Ideal</h1>
          <p className="lead">
            Conecta con profesionales calificados y haz crecer tu equipo
          </p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-success btn-lg" onClick={() => navigate('/jobs/create')}>
              Publicar Oferta
            </button>
            <button className="btn btn-outline-success btn-lg" onClick={() => navigate('/candidates')}>
              Buscar Candidatos
            </button>
          </div>
        </div>
      </section>

      <section className="enterprise-features-section py-5 bg-black">
        <div className="container">
          <div className="row text-center">
            {/* Card 1 */}
            <div className="col-md-4 mb-4">
              <div className="feature-card card h-100 bg-dark text-white border-success shadow-sm">
                <div className="card-body">
                  <i className="bi bi-bullseye mb-3" style={{ fontSize: '2rem' }}></i>
                  <h5 className="card-title">Contratación Efectiva</h5>
                  <p className="card-text">
                    Publica ofertas y recibe postulaciones de talento calificado.
                  </p>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="col-md-4 mb-4">
              <div className="feature-card card h-100 bg-dark text-white border-success shadow-sm">
                <div className="card-body">
                  <i className="bi bi-bar-chart-line mb-3" style={{ fontSize: '2rem' }}></i>
                  <h5 className="card-title">Dashboard de Postulaciones</h5>
                  <p className="card-text">
                    Gestiona todas tus ofertas y candidatos desde un solo lugar.
                  </p>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="col-md-4 mb-4">
              <div className="feature-card card h-100 bg-dark text-white border-success shadow-sm">
                <div className="card-body">
                  <i className="bi bi-person-lines-fill mb-3" style={{ fontSize: '2rem' }}></i>
                  <h5 className="card-title">Visibilidad para tu Empresa</h5>
                  <p className="card-text">
                    Mejora tu reputación mostrando tu perfil empresarial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="enterprise-cta-section text-center py-5 bg-success text-white">
        <div className="container">
          <h2>Empieza hoy a construir tu equipo ideal</h2>
          <button className="btn btn-dark btn-lg mt-3" onClick={() => navigate('/profile/company')}>
            Completa tu Perfil de Empresa
          </button>
        </div>
      </section>
    </>
  );
}

export default EnterpriseMainPage;
