import React, { useRef, useState, useEffect } from 'react';

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

  const cvRef = useRef();

  // Obtener datos del usuario logueado al cargar
  useEffect(() => {
    const userId = localStorage.getItem('usuarioId');
    if (!userId) return;

    fetch(`http://localhost:8000/api/usuarios/${userId}`)
      .then(res => {
        if (!res.ok) throw new Error('No se pudieron obtener los datos del usuario');
        return res.json();
      })
      .then(user => {
        setData(prev => ({
          ...prev,
          nombre: user.nombre || '',
          email: user.email || '',
          telefono: user.telefono || '',
          perfil: user.descripcion || '',
        }));
      })
      .catch(err => {
        console.error('Error al cargar datos del usuario:', err);
      });
  }, []);

  // Manejador de cambios en formulario
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Enviar datos al backend para que Symfony genere el PDF
  const generarPDF = async () => {
    console.log('📤 Enviando datos al backend para generar PDF:', data);

    try {
      const response = await fetch('http://localhost:8000/api/generar-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('📥 Respuesta del backend:', response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error del servidor:', response.status, errorText);
        alert('Error al generar el PDF: ' + errorText);
        return;
      }

      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/pdf')) {
        console.warn('⚠️ Respuesta no es PDF. Tipo:', contentType);
        alert('La respuesta no es un archivo PDF válido.');
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'cv.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('❗ Error al generar el PDF:', err);
      alert('Error de red o del servidor. Revisa la consola.');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Generador de CV</h2>
      <div className="row">
        {/* Formulario de entrada */}
        <div className="col-md-6">
          <input name="nombre" className="form-control mb-2" placeholder="Nombre completo" value={data.nombre} onChange={handleChange} />
          <input name="email" className="form-control mb-2" placeholder="Email" value={data.email} onChange={handleChange} />
          <input name="telefono" className="form-control mb-2" placeholder="Teléfono" value={data.telefono} onChange={handleChange} />
          <textarea name="perfil" className="form-control mb-2" placeholder="Perfil profesional" value={data.perfil} onChange={handleChange} rows={3} />
          <textarea name="experiencia" className="form-control mb-2" placeholder="Experiencia laboral" value={data.experiencia} onChange={handleChange} rows={3} />
          <textarea name="educacion" className="form-control mb-2" placeholder="Educación" value={data.educacion} onChange={handleChange} rows={2} />
          <textarea name="habilidades" className="form-control mb-2" placeholder="Habilidades" value={data.habilidades} onChange={handleChange} rows={2} />
          <button className="btn btn-primary mt-3" onClick={generarPDF}>
            Generar PDF
          </button>
        </div>

        {/* Vista previa del CV */}
        <div className="col-md-6">
          <div
            ref={cvRef}
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              border: '1px solid #ccc',
              fontFamily: 'Arial',
              width: '100%',
              color: '#000',
            }}
          >
            <h2 style={{ borderBottom: '2px solid #000' }}>{data.nombre}</h2>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Teléfono:</strong> {data.telefono}</p>
            <hr />
            <h4>Perfil Profesional</h4>
            <p>{data.perfil}</p>
            <h4>Experiencia Laboral</h4>
            <p>{data.experiencia}</p>
            <h4>Educación</h4>
            <p>{data.educacion}</p>
            <h4>Habilidades</h4>
            <p>{data.habilidades}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVGenerator;
