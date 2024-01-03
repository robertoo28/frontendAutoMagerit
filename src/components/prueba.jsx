import React, { useState, useEffect } from 'react';
import { registrarActivo } from '../services/clientServices'; // Asegúrate de importar desde la ubicación correcta

const prueba = () => {
  const [name, setName] = useState('');
  const [nameActive, setNameActive] = useState('');
  const [subCategoria, setSubCategoria] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const respuesta = await registrarActivo(name, nameActive, subCategoria, description);
      console.log('Respuesta del servidor:', respuesta);
      console.log(name, nameActive, subCategoria, description)
      // Limpieza del formulario o acciones adicionales aquí
    } catch (error) {
      console.error('Error al registrar el activo:', error);
      setError('Error al registrar el activo.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nombre del Usuario:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="nameActive">Nombre del Activo:</label>
        <input type="text" id="nameActive" value={nameActive} onChange={(e) => setNameActive(e.target.value)} />
      </div>
      <div>
        <label htmlFor="subCategoria">Subcategoría:</label>
        <input type="text" id="subCategoria" value={subCategoria} onChange={(e) => setSubCategoria(e.target.value)} />
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
      </div>
      <button type="submit">Registrar Activo</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default prueba;
