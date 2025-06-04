import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/JobsPage.css';

function JobsPage() {
  const [ofertas, setOfertas] = useState([]);
  const [empresas, setEmpresas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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
              return { nombre: 'Nombre no disponible', id: null };
            }

            const res = await fetch(url, { headers: { Accept: 'application/ld+json' } });
            if (!res.ok) return { nombre: 'Nombre no disponible', id: null };
            const empresaData = await res.json();
            return { nombre: empresaData.nombre || 'Nombre no disponible', id: empresaData.id };
          } catch {
            return { nombre: 'Nombre no disponible', id: null };
          }
        };

        const empresasMap = {};
        await Promise.all(
          empresaRefs.map(async (empresaRef) => {
            const { nombre, id } = await fetchEmpresaNombre(empresaRef);
            empresasMap[empresaRef] = { nombre, id };
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
            return (
              <li key={oferta.id} className="jobs-page__item">
                <div className="jobs-page__card">
                  <h5 className="jobs-page__titulo">
                    {oferta.titulo || 'Sin título'}
                  </h5>
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
                  <button
                    className="btn btn-success mt-3"
                    onClick={() => postularse(oferta.id)}
                  >
                    Aplicar
                  </button>
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
