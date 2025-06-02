import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
      const response = await fetch('http://localhost:8000/api/ofertalaborals', {
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

      // Redirigir a la lista de ofertas
      navigate('/misofertas');
    } catch (err) {
      setError('Error al crear la oferta. ' + err.message);
      console.error('Error al enviar:', err);
    }
  };

  return (
    <div className="container py-5 text-white">
      <h1 className="mb-4">Añadir Nueva Oferta</h1>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            name="titulo"
            className="form-control"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            value={formData.descripcion}
            onChange={handleChange}
            required
            rows="4"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tecnologías Requeridas</label>
          <input
            type="text"
            name="tecnologias_requeridas"
            className="form-control"
            value={formData.tecnologias_requeridas}
            onChange={handleChange}
            placeholder="Ej: React, Symfony, Docker"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Experiencia Mínima</label>
          <input
            type="text"
            name="experiencia_minima"
            className="form-control"
            value={formData.experiencia_minima}
            onChange={handleChange}
            placeholder="Ej: 2 años"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ubicación</label>
          <input
            type="text"
            name="ubicacion"
            className="form-control"
            value={formData.ubicacion}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Publicar Oferta
        </button>
      </form>
    </div>
  );
}

export default AddJobOfferPage;
