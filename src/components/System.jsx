import React, { useState, useEffect } from 'react';
import {cargarUsuarios } from '../services/clientServices'; 
function System() {
    const opcionesPrimerSelector = ['[essentia]Activos esenciales', '[arch] Arquitectura del sistema','[D] Datos / Información',
'[K] Claves criptográficas','[S] Servicios','[SW] Software','[HW] Equipamiento informático','[COM] Redes'];
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
        'prueba':[],
        'prueba':[],
        'prueba':[],
        
    };
  
    const [seleccionPrimera, setSeleccionPrimera] = useState('');
    const [seleccionSegunda, setSeleccionSegunda] = useState('');
  
    const manejarCambioPrimero = (e) => {
      setSeleccionPrimera(e.target.value);
      setSeleccionSegunda(''); // Resetea la selección del segundo selector
    };
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
          <label className="block text-white mb-2">Primera Opción</label>
            <select className="w-full p-2 rounded-lg" value={seleccionPrimera} onChange={manejarCambioPrimero}>
              <option value="">Seleccione una opción</option>
              {opcionesPrimerSelector.map((opcion, index) => (
                <option key={index} value={opcion}>{opcion}</option>
              ))}
            </select>
          </div>
          {seleccionPrimera && (
            <div className='mb-4'>
              <label className="block text-white mb-2">Segunda Opción (Depende de la Primera)</label>
              <select className="w-full p-2 rounded-lg" value={seleccionSegunda} onChange={(e) => setSeleccionSegunda(e.target.value)}>
                <option value="">Seleccione una opción</option>
                {opcionesSegundoSelector[seleccionPrimera]?.map((opcion, index) => (
                  <option key={index} value={opcion}>{opcion}</option>
                ))}
              </select>
            </div>
          )}
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
