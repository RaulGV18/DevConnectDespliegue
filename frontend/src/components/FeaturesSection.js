import React from 'react';
import '../styles/FeaturesSection.css'; // Importa el CSS para los efectos hover

function FeaturesSection() {
  return (
    <section className="features-section py-5" style={{ backgroundColor: '#000' }}>
      <div className="container">
        <div className="row text-center">
          {/* Card 1 */}
          <div className="col-md-4 mb-4">
            <div className="feature-card card h-100 bg-dark text-white border-success shadow-sm">
              <div className="card-body">
                <div className="mb-3">
                  <i
                    className="bi bi-person-check"
                    style={{ fontSize: '2rem' }}
                  ></i>
                </div>
                <h5 className="card-title">Perfil Profesional</h5>
                <p className="card-text">
                  Destaca tu experiencia y habilidades con un perfil completo.
                </p>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="col-md-4 mb-4">
            <div className="feature-card card h-100 bg-dark text-white border-success shadow-sm">
              <div className="card-body">
                <div className="mb-3">
                  <i
                    className="bi bi-code-square"
                    style={{ fontSize: '2rem' }}
                  ></i>
                </div>
                <h5 className="card-title">Proyectos Destacados</h5>
                <p className="card-text">
                  Comparte y exhibe tus proyectos de forma profesional.
                </p>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="col-md-4 mb-4">
            <div className="feature-card card h-100 bg-dark text-white border-success shadow-sm">
              <div className="card-body">
                <div className="mb-3">
                  <i
                    className="bi bi-briefcase"
                    style={{ fontSize: '2rem' }}
                  ></i>
                </div>
                <h5 className="card-title">Ofertas de Empleo</h5>
                <p className="card-text">
                  Encuentra oportunidades laborales que se adapten a ti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
