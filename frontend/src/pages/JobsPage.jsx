import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JobsPage() {
  const [ofertas, setOfertas] = useState([]);
  const [empresas, setEmpresas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para redireccionar

  useEffect(() => {
    fetch('http://localhost:8000/api/ofertalaborals', {
      headers: { Accept: 'application/ld+json' },
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar las ofertas');
        return res.json();
      })
      .then(async (data) => {
        const ofertasData = data.member || [];

        const empresaRefs = [
          ...new Set(
            ofertasData
              .map(oferta => oferta.empresa)
              .filter(Boolean)
          ),
        ];

        const fetchEmpresaNombre = async (empresaRef) => {
          try {
            let url = '';
            if (typeof empresaRef === 'string') {
              url = empresaRef.startsWith('http')
                ? empresaRef
                : `http://localhost:8000${empresaRef}`;
            } else if (typeof empresaRef === 'number') {
              url = `http://localhost:8000/api/empresas/${empresaRef}`;
            } else {
              return 'Nombre no disponible';
            }

            const res = await fetch(url, { headers: { Accept: 'application/ld+json' } });
            if (!res.ok) return 'Nombre no disponible';
            const empresaData = await res.json();
            return empresaData.nombre || 'Nombre no disponible';
          } catch {
            return 'Nombre no disponible';
          }
        };

        const empresasMap = {};
        await Promise.all(
          empresaRefs.map(async (empresaRef) => {
            const nombre = await fetchEmpresaNombre(empresaRef);
            empresasMap[empresaRef] = nombre;
          })
        );

        setEmpresas(empresasMap);
        setOfertas(ofertasData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const postularse = (id) => {
    navigate(`/postular/${id}`);
  };

  if (loading) return <div className="container py-5">Cargando ofertas...</div>;
  if (error) return <div className="container py-5 text-danger">Error: {error}</div>;

  return (
    <div className="container py-5">
      <h1 className="mb-4" style={{ color: '#fff' }}>Ofertas de Empleo</h1>

      <ul className="list-group">
        {ofertas.length === 0 && (
          <li className="list-group-item text-center">No hay ofertas disponibles.</li>
        )}

        {ofertas.map(oferta => (
          <li
            key={oferta.id}
            className="list-group-item mb-3"
            style={{
              backgroundColor: '#d6d6d6',
              border: '1px solid #ccc',
              padding: '20px',
            }}
          >
            <div className="d-flex flex-column">
              <h5 style={{ color: '#000', marginBottom: '0.5rem' }}>
                {oferta.titulo || 'Sin título'}
              </h5>
              <p style={{ color: '#000', marginBottom: '1rem' }}>
                <strong>Empresa:</strong>{' '}
                <span style={{ color: 'green', textDecoration: 'underline' }}>
                  {empresas[oferta.empresa] || 'Empresa no disponible'}
                </span>
              </p>
              <p style={{ color: '#000', textAlign: 'left' }}>
                <strong>Funciones:</strong> {oferta.descripcion || 'No hay descripción'}
              </p>
              <p style={{ color: '#000', marginTop: '0.5rem' }}>
                <strong>Tecnologías mínimas requeridas:</strong> {oferta.tecnologiasMinimas || 'No especificado'}
              </p>
              <p style={{ color: '#000', marginTop: '0.5rem' }}>
                <strong>Experiencia mínima:</strong> {oferta.experienciaMinima || 'No especificada'}
              </p>
              <p style={{ color: '#000', marginTop: '0.5rem' }}>
                <strong>Ubicación:</strong> {oferta.ubicacion || 'No especificada'}
              </p>
              <button
                className="btn btn-success mt-3"
                type="button"
                onClick={() => postularse(oferta.id)}
              >
                Aplicar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobsPage;
