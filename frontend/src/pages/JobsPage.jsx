import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JobsPage.css';

function JobsPage() {
  const [ofertas, setOfertas] = useState([]);
  const [empresas, setEmpresas] = useState({});
  const [postulaciones, setPostulaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const usuarioId = localStorage.getItem('usuarioId');
  const usuarioRef = `/api/usuarios/${usuarioId}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ofertasRes, postulacionesRes] = await Promise.all([
          fetch('http://localhost:8000/api/ofertalaborals', {
            headers: { Accept: 'application/ld+json' },
          }),
          fetch('http://localhost:8000/api/postulacions', {
            headers: { Accept: 'application/ld+json' },
          }),
        ]);

        if (!ofertasRes.ok || !postulacionesRes.ok) throw new Error('Error al cargar datos');

        const ofertasData = await ofertasRes.json();
        const postulacionesData = await postulacionesRes.json();

        const ofertasList = ofertasData.member || [];
        const postulacionesList = postulacionesData.member || [];

        const empresaRefs = [
          ...new Set(ofertasList.map(oferta => oferta.empresa).filter(Boolean)),
        ];

        const empresasMap = {};
        await Promise.all(
          empresaRefs.map(async (empresaRef) => {
            const url = empresaRef.startsWith('http')
              ? empresaRef
              : `http://localhost:8000${empresaRef}`;
            const res = await fetch(url, {
              headers: { Accept: 'application/ld+json' },
            });
            if (res.ok) {
              const empresaData = await res.json();
              empresasMap[empresaRef] = {
                nombre: empresaData.nombre || 'Nombre no disponible',
                id: empresaData.id,
              };
            }
          })
        );

        setEmpresas(empresasMap);
        setOfertas(ofertasList);
        setPostulaciones(postulacionesList);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const postularse = (ofertaId) => {
    navigate(`/postular/${ofertaId}`);
  };

  const eliminarPostulacionYcv = async (ofertaId) => {
    const postulacion = postulaciones.find(
      p => p.usuario === usuarioRef && p.ofertalaboral === `/api/ofertalaborals/${ofertaId}`
    );

    if (!postulacion) return;

    if (!window.confirm('¿Estás seguro de que quieres eliminar tu postulación y el archivo CV?')) return;

    try {
      const resCv = await fetch(`http://localhost:8000/postulacion/delete-pdf/${postulacion.id}`, {
        method: 'DELETE',
      });

      const res = await fetch(`http://localhost:8000/api/postulacions/${postulacion.id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/ld+json' },
      });

      if (!res.ok) throw new Error('No se pudo eliminar la postulación');
      if (!resCv.ok) {
        const data = await resCv.json();
        console.warn('CV no eliminado:', data.error);
      }

      setPostulaciones(prev => prev.filter(p => p.id !== postulacion.id));
      alert('Postulación y CV eliminados correctamente.');
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const filteredOfertas = ofertas.filter(oferta =>
    oferta.titulo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="jobs__loading">
        <div className="jobs__spinner"></div>
        <p>Cargando ofertas...</p>
      </div>
    );
  }

  if (error) {
    return <div className="jobs-page__error text-danger">Error: {error}</div>;
  }

  return (
    <div className="jobs-page container py-5">
      <h1 className="jobs-page__title mb-4">Ofertas de Empleo</h1>

      <input
        type="text"
        className="form-control mb-4 jobs-page__search"
        placeholder="Buscar por título..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className="jobs-page__list list-unstyled">
        {filteredOfertas.length === 0 ? (
          <li className="jobs-page__empty">No hay ofertas disponibles.</li>
        ) : (
          filteredOfertas.map(oferta => {
            const empresa = empresas[oferta.empresa];
            const yaPostulado = postulaciones.some(
              p => p.usuario === usuarioRef && p.ofertalaboral === `/api/ofertalaborals/${oferta.id}`
            );

            return (
              <li key={oferta.id} className="jobs-page__item">
                <div className="jobs-page__card">
                  <h5 className="jobs-page__titulo">{oferta.titulo || 'Sin título'}</h5>
                  <p className="jobs-page__empresa">
                    <strong>Empresa:</strong>{' '}
                    {empresa?.id ? (
                      <a href={`/empresas/perfil/${empresa.id}`} className="jobs-page__empresa-link">
                        {empresa.nombre}
                      </a>
                    ) : (
                      'Empresa no disponible'
                    )}
                  </p>
                  <p><strong>Funciones:</strong> {oferta.descripcion || 'No hay descripción'}</p>
                  <p><strong>Tecnologías mínimas requeridas:</strong> {oferta.tecnologiasMinimas || 'No especificado'}</p>
                  <p><strong>Experiencia mínima:</strong> {oferta.experienciaMinima || 'No especificada'}</p>
                  <p><strong>Ubicación:</strong> {oferta.ubicacion || 'No especificada'}</p>
                  {yaPostulado ? (
                    <button
                      className="btn btn-danger mt-3"
                      onClick={() => eliminarPostulacionYcv(oferta.id)}
                    >
                      Eliminar Postulación
                    </button>
                  ) : (
                    <button
                      className="btn btn-success mt-3"
                      onClick={() => postularse(oferta.id)}
                    >
                      Aplicar
                    </button>
                  )}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

export default JobsPage;
