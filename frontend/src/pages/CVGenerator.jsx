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

    fetch(`http://backend.devconnect.local:8000/api/usuarios/${userId}`)
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
      const res = await fetch('http://backend.devconnect.local:8000/api/generar-cv', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Error al generar PDF');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CV.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error al enviar datos:', err);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="cv-generator">
      <h2 className="cv-generator__title">Generador de CV</h2>
      <form className="cv-generator__form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <label className="cv-generator__label">Nombre completo</label>
        <input
          name="nombre"
          value={data.nombre}
          onChange={handleChange}
          className="cv-generator__input"
        />

        <label className="cv-generator__label">Email</label>
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          className="cv-generator__input"
        />

        <label className="cv-generator__label">Teléfono</label>
        <input
          name="telefono"
          value={data.telefono}
          onChange={handleChange}
          className="cv-generator__input"
        />

        <label className="cv-generator__label">Perfil profesional</label>
        <textarea
          name="perfil"
          value={data.perfil}
          onChange={handleChange}
          className="cv-generator__textarea"
        />

        <label className="cv-generator__label">Experiencia laboral</label>
        <textarea
          name="experiencia"
          value={data.experiencia}
          onChange={handleChange}
          className="cv-generator__textarea"
        />

        <label className="cv-generator__label">Educación</label>
        <textarea
          name="educacion"
          value={data.educacion}
          onChange={handleChange}
          className="cv-generator__textarea"
        />

        <label className="cv-generator__label">Habilidades</label>
        <textarea
          name="habilidades"
          value={data.habilidades}
          onChange={handleChange}
          className="cv-generator__textarea"
        />

        <label className="cv-generator__label">Foto (opcional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFotoChange}
          className="cv-generator__file"
        />

        <button
          className="cv-generator__button"
          type="submit"
          disabled={subiendo}
        >
          {subiendo ? 'Generando...' : 'Generar PDF'}
        </button>
      </form>
    </div>
  );
};

export default CVGenerator;
