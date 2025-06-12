import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMode } from '../ModeContext';
import '../styles/PostularPage.css';

function PostularPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mode } = useMode();

  const [cvFile, setCvFile] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (mode !== 'cliente' || !localStorage.getItem('usuarioId')) {
      navigate('/');
    }
  }, [mode, navigate]);

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const usuarioId = localStorage.getItem('usuarioId');
    if (!usuarioId) {
      setError('Usuario no autenticado.');
      setSubmitting(false);
      return;
    }

    if (!cvFile) {
      setError('Por favor selecciona un archivo.');
      setSubmitting(false);
      return;
    }

    try {
      const postData = {
        ofertalaboral: `/api/ofertalaborals/${id}`,
        usuario: `/api/usuarios/${usuarioId}`,
      };

      const resPostulacion = await fetch('http://backenddevconnect.work.gd:8000/api/postulacions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ld+json',
          Accept: 'application/ld+json',
        },
        body: JSON.stringify(postData),
      });

      if (!resPostulacion.ok) {
        const errorBody = await resPostulacion.json();
        throw new Error(errorBody['hydra:description'] || 'Error al crear la postulación');
      }

      const postulacion = await resPostulacion.json();

      const formData = new FormData();
      formData.append('cv', cvFile);

      const resUpload = await fetch(`http://backenddevconnect.work.gd:8000/postulacion/upload-pdf/${postulacion.id}`, {
        method: 'POST',
        body: formData,
      });

      if (!resUpload.ok) {
        const errorText = await resUpload.text();
        throw new Error(`Error al subir el CV: ${errorText}`);
      }

      alert('¡Postulación y CV enviados con éxito!');
      navigate('/empleos');
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="postular container py-5">
      <h1 className="postular__title mb-4 text-white">Postularse a la Oferta</h1>
      <form className="postular__form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <div className="postular__form-group mb-3">
          <label htmlFor="cv" className="postular__label form-label text-white">
            Sube tu CV
          </label>
          <input
            type="file"
            id="cv"
            name="cv"
            accept=".pdf,.doc,.docx"
            className="postular__input form-control"
            onChange={handleFileChange}
          />
        </div>
        {error && <div className="postular__error text-danger mb-3">{error}</div>}
        <button type="submit" className="postular__submit btn btn-success" disabled={submitting}>
          {submitting ? 'Enviando...' : 'Enviar Postulación'}
        </button>
      </form>
    </div>
  );
}

export default PostularPage;
