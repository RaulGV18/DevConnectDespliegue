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

    fetch(`http://backenddevconnect.work.gd:8000/api/ofertalaborals?empresa=/api/empresas/${empresaId}`, {
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

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta oferta y todas sus postulaciones asociadas?')) return;

    try {
      // Obtener postulaciones asociadas a la oferta
      const res = await fetch(`http://backenddevconnect.work.gd:8000/api/postulacions?oferta=/api/ofertalaborals/${id}`, {
        headers: { Accept: 'application/ld+json' }
      });

      if (!res.ok) throw new Error('No se pudieron obtener las postulaciones');

      const data = await res.json();

      // Eliminar cada postulación y su CV
      for (const postulacion of data.member || []) {
        // Intentar eliminar el PDF (ignorar si no existe)
        await fetch(`http://backenddevconnect.work.gd:8000/postulacion/delete-pdf/${postulacion.id}`, {
          method: 'DELETE'
        });

        // Eliminar la postulación
        await fetch(`http://backenddevconnect.work.gd:8000/api/postulacions/${postulacion.id}`, {
          method: 'DELETE',
          headers: { Accept: 'application/ld+json' }
        });
      }

      // Eliminar la oferta laboral
      const deleteRes = await fetch(`http://backenddevconnect.work.gd:8000/api/ofertalaborals/${id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/ld+json' }
      });

      if (!deleteRes.ok) throw new Error('Error al eliminar la oferta');

      // Actualizar la lista de ofertas
      setOffers(prev => prev.filter(offer => offer.id !== id));
    } catch (err) {
      alert('No se pudo eliminar la oferta o sus postulaciones: ' + err.message);
    }
  };

  if (loading) return (
    <div className="enterprise__loading">
      <div className="enterprise__spinner"></div>
      <p>Cargando ofertas...</p>
    </div>
  );

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
