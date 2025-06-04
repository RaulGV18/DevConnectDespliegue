import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EnterpriseJobOffersPage.css';

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

  if (loading) return (
    <div className="enterprise__loading">
      <div className="enterprise__spinner"></div>
      <p>Cargando ofertas...</p>
    </div>);
  if (error) return <div className="enterprise-offers__error">Error: {error}</div>;

  return (
    <div className="enterprise-offers">
      <h1 className="enterprise-offers__title">Mis Ofertas de Empleo</h1>

      <div className="enterprise-offers__actions">
        <button
          className="enterprise-offers__add-btn"
          onClick={() => navigate('/añadir-oferta')}
        >
          Añadir Oferta
        </button>
      </div>

      {offers.length === 0 ? (
        <p className="enterprise-offers__no-data">No tienes ofertas laborales publicadas.</p>
      ) : (
        offers.map(offer => (
          <div key={offer.id} className="enterprise-offers__card">
            <div className="enterprise-offers__card-body">
              <h5 className="enterprise-offers__card-title">{offer.titulo}</h5>
              <p className="enterprise-offers__card-text">{offer.descripcion}</p>
              <p className="enterprise-offers__card-text">
                <strong>Tecnologías Requeridas:</strong> {offer.tecnologias_requeridas}
              </p>
              <p className="enterprise-offers__card-text">
                <strong>Experiencia Mínima:</strong> {offer.experiencia_minima}
              </p>
              <p className="enterprise-offers__card-text">
                <strong>Ubicación:</strong> {offer.ubicacion}
              </p>

              <div className="enterprise-offers__buttons">
                <button
                  className="enterprise-offers__btn enterprise-offers__btn--edit"
                  onClick={() => navigate(`/editar-oferta/${offer.id}`)}
                >
                  Modificar Oferta
                </button>
                <button
                  className="enterprise-offers__btn enterprise-offers__btn--view"
                  onClick={() => navigate(`/oferta-candidatos/${offer.id}`)}
                >
                  Ver Candidatos
                </button>
                <button
                  className="enterprise-offers__btn enterprise-offers__btn--delete"
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
