import React, { useState, useEffect } from 'react';
import {cargarUsuarios } from '../services/clientServices';
import { registrarActivo } from '../services/clientServices'; 
const System=()=> {
    const opcionesPrimerSelector = ['[essentia]Activos esenciales', '[arch] Arquitectura del sistema','[D] Datos / Información',
'[K] Claves criptográficas','[S] Servicios','[SW] Software','[HW] Equipamiento informático','[COM] Redes','[Media] Soportes de información', '[L]Instalaciones','[P]Personal']  ;
    const opcionesSegundoSelector = {

        '[essentia]Activos esenciales': [      '[info] información',
        '[adm] datos de interés para la administración pública',
        '[vr] datos vitales (registros de la organización) (1)',
        '[per] datos de carácter personal (2)',
        '[A] nivel alto',
        '[M] nivel medio',
        '[B] nivel bajo',
        '[classified] datos clasificados (3)',
        '[C] nivel confidencial',
        '[R] difusión limitada',
        '[UC] sin clasificar',
        '[pub] de carácter público',
        '[service] servicio'],

        '[arch] Arquitectura del sistema': ['[sap] punto de [acceso al] servicio (1)',
        '[ip] punto de interconexión (2)',
        '[ext] proporcionado por terceros (3)'],

        '[D] Datos / Información':['[files] ficheros',
    '[backup] copias de respaldo',
    '[conf] datos de configuración (1)',
    '[int] datos de gestión interna',
    '[password] credenciales (ej. contraseñas)',
    '[auth] datos de validación de credenciales',
    '[acl] datos de control de acceso',
    '[log] registro de actividad (2)',
],
        '[K] Claves criptográficas':['[info] protección de la información',
        '[encrypt] claves de cifra',
        '[shared_secret] secreto compartido (clave simétrica) (1)',
        '[public_encryption] clave pública de cifra (2)',
        '[public_decryption] clave privada de descifrado (2)',
        '[sign] claves de firma',
        '[shared_secret] secreto compartido (clave simétrica)',
        '[public_signature] clave privada de firma (2)',
        '[public_verification] clave pública de verificación de firma (2)',
        '[com] protección de las comunicaciones',
        '[channel] claves de cifrado del canal',
        '[authentication] claves de autenticación',
        '[verification] claves de verificación de autenticación',
        '[disk] cifrado de soportes de información',
        '[encrypt] claves de cifra',
        '[x509] certificados de clave pública',
        ],
        '[S] Servicios':['[anon] anónimo (sin requerir identificación del usuario)',
        '[pub] al público en general (sin relación contractual)',
        '[ext] a usuarios externos (bajo una relación contractual)',
        '[int] interno (a usuarios de la propia organización)',
        '[www] world wide web',
        '[telnet] acceso remoto a cuenta local',
        '[email] correo electrónico',
        '[file] almacenamiento de ficheros',
        '[ftp] transferencia de ficheros',
        '[edi] intercambio electrónico de datos',
        '[dir] servicio de directorio (1)',
        '[idm] gestión de identidades (2)',
        '[ipm] gestión de privilegios',
        '[pki] PKI - infraestructura de clave pública (3)',
        ],
        '[SW] Software':['[prp] desarrollo propio (in house)',
        '[sub] desarrollo a medida (subcontratado)',
        '[std] estándar (off the shelf)',
        '[browser] navegador web',
        '[www] servidor de presentación',
        '[app] servidor de aplicaciones',
        '[email_client] cliente de correo electrónico',
        '[email_server] servidor de correo electrónico',
        '[file] servidor de ficheros',
        '[dbms] sistema de gestión de bases de datos',
        '[tm] monitor transaccional',
        '[office] ofimática',
        '[av] anti virus',
        '[os] sistema operativo',
        '[hypervisor] gestor de máquinas virtuales',
        '[ts] servidor de terminales',
        '[backup] sistema de backup',
        ],
        '[HW] Equipamiento informático':['[host] grandes equipos (1)',
        '[mid] equipos medios (2)',
        '[pc] informática personal (3)',
        '[mobile] informática móvil (4)',
        '[pda] agendas electrónicas',
        '[vhost] equipo virtual',
        '[backup] equipamiento de respaldo (5)',
        '[peripheral] periféricos',
        '[print] medios de impresión (6)',
        '[scan] escáneres',
        '[crypto] dispositivos criptográficos',
        '[bp] dispositivo de frontera (7)',
        '[network] soporte de la red (8)',
        '[modem] módems',
        '[hub] concentradores',
        '[switch] conmutadores',
        '[router] encaminadores',
        '[bridge] pasarelas',
        '[firewall] cortafuegos',
        '[wap] punto de acceso inalámbrico',
        '[pabx] centralita telefónica',
        '[ipphone] teléfono IP',
        ], 
        '[COM] Redes':['[PSTN] red telefónica',
        '[ISDN] rdsi (red digital)',
        '[X25] X25 (red de datos)',
        '[ADSL] ADSL',
        '[pp] punto a punto',
        '[radio] comunicaciones radio',
        '[wifi] red inalámbrica',
        '[mobile] telefonía móvil',
        '[sat] por satélite',
        '[LAN] red local',
        '[MAN] red metropolitana',
        '[Internet] Internet',
        ],
        '[Media] Soportes de información':[],
        '[L]Instalaciones':['[site] recinto',
        '[building] edificio',
        '[local] cuarto',
        '[mobile] plataformas móviles',
        '[car] vehículo terrestre: coche, camión, etc.',
        '[plane] vehículo aéreo: avión, etc.',
        '[ship] vehículo marítimo: buque, lancha, etc.',
        '[shelter] contenedores',
        '[channel] canalización',
        '[backup] instalaciones de respaldo'],
        '[P]Personal':['[ue] usuarios externos',
        '[ui] usuarios internos',
        '[op] operadores',
        '[adm] administradores de sistemas',
        '[com] administradores de comunicaciones',
        '[dba] administradores de BBDD',
        '[sec] administradores de seguridad',
        '[des] desarrolladores / programadores',
        '[sub] subcontratas',
        '[prov] proveedores'],
        
    };
  
    const [seleccionPrimera, setSeleccionPrimera] = useState('');
    const [seleccionSegunda, setSeleccionSegunda] = useState('');
    const [nameActive, setNameActive] = useState('');
  
    const manejarCambioPrimero = (e) => {
      setSeleccionPrimera(e.target.value);
      setSeleccionSegunda(''); // Resetea la selección del segundo selector
    };
    const [usuarios, setUsuarios] = useState([]);
    const [subCategoria, setSubCategoria] = useState('');


  useEffect(() => {
    const obtenerUsuarios = async () => {
      const usuariosCargados = await cargarUsuarios();
      setUsuarios(usuariosCargados);
    };

    obtenerUsuarios();
  }, []);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir recarga de la página
    try {
      setNameActive(seleccionPrimera);
      setSubCategoria(seleccionSegunda);
  
      const respuesta = await registrarActivo(name, nameActive, subCategoria, description);
      console.log(respuesta, name,nameActive,subCategoria,description)
      console.log('Respuesta del servidor:', respuesta);
      
      // Manejo post-envío: limpiar formulario, mostrar mensaje de éxito, etc.
    } catch (error) {
      // Manejar el error
    }
  
  }
  console.log(name,nameActive,subCategoria,description);
  return (
    
    <div className='bg-gray-800 min-h-screen w-full'>
      

      <div className='flex flex-col justify-center items-center  '>
        
        
      <h1 className="text-blue-300 text-3xl lg:text-4xl font-semibold tracking-wide italic shadow-md text-center bg-clip-text text-transparent bg-gradient-to-br from-gray-300 blue-pink-300 to-teal-300 hover:from-teal-300 hover:to-purple-300 transition duration-700 ease-in-out mb-7">
  Registro de activos de MageritDynamics
</h1>
<div className="flex justify-between items-start w-full px-4 relative">

<ul class="space-y-1">
  <li>
    <a
      href=""
      class="group flex items-center justify-between rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
</svg>

      <span class="text-sm font-medium"> General </span>
    </a>
  </li>

  <li>
    <a
      href=""
      class="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
</svg>

      <span class="text-sm font-medium"> Teams </span>

      <span
        class="shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700"
      >
        5
      </span>
    </a>
  </li>



  <li>
    <a
      href=""
      class="group flex items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

      <span class="text-sm font-medium"> Account </span>
    </a>
  </li>
</ul>
<div className=''>
<form onSubmit={handleSubmit} className='sm:w-full sm:px-5 md:px-10 lg:px-20 py-5 md:max-w-screen-sm bg-gray-900 p-8 rounded-lg absolute left-0 right-0 mx-auto'>
          
          <div className='mb-4'>
            
          <label className="block text-white mb-2">Tipo de activo</label>
            <select className="w-full p-2 rounded-lg" value={seleccionPrimera} onChange={manejarCambioPrimero}>
              <option value="">Seleccione una opción</option>
              {opcionesPrimerSelector.map((opcion, index) => (
                <option key={index} value={opcion}>{opcion}</option>
              ))}
            </select>
          </div>
          {seleccionPrimera && (
            <div className='mb-4'>
              <label className="block text-white mb-2">Subcategoria de activo</label>
              <select className="w-full p-2 rounded-lg" value={seleccionSegunda} onChange={(e) => setSeleccionSegunda(e.target.value)}>
                <option value="">Seleccione una opción</option>
                {opcionesSegundoSelector[seleccionPrimera]?.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
          )}
          <div className='mb-4'>
            <label className="block text-white mb-2">Dueño</label>
            <select className="w-full p-2 rounded-lg" value={name} onChange={(e)=> setName(e.target.value)}>
            {usuarios.map((usuario, index) => (
                <option key={index} value={usuario.id}> 
                  {usuario.name} 
                </option>
              ))}
            </select>
          </div>
          <div className='mb-4'>
      <label className="block text-white mb-2">Descripción</label>
      <textarea className="w-full p-2 bg-gray-800 text-white rounded-lg" rows="4" placeholder="Ingrese la descripción aquí..."value={description} onChange={(e) =>setDescription(e.target.value)} ></textarea>
    </div>
          <button type='submit' className='sm:w-full md:w-1/2 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Agregar</button>
        </form>
        </div>
        </div>
      </div>
    </div>
    
  );
  
}

export default System;
