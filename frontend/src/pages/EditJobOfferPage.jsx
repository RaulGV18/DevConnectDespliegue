// src/pages/EditJobOfferPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/EditJobOfferPage.css';

function EditJobOfferPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [offer, setOffer] = useState({
    titulo: '',
    descripcion: '',
    tecnologias_requeridas: '',
    experiencia_minima: '',
    ubicacion: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/ofertalaborals/${id}`, {
      headers: {
        Accept: 'application/ld+json',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar la oferta');
        return res.json();
      })
      .then(data => {
        setOffer({
          titulo: data.titulo || '',
          descripcion: data.descripcion || '',
          tecnologias_requeridas: data.tecnologias_requeridas || '',
          experiencia_minima: data.experiencia_minima || '',
          ubicacion: data.ubicacion || '',
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setOffer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    fetch(`http://localhost:8000/api/ofertalaborals/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/merge-patch+json',
        Accept: 'application/ld+json',
      },
      body: JSON.stringify(offer),
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al actualizar la oferta');
        return res.json();
      })
      .then(() => {
        setSaving(false);
        alert('Oferta actualizada correctamente');
        navigate('/misofertas');
      })
      .catch(err => {
        setError(err.message);
        setSaving(false);
      });
  };

  if (loading)
    return (
      <div className="edit-offer__background">
        <div className="edit-offer__loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="edit-offer__background">
        <div className="edit-offer__error">{error}</div>
      </div>
    );

  return (
    <div className="edit-offer__background">
      <div className="edit-offer container py-5">
        <h1 className="edit-offer__title">Editar Oferta</h1>
        <p className="edit-offer__subtitle">Modifica la información de tu oferta laboral</p>

        <form onSubmit={handleSubmit} className="edit-offer__form">
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">
              Título
            </label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              className="form-control"
              value={offer.titulo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripción
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              className="form-control"
              rows="4"
              value={offer.descripcion}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tecnologias_requeridas" className="form-label">
              Tecnologías Requeridas
            </label>
            <input
              type="text"
              id="tecnologias_requeridas"
              name="tecnologias_requeridas"
              className="form-control"
              value={offer.tecnologias_requeridas}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="experiencia_minima" className="form-label">
              Experiencia Mínima
            </label>
            <input
              type="text"
              id="experiencia_minima"
              name="experiencia_minima"
              className="form-control"
              value={offer.experiencia_minima}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="ubicacion" className="form-label">
              Ubicación
            </label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              className="form-control"
              value={offer.ubicacion}
              onChange={handleChange}
            />
          </div>

          <div className="edit-offer__buttons">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => navigate('/misofertas')}
              disabled={saving}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditJobOfferPage;
