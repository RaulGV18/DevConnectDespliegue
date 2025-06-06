import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EditProfilePage.css';

function EditProfilePage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
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
        // Cargar imagen si existe
        setFotoPreview(`http://localhost:8000/uploads/fotos/usuario_${usuarioId}.jpg?${Date.now()}`);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append('fotoPerfil', file);

    fetch(`http://localhost:8000/subir-foto/${usuarioId}`, {
      method: 'POST',
      body: formDataImg,
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          console.error('Error en la respuesta:', errorText);
          throw new Error(`Error al subir imagen: ${res.status} ${res.statusText} - ${errorText}`);
        }
        return res.json();
      })
      .then(() => {
        setFotoPreview(`http://localhost:8000/uploads/fotos/usuario_${usuarioId}.jpg?${Date.now()}`);
      })
      .catch((err) => {
        console.error('Error al subir la imagen:', err);
        alert(`Error al subir la imagen: ${err.message}`);
      });
  };

  if (!usuario) {
    return (
      <div className="profile-page__loading">
        <div className="profile-page__spinner"></div>
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="edit-profile">
      <h2 className="edit-profile__title">Editar Perfil</h2>

      <div className="edit-profile__image-upload">
        <img
          src={fotoPreview || 'https://via.placeholder.com/150'}
          alt="Foto de perfil"
          className="edit-profile__preview-image"
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

      <form onSubmit={handleSubmit} className="edit-profile__form">
        <div className="edit-profile__form-group">
          <label className="edit-profile__label">Nombre</label>
          <input
            type="text"
            className="edit-profile__input"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-profile__form-group">
          <label className="edit-profile__label">Apellido</label>
          <input
            type="text"
            className="edit-profile__input"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-profile__form-group">
          <label className="edit-profile__label">Email</label>
          <input
            type="email"
            className="edit-profile__input"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="edit-profile__form-group">
          <label className="edit-profile__label">Teléfono</label>
          <input
            type="text"
            className="edit-profile__input"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="edit-profile__form-group">
          <label className="edit-profile__label">GitHub</label>
          <input
            type="url"
            className="edit-profile__input"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />
        </div>

        <div className="edit-profile__form-group">
          <label className="edit-profile__label">Descripción</label>
          <textarea
            className="edit-profile__textarea"
            name="descripcion"
            rows="4"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="edit-profile__form-group">
          <button type="submit" className="edit-profile__button">
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfilePage;
