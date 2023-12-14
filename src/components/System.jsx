import React, { useState, useEffect } from 'react';
import {cargarUsuarios } from '../services/clientServices'; 
function System() {
    const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      const usuariosCargados = await cargarUsuarios();
      setUsuarios(usuariosCargados);
    };

    obtenerUsuarios();
  }, []);
  return (
    <div className='bg-gray-800 h-screen w-full'>
      <div className='flex flex-col justify-center items-start p-4'>
        <h1 className="text-white">Bienvenido al Dashboard</h1>
        {/* Contenido del Dashboard */}
        <form className='max-w-[400px] w-full  bg-gray-900 p-8 px-8 rounded-lg'>
          <div className='mb-4'>
            <label className="block text-white mb-2">Activos</label>
            <select className="w-full p-2 rounded-lg">
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
              {/* Más opciones */}
            </select>
          </div>

          <div className='mb-4'>
            <label className="block text-white mb-2">Subcategoria activos</label>
            <select className="w-full p-2 rounded-lg">
              <option value="opcion1">Opción 1</option>
              <option value="opcion2">Opción 2</option>
              {/* Más opciones */}
            </select>
          </div>

          <div className='mb-4'>
            <label className="block text-white mb-2">Selector 3</label>
            <select className="w-full p-2 rounded-lg">
            {usuarios.map((usuario, index) => (
                <option key={index} value={usuario.id}> 
                  {usuario.name} 
                </option>
              ))}
              {/* Más opciones */}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}

export default System;
