// src/HeroSection.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-section text-center py-5 bg-dark text-white">
      <div className="container">
        <h1 className="display-4">Conecta, Colabora, Crece</h1>
        <p className="lead">
          Encuentra tu próximo gran proyecto o empleo en tecnología
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-success btn-lg"
            onClick={() => navigate('/empresas')}
          >
            Explorar Empresas
          </button>
          <button
            className="btn btn-outline-success btn-lg"
            onClick={() => navigate('/empleos')}
          >
            Aplicar a Ofertas
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
