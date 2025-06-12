import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import companyPlaceholder from '../img/ejemploempresa.png'; // placeholder local
import '../styles/CompaniesPage.css';

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 6;

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await fetch('http://backenddevconnect.work.gd:8000/api/empresas');
        if (!res.ok) {
          throw new Error(`Error al cargar empresas: ${res.statusText}`);
        }
        const data = await res.json();
        const companiesList = data.member || [];
        setCompanies(companiesList);
        setFilteredCompanies(companiesList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = companies.filter((c) =>
      c.nombre?.toLowerCase().includes(value)
    );
    setFilteredCompanies(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);
  const startIndex = (currentPage - 1) * companiesPerPage;
  const displayedCompanies = filteredCompanies.slice(startIndex, startIndex + companiesPerPage);

  if (loading) {
    return (
      <div className="companies__loading">
        <div className="companies__spinner"></div>
        <p>Cargando empresas...</p>
      </div>
    );
  }

  return (
    <div className="companies">
      <div className="companies__container">
        <h1 className="companies__title">Empresas</h1>

        <input
          type="text"
          className="companies__search"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={handleSearch}
        />

        {displayedCompanies.length === 0 ? (
          <p className="companies__no-results">No hay empresas disponibles.</p>
        ) : (
          <div className="companies__grid">
            {displayedCompanies.map((company) => {
              const imageUrl = `http://backenddevconnect.work.gd:8000/uploads/fotos/empresa_${company.id}.jpg?${Date.now()}`;

              return (
                <div key={company.id} className="companies__card">
                  <img
                    src={imageUrl}
                    alt={company.nombre || 'Empresa'}
                    className="companies__image"
                    onError={(e) => {
                      e.currentTarget.onerror = null; // evitar loop infinito
                      e.currentTarget.src = companyPlaceholder;
                    }}
                  />
                  <h5 className="companies__name">{company.nombre}</h5>
                  <p className="companies__info"><strong>Empleados:</strong> {company.num_empleados || 'N/A'}</p>
                  <p className="companies__info"><strong>Teléfono:</strong> {company.telefono || 'N/A'}</p>
                  <p className="companies__info"><strong>Descripción:</strong> {company.descripcion || 'Sin descripción.'}</p>
                  <p className="companies__info">
                    <strong>Sitio web:</strong>{' '}
                    {company.sitio_web ? (
                      <a href={company.sitio_web} target="_blank" rel="noreferrer">
                        {company.sitio_web}
                      </a>
                    ) : (
                      'N/A'
                    )}
                  </p>
                  <Link to={`/empresas/perfil/${company.id}`} className="companies__link">
                    Ver perfil
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="companies__pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`companies__page-btn ${currentPage === i + 1 ? 'companies__page-btn--active' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompaniesPage;
