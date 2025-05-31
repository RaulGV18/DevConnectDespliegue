// src/pages/EnterpriseJobOffersPage.js
import React from 'react';

function EnterpriseJobOffersPage() {
  // Ofertas de ejemplo
  const offers = [
    {
      id: 1,
      position: "Desarrollador FullStack",
      description:
        "Responsable de desarrollar y mantener aplicaciones web y móviles.",
      workingHours: "40 horas semanales",
      salary: "€3000 brutos/mes",
    },
    {
      id: 2,
      position: "Diseñador UX/UI",
      description:
        "Encargado de crear interfaces intuitivas y centradas en el usuario.",
      workingHours: "40 horas semanales",
      salary: "€2500 brutos/mes",
    },
    {
      id: 3,
      position: "Gerente de Proyecto",
      description:
        "Coordinar, planificar y supervisar proyectos de desarrollo.",
      workingHours: "40 horas semanales",
      salary: "€3500 netos/mes",
    },
  ];

  return (
    <div className="container py-5">
      <h1 className="mb-4" style={{ color: '#fff' }}>Mis Ofertas de Empleo</h1>
      
      {/* Botón para añadir una nueva oferta */}
      <div className="mb-4">
        <button className="btn btn-success">Añadir Oferta</button>
      </div>

      {/* Listado de ofertas */}
      {offers.map((offer) => (
        <div
          key={offer.id}
          className="card mb-3"
          style={{ backgroundColor: '#d6d6d6', border: '1px solid #ccc' }}
        >
          <div className="card-body">
            <h5 className="card-title" style={{ color: '#000' }}>
              {offer.position}
            </h5>
            <p className="card-text" style={{ color: '#000' }}>
              {offer.description}
            </p>
            <p className="card-text" style={{ color: '#000' }}>
              <strong>Horas:</strong> {offer.workingHours}
            </p>
            <p className="card-text" style={{ color: '#000' }}>
              <strong>Salario:</strong> {offer.salary}
            </p>

            {/* Botones para modificar la oferta y ver candidatos */}
            <div className="d-flex">
              <button className="btn btn-warning me-2">
                Modificar Oferta
              </button>
              <button className="btn btn-outline-success">
                Ver Candidatos
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EnterpriseJobOffersPage;
