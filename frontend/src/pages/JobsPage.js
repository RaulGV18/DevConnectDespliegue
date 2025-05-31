// src/pages/jobspage.js
import React from 'react';
import { Link } from 'react-router-dom';

function JobsPage() {
  return (
    <div className="container py-5">
      {/* Título principal */}
      <h1 className="mb-4" style={{ color: '#fff' }}>Ofertas de Empleo</h1>

      {/* Lista vertical de ofertas */}
      <ul className="list-group">
        {/* Oferta 1 */}
        <li
          className="list-group-item mb-3"
          style={{
            backgroundColor: '#d6d6d6',
            border: '1px solid #ccc',
            padding: '20px',
          }}
        >
          <div className="d-flex flex-column">
            <h5 style={{ color: '#000', marginBottom: '0.5rem' }}>
              Desarrollador Frontend
            </h5>
            {/* Apartado de Empresa */}
            <p style={{ color: '#000', marginBottom: '1rem' }}>
              <strong>Empresa:</strong>{' '}
              <Link
                to="/empresas/perfil"
                style={{ color: 'green', textDecoration: 'underline' }}
              >
                Nombre de Empresa
              </Link>
            </p>
            <p style={{ color: '#000', textAlign: 'left' }}>
              <strong>Funciones:</strong> Desarrollar interfaces web utilizando React,
              HTML y CSS, optimizar la experiencia de usuario y mantener el rendimiento
              de la aplicación.
            </p>
            <p style={{ color: '#000', textAlign: 'left', marginTop: '0.5rem' }}>
              <strong>Perfil:</strong> Se busca un profesional comprometido, con habilidades
              creativas, buena comunicación y capacidad para trabajar en equipo.
            </p>
            <p style={{ color: '#000', textAlign: 'left', marginTop: '0.5rem' }}>
              <strong>Detalles:</strong> Jornada completa. 40 horas semanales.
              <br />
              <strong>Salario:</strong> €2.500 netos/mes.
            </p>
            {/* Botón para aplicar */}
            <button className="btn btn-success mt-3" type="button">
              Aplicar
            </button>
          </div>
        </li>

        {/* Oferta 2 */}
        <li
          className="list-group-item mb-3"
          style={{
            backgroundColor: '#d6d6d6',
            border: '1px solid #ccc',
            padding: '20px',
          }}
        >
          <div className="d-flex flex-column">
            <h5 style={{ color: '#000', marginBottom: '0.5rem' }}>
              Diseñador UX/UI
            </h5>
            <p style={{ color: '#000', marginBottom: '1rem' }}>
              <strong>Empresa:</strong>{' '}
              <Link
                to="/empresas/perfil"
                style={{ color: 'green', textDecoration: 'underline' }}
              >
                Nombre de Empresa
              </Link>
            </p>
            <p style={{ color: '#000', textAlign: 'left' }}>
              <strong>Funciones:</strong> Crear y mejorar interfaces visuales, elaborar wireframes
              y prototipos, y realizar pruebas de usabilidad para optimizar la experiencia del usuario.
            </p>
            <p style={{ color: '#000', textAlign: 'left', marginTop: '0.5rem' }}>
              <strong>Perfil:</strong> Buscamos un profesional con sólidos conocimientos en herramientas
              de diseño (Sketch, Adobe XD, etc.) y capacidad de adaptación a metodologías ágiles.
            </p>
            <p style={{ color: '#000', textAlign: 'left', marginTop: '0.5rem' }}>
              <strong>Detalles:</strong> Modalidad presencial o híbrida. 40 horas semanales.
              <br />
              <strong>Salario:</strong> €2.000 brutos/mes.
            </p>
            <button className="btn btn-success mt-3" type="button">
              Aplicar
            </button>
          </div>
        </li>

        {/* Oferta 3 */}
        <li
          className="list-group-item mb-3"
          style={{
            backgroundColor: '#d6d6d6',
            border: '1px solid #ccc',
            padding: '20px',
          }}
        >
          <div className="d-flex flex-column">
            <h5 style={{ color: '#000', marginBottom: '0.5rem' }}>
              Gerente de Proyecto
            </h5>
            <p style={{ color: '#000', marginBottom: '1rem' }}>
              <strong>Empresa:</strong>{' '}
              <Link
                to="/empresas/perfil"
                style={{ color: 'green', textDecoration: 'underline' }}
              >
                Nombre de Empresa
              </Link>
            </p>
            <p style={{ color: '#000', textAlign: 'left' }}>
              <strong>Funciones:</strong> Coordinar equipos multidisciplinares, gestionar cronogramas,
              asignar recursos y garantizar el cumplimiento de objetivos.
            </p>
            <p style={{ color: '#000', textAlign: 'left', marginTop: '0.5rem' }}>
              <strong>Perfil:</strong> Se busca un líder con experiencia, habilidades organizativas y
              excelente capacidad de comunicación, capaz de gestionar situaciones de presión.
            </p>
            <p style={{ color: '#000', textAlign: 'left', marginTop: '0.5rem' }}>
              <strong>Detalles:</strong> Contrato por proyecto con opción a tiempo completo. 40 horas
              semanales.
              <br />
              <strong>Salario:</strong> €3.000 netos/mes.
            </p>
            <button className="btn btn-success mt-3" type="button">
              Aplicar
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default JobsPage;
