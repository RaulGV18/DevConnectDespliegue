import React from 'react';
import profileImg from '../img/ejemplo.png'; // Ajusta la ruta según la ubicación de la imagen

function ProfilePage() {
  return (
    <div className="container py-5">
      {/* Información del perfil */}
      <div className="row align-items-center mb-4">
        <div className="col-md-3 text-center">
          {/* Imagen de perfil */}
          <img
            src={profileImg}
            alt="Imagen de Perfil"
            className="img-fluid rounded-circle"
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="col-md-9">
          {/* Nombre y biografía */}
          <h1 style={{ color: '#fff' }}>Nombre de Usuario</h1>
          <p style={{ color: '#fff' }}>
            Esta es una breve descripción o biografía del usuario. Aquí se
            detallan sus habilidades, intereses y experiencia en el campo de la
            tecnología.
          </p>
        </div>
      </div>

      {/* Información de Contacto */}
      <div className="contacto-section mt-5">
        <h2 className="mb-4" style={{ color: '#fff' }}>Información de Contacto</h2>
        <p style={{ color: '#fff' }}>
          <strong>Email:</strong> usuario@ejemplo.com
        </p>
        <p style={{ color: '#fff' }}>
          <strong>Teléfono:</strong> +34 600 000 000
        </p>
        <p style={{ color: '#fff' }}>
          <strong>Ubicación:</strong> Atarfe, Andalucía, España
        </p>
      </div>

      {/* Sección de Proyectos */}
      <div className="projects-section mt-5">
        <h2 className="mb-4" style={{ color: '#fff' }}>Proyectos</h2>
        <div className="row">
          {/* Proyecto 1 */}
          <div className="col-md-4 mb-3">
            <div
              className="card h-100 shadow text-center"
              style={{
                backgroundColor: '#d6d6d6',
                borderColor: '#ccc',
                padding: '15px',
              }}
            >
              {/* Imagen centrada */}
              <img
                src={profileImg}
                className="img-fluid mx-auto"
                alt="Proyecto 1"
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#000' }}>
                  Proyecto 1
                </h5>
                <p className="card-text" style={{ color: '#000' }}>
                  Breve descripción del proyecto 1.
                </p>
                <a
                  href="https://example.com/proyecto1"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'green', textDecoration: 'underline' }}
                >
                  Enlace del proyecto
                </a>
              </div>
            </div>
          </div>
          {/* Proyecto 2 */}
          <div className="col-md-4 mb-3">
            <div
              className="card h-100 shadow text-center"
              style={{
                backgroundColor: '#d6d6d6',
                borderColor: '#ccc',
                padding: '15px',
              }}
            >
              <img
                src={profileImg}
                className="img-fluid mx-auto"
                alt="Proyecto 2"
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#000' }}>
                  Proyecto 2
                </h5>
                <p className="card-text" style={{ color: '#000' }}>
                  Breve descripción del proyecto 2.
                </p>
                <a
                  href="https://example.com/proyecto2"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'green', textDecoration: 'underline' }}
                >
                  Enlace del proyecto
                </a>
              </div>
            </div>
          </div>
          {/* Proyecto 3 */}
          <div className="col-md-4 mb-3">
            <div
              className="card h-100 shadow text-center"
              style={{
                backgroundColor: '#d6d6d6',
                borderColor: '#ccc',
                padding: '15px',
              }}
            >
              <img
                src={profileImg}
                className="img-fluid mx-auto"
                alt="Proyecto 3"
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#000' }}>
                  Proyecto 3
                </h5>
                <p className="card-text" style={{ color: '#000' }}>
                  Breve descripción del proyecto 3.
                </p>
                <a
                  href="https://example.com/proyecto3"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'green', textDecoration: 'underline' }}
                >
                  Enlace del proyecto
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
