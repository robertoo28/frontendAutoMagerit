import { useState } from 'react'
import './App.css'
import Login from "./components/Login"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import System from "./components/System";
import Prueba from "./components/prueba";

function App() {

  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/system" element={<System />} />
        <Route path="/prueba" element={<Prueba />} />
        {/* Aquí puedes agregar más rutas según sea necesario */}
      </Routes>
    </div>
  </Router>
  )
}

export default App
