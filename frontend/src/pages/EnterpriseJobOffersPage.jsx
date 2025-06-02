// src/pages/EnterpriseJobOffersPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EnterpriseJobOffersPage() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const empresaId = localStorage.getItem('empresaId');

  useEffect(() => {
    if (!empresaId) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:8000/api/ofertalaborals?empresa=/api/empresas/${empresaId}`, {
      headers: {
        Accept: 'application/ld+json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar las ofertas');
        return res.json();
      })
      .then(data => {
        // Usamos data.member según el JSON que diste
        setOffers(data.member || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [empresaId, navigate]);

  const handleDelete = (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta oferta?')) return;

    fetch(`http://localhost:8000/api/ofertalaborals/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/ld+json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al eliminar la oferta');
        setOffers(prev => prev.filter(offer => offer.id !== id));
      })
      .catch(err => {
        alert('No se pudo eliminar la oferta: ' + err.message);
      });
  };

  if (loading) return <div className="container py-5 text-white">Cargando ofertas...</div>;
  if (error) return <div className="container py-5 text-white">Error: {error}</div>;

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-white">Mis Ofertas de Empleo</h1>

      <div className="mb-4">
        <button
          className="btn btn-success"
          onClick={() => navigate('/añadir-oferta')}
        >
          Añadir Oferta
        </button>
      </div>

      {offers.length === 0 ? (
        <p className="text-white">No tienes ofertas laborales publicadas.</p>
      ) : (
        offers.map(offer => (
          <div
            key={offer.id}
            className="card mb-3"
            style={{ backgroundColor: '#d6d6d6', border: '1px solid #ccc' }}
          >
            <div className="card-body">
              <h5 className="card-title" style={{ color: '#000' }}>
                {offer.titulo}
              </h5>
              <p className="card-text" style={{ color: '#000' }}>
                {offer.descripcion}
              </p>
              <p className="card-text" style={{ color: '#000' }}>
                <strong>Tecnologías Requeridas:</strong> {offer.tecnologias_requeridas}
              </p>
              <p className="card-text" style={{ color: '#000' }}>
                <strong>Experiencia Mínima:</strong> {offer.experiencia_minima}
              </p>
              <p className="card-text" style={{ color: '#000' }}>
                <strong>Ubicación:</strong> {offer.ubicacion}
              </p>

              <div className="d-flex">
                <button
                  className="btn btn-warning me-2"
                  onClick={() => navigate(`/editar-oferta/${offer.id}`)}
                >
                  Modificar Oferta
                </button>
                <button
                  className="btn btn-outline-success me-2"
                  onClick={() => navigate(`/oferta-candidatos/${offer.id}`)}
                >
                  Ver Candidatos
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(offer.id)}
                >
                  Eliminar Oferta
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default EnterpriseJobOffersPage;
