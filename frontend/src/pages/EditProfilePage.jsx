import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditProfilePage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    github: '',
    descripcion: '',
  });

  const usuarioId = localStorage.getItem('usuarioId');

  useEffect(() => {
    if (!usuarioId) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:8000/api/usuarios/${usuarioId}`, {
      headers: { Accept: 'application/ld+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar usuario');
        return res.json();
      })
      .then((data) => {
        setUsuario(data);
        setFormData({
          nombre: data.nombre || '',
          apellido: data.apellido || '',
          email: data.email || '',
          telefono: data.telefono || '',
          github: data.github || '',
          descripcion: data.descripcion || '',
        });
      })
      .catch(() => navigate('/login'));
  }, [navigate, usuarioId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/api/usuarios/${usuarioId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/merge-patch+json',
        Accept: 'application/ld+json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al guardar cambios');
        return res.json();
      })
      .then(() => navigate('/perfil'))
      .catch((err) => {
        console.error(err);
        alert('Hubo un error al guardar el perfil');
      });
  };

  if (!usuario) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 text-white">
        Cargando perfil...
      </div>
    );
  }

  return (
    <div className="container py-5 text-white">
      <h2 className="mb-4">Editar Perfil</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Apellido</label>
          <input
            type="text"
            className="form-control"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">GitHub</label>
          <input
            type="url"
            className="form-control"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            rows="4"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success px-4">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfilePage;
