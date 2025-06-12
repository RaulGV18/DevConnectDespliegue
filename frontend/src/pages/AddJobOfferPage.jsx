import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddJobOfferPage.css';

function AddJobOfferPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tecnologias_requeridas: '',
    experiencia_minima: '',
    ubicacion: '',
  });

  const [error, setError] = useState(null);
  const empresaId = localStorage.getItem('empresaId');

  useEffect(() => {
    if (!empresaId) {
      navigate('/login');
    }
  }, [empresaId, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      empresa: `/api/empresas/${empresaId}`,
    };

    try {
      const response = await fetch('http://backenddevconnect.work.gd:8000/api/ofertalaborals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
          Accept: 'application/ld+json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
      }

      navigate('/misofertas');
    } catch (err) {
      setError('Error al crear la oferta. ' + err.message);
      console.error('Error al enviar:', err);
    }
  };

  return (
    <div className="add-offer__background">
      <div className="add-offer" role="main" aria-labelledby="add-offer-title">
        <h1 id="add-offer-title" className="add-offer__title">Añadir Nueva Oferta</h1>

        {error && (
          <div className="add-offer__error" role="alert">
            {error}
          </div>
        )}

        <form className="add-offer__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="titulo" className="add-offer__label">Título</label>
          <input
            id="titulo"
            type="text"
            name="titulo"
            className="add-offer__input"
            value={formData.titulo}
            onChange={handleChange}
            required
          />

          <label htmlFor="descripcion" className="add-offer__label">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="add-offer__textarea"
            value={formData.descripcion}
            onChange={handleChange}
            rows="4"
            required
          />

          <label htmlFor="tecnologias_requeridas" className="add-offer__label">Tecnologías Requeridas</label>
          <input
            id="tecnologias_requeridas"
            type="text"
            name="tecnologias_requeridas"
            className="add-offer__input"
            placeholder="Ej: React, Symfony, Docker"
            value={formData.tecnologias_requeridas}
            onChange={handleChange}
            required
          />

          <label htmlFor="experiencia_minima" className="add-offer__label">Experiencia Mínima</label>
          <input
            id="experiencia_minima"
            type="text"
            name="experiencia_minima"
            className="add-offer__input"
            placeholder="Ej: 2 años"
            value={formData.experiencia_minima}
            onChange={handleChange}
            required
          />

          <label htmlFor="ubicacion" className="add-offer__label">Ubicación</label>
          <input
            id="ubicacion"
            type="text"
            name="ubicacion"
            className="add-offer__input"
            value={formData.ubicacion}
            onChange={handleChange}
            required
          />

          <button type="submit" className="add-offer__button">Publicar Oferta</button>
        </form>
      </div>
    </div>
  );
}

export default AddJobOfferPage;
