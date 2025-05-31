import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-3">
      <div className="container text-center">
        <div className="mb-2">
          <a href="#" className="text-success me-3">
            <i className="bi bi-twitter me-1"></i>
            Twitter
          </a>
          <a href="#" className="text-success me-3">
            <i className="bi bi-instagram me-1"></i>
            Instagram
          </a>
          <a href="#" className="text-success">
            <i className="bi bi-linkedin me-1"></i>
            LinkedIn
          </a>
        </div>
        <div>
          <a href="#" className="text-secondary small me-2">
            Términos de Uso
          </a>
          <a href="#" className="text-secondary small me-2">
            Privacidad
          </a>
          <a href="#" className="text-secondary small">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
