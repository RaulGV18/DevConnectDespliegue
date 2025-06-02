import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EditEnterpriseProfilePage.css';

function EditEnterpriseProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    sector: '',
    sitio_web: '',
    descripcion: '',
    num_empleados: '',
    telefono: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const empresaId = localStorage.getItem('empresaId');
    if (!empresaId) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:8000/api/empresas/${empresaId}`, {
      headers: {
        Accept: 'application/ld+json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al cargar la empresa');
        return res.json();
      })
      .then((data) => {
        setFormData({
          nombre: data.nombre || '',
          email: data.email || '',
          sector: data.sector || '',
          sitio_web: data.sitio_web || '',
          descripcion: data.descripcion || '',
          num_empleados: data.num_empleados || '',
          telefono: data.telefono || '',
        });
      })
      .catch((err) => {
        console.error(err);
        setError('No se pudo cargar el perfil de empresa.');
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const empresaId = localStorage.getItem('empresaId');
    if (!empresaId) return;

    fetch(`http://localhost:8000/api/empresas/${empresaId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/merge-patch+json',
        Accept: 'application/ld+json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al guardar los cambios');
        return res.json();
      })
      .then(() => navigate('/perfil-empresa'))
      .catch((err) => {
        console.error(err);
        setError('Hubo un problema al actualizar el perfil.');
      });
  };

  return (
    <div className="edit-enterprise-profile__container">
      <h1 className="edit-enterprise-profile__title">Editar Perfil de Empresa</h1>
      {error && <div className="alert alert-danger edit-enterprise-profile__alert">{error}</div>}
      <form className="edit-enterprise-profile__form" onSubmit={handleSubmit}>
        <div className="edit-enterprise-profile__form-group">
          <label className="edit-enterprise-profile__label">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="edit-enterprise-profile__input"
          />
        </div>

        <div className="edit-enterprise-profile__form-group">
          <label className="edit-enterprise-profile__label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="edit-enterprise-profile__input"
          />
        </div>

        <div className="edit-enterprise-profile__form-group">
          <label className="edit-enterprise-profile__label">Sector</label>
          <input
            type="text"
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="edit-enterprise-profile__input"
          />
        </div>

        <div className="edit-enterprise-profile__form-group">
          <label className="edit-enterprise-profile__label">Sitio Web</label>
          <input
            type="text"
            name="sitio_web"
            value={formData.sitio_web}
            onChange={handleChange}
            className="edit-enterprise-profile__input"
          />
        </div>

        <div className="edit-enterprise-profile__form-group">
          <label className="edit-enterprise-profile__label">Descripción</label>
          <textarea
            name="descripcion"
            rows="3"
            value={formData.descripcion}
            onChange={handleChange}
            className="edit-enterprise-profile__textarea"
          ></textarea>
        </div>

        <div className="edit-enterprise-profile__form-group">
          <label className="edit-enterprise-profile__label">Número de Empleados</label>
          <input
            type="text"
            name="num_empleados"
            value={formData.num_empleados}
            onChange={handleChange}
            className="edit-enterprise-profile__input"
          />
        </div>

        <div className="edit-enterprise-profile__form-group">
          <label className="edit-enterprise-profile__label">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="edit-enterprise-profile__input"
          />
        </div>

        <button type="submit" className="edit-enterprise-profile__button">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default EditEnterpriseProfilePage;
