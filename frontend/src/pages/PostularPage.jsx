import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMode } from '../ModeContext';

function PostularPage() {
  const { id } = useParams(); // ID de la oferta laboral
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

    if (!cvFile) {
      setError('Por favor, selecciona un archivo para subir.');
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('cv', cvFile); // Este nombre debe coincidir con el backend
    formData.append('ofertalaboral_id', id);
    formData.append('usuario_id', localStorage.getItem('usuarioId'));

    try {
      const res = await fetch('http://localhost:8000/postulacion/upload', {
        method: 'POST',
        body: formData,
      });

      const contentType = res.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');

      if (!res.ok) {
        const errorBody = isJson ? await res.json() : await res.text();
        const errorMsg = isJson
          ? (errorBody.message || JSON.stringify(errorBody))
          : errorBody;
        throw new Error(`Error ${res.status}: ${errorMsg}`);
      }

      alert('¡Postulación enviada con éxito!');
      navigate('/empleos');
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-white">Postularse a la Oferta</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="cv" className="form-label">Sube tu CV (PDF, Word, etc.)</label>
          <input
            type="file"
            className="form-control"
            id="cv"
            name="cv"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
        </div>
        {error && <div className="text-danger mb-3">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Enviando...' : 'Enviar Postulación'}
        </button>
      </form>
    </div>
  );
}

export default PostularPage;
