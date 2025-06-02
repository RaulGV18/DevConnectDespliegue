import React, { useState, useEffect } from 'react';
import '../styles/CVGenerator.css';

const CVGenerator = () => {
  const [data, setData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    perfil: '',
    experiencia: '',
    educacion: '',
    habilidades: '',
  });

  const [foto, setFoto] = useState(null);
  const [subiendo, setSubiendo] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('usuarioId');
    if (!userId) return;

    fetch(`http://localhost:8000/api/usuarios/${userId}`)
      .then(res => res.json())
      .then(user => {
        setData(prev => ({
          ...prev,
          nombre: user.nombre || '',
          email: user.email || '',
          telefono: user.telefono || '',
          perfil: user.descripcion || '',
        }));
      })
      .catch(err => console.error('Error al cargar datos del usuario:', err));
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFotoChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setSubiendo(true);
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    if (foto) formData.append('foto', foto);

    try {
      const res = await fetch('http://localhost:8000/api/generar-cv', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Error al generar PDF');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Error al enviar datos:', err);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="cv-generator container my-5">
      <h2 className="cv-generator__main-title mb-4">Generador de CV</h2>
      <div className="cv-generator__content row">
        <div className="cv-generator__form col-md-6">
          <label htmlFor="nombre" className="cv-generator__label">Nombre completo</label>
          <input
            id="nombre"
            name="nombre"
            className="cv-generator__input form-control mb-3"
            value={data.nombre}
            onChange={handleChange}
          />

          <label htmlFor="email" className="cv-generator__label">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="cv-generator__input form-control mb-3"
            value={data.email}
            onChange={handleChange}
          />

          <label htmlFor="telefono" className="cv-generator__label">Teléfono</label>
          <input
            id="telefono"
            name="telefono"
            className="cv-generator__input form-control mb-3"
            value={data.telefono}
            onChange={handleChange}
          />

          <label htmlFor="perfil" className="cv-generator__label">Perfil profesional</label>
          <textarea
            id="perfil"
            name="perfil"
            className="cv-generator__textarea form-control mb-3"
            value={data.perfil}
            onChange={handleChange}
          />

          <label htmlFor="experiencia" className="cv-generator__label">Experiencia laboral</label>
          <textarea
            id="experiencia"
            name="experiencia"
            className="cv-generator__textarea form-control mb-3"
            value={data.experiencia}
            onChange={handleChange}
          />

          <label htmlFor="educacion" className="cv-generator__label">Educación</label>
          <textarea
            id="educacion"
            name="educacion"
            className="cv-generator__textarea form-control mb-3"
            value={data.educacion}
            onChange={handleChange}
          />

          <label htmlFor="habilidades" className="cv-generator__label">Habilidades</label>
          <textarea
            id="habilidades"
            name="habilidades"
            className="cv-generator__textarea form-control mb-3"
            value={data.habilidades}
            onChange={handleChange}
          />

          <label htmlFor="foto" className="cv-generator__label">Foto (opcional)</label>
          <input
            id="foto"
            type="file"
            accept="image/*"
            className="cv-generator__file-input form-control mb-3"
            onChange={handleFotoChange}
          />

          <button
            className="cv-generator__button btn btn-primary"
            onClick={handleSubmit}
            disabled={subiendo}
          >
            {subiendo ? 'Generando...' : 'Generar PDF'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CVGenerator;
