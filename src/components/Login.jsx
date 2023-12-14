import React, { useState } from 'react';
import loginImg from '../assets/fondologin.png'
import logoImg from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/clientServices'; 

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const success = await loginUser(email, password);
        if (success) {
            navigate('/system'); // Cambia esto por tu ruta deseada
        }
    }
    return(
        <div className='grid grid-flow-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
            <img className= 'w-full h-full object-cover'src={loginImg} alt="" />
            </div>
            <div className='bg-gray-800 flex flex-col justify-center'>
            <div className="flex items-center justify-center mb-6">
                    <img src={logoImg} alt="Logo" className="h-12 w-auto mr-4" />
                    <h1 className='text-4xl text-blue-300 font-bold mr-7'>Magerit Dynamics</h1>
                </div>
                <form onSubmit ={handleLogin}className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg '>
               
                    <h2 className='text-4xl text-white font-bold text-center'>Iniciar sesión</h2>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Correo</label>
                        <input className = 'rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue focus:bg-gray-800 focus:outline-none' type="text"                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label>Contraseña</label>
                        <input className = 'rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue focus:bg-gray-800 focus:outline-none'type="password"value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='flex justify-between text-gray-400 py-2'>
                        <p className='flex items-center'><input className='mr-2' type="checkbox" />Recuerdame</p>
                    </div>
                    <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Ingresar</button>
                </form>
            </div>
        </div>
    )
}