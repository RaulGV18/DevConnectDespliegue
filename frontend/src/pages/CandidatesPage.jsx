import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/CandidatesPage.css';

function CandidatesPage() {
  const { id } = useParams(); // ID de la oferta laboral
  const [postulaciones, setPostulaciones] = useState([]);
  const [usuariosData, setUsuariosData] = useState({});
  const [ofertaNombre, setOfertaNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener postulaciones
        const resPostulaciones = await fetch(
          `http://backend.devconnect.local:8000/api/postulacions?ofertalaboral=/api/ofertalaborals/${id}`, 
          { headers: { Accept: 'application/ld+json' } }
        );

        if (!resPostulaciones.ok) throw new Error('Error al cargar postulaciones');

        const dataPostulaciones = await resPostulaciones.json();
        const postulacionesList = dataPostulaciones.member || [];
        setPostulaciones(postulacionesList);

        // Obtener nombre de la oferta
        const resOferta = await fetch(
          `http://backend.devconnect.local:8000/api/ofertalaborals/${id}`, 
          { headers: { Accept: 'application/ld+json' } }
        );

        if (!resOferta.ok) throw new Error('Error al cargar datos de la oferta');

        const dataOferta = await resOferta.json();
        setOfertaNombre(dataOferta.titulo || `#${id}`);

        // Obtener info de usuarios (candidatos)
        const usuariosFetches = postulacionesList.map(postulacion => {
          const usuarioIRI = postulacion.usuario;
          const usuarioId = usuarioIRI.split('/').pop();
          return fetch(`http://backend.devconnect.local:8000/api/usuarios/${usuarioId}`, {
            headers: { Accept: 'application/ld+json' }
          }).then(res => {
            if (!res.ok) throw new Error('Error al cargar usuario');
            return res.json();
          });
        });

        const usuarios = await Promise.all(usuariosFetches);

        // Convertir a objeto para fácil acceso por ID
        const usuariosMap = {};
        usuarios.forEach((usuario) => {
          usuariosMap[usuario.id] = usuario;
        });

        setUsuariosData(usuariosMap);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="candidates-page__loading">
        <div className="candidates-page__spinner"></div>
        Cargando postulaciones...
      </div>
    );
  }

  if (error) {
    return <div className="candidates-page__error">Error: {error}</div>;
  }

  if (postulaciones.length === 0) {
    return (
      <div className="candidates-page__empty">
        Todavía no hay candidatos para esta oferta.
      </div>
    );
  }

  return (
    <div className="container py-5 candidates-page">
      <h1 className="candidates-page__title mb-4 text-center">
        Candidatos para la oferta "{ofertaNombre}"
      </h1>
      <ul className="list-unstyled candidates-page__list">
        {postulaciones.map((postulacion) => {
          const usuarioIRI = postulacion.usuario;
          const usuarioId = usuarioIRI.split('/').pop();

          const perfilLink = `/perfil-candidato/${usuarioId}`;
          const cvUrl = `http://backend.devconnect.local:8000/descargar-cv/${id}/${usuarioId}`;

          const usuario = usuariosData[usuarioId];

          const nombreCompleto = usuario
            ? `${usuario.nombre} ${usuario.apellido}`
            : 'Nombre no disponible';

          return (
            <li key={postulacion.id} className="candidates-page__item mb-4">
              <div className="candidates-page__card p-3 rounded border d-flex justify-content-between align-items-center">
                <Link to={perfilLink} className="candidates-page__profile-link h5 text-decoration-none mb-0">
                  {nombreCompleto}
                </Link>
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success btn-sm candidates-page__cv-button"
                >
                  Ver CV
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CandidatesPage;
