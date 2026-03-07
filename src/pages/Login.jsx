import React, { useState } from 'react';
import { AuthLayout } from '../layouts/AuthLayout';
import '../components/FloatingBubbles.css'; // Importamos la animación

export const Login = () => {
  const [formData, setFormData] = useState({ usuario: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos a enviar:", formData);
    // Aquí después irá tu lógica con SpringBoot/Supabase
  };

  return (
    <AuthLayout>
      {/* Burbujas flotantes */}
      <div className="floating-bubble bubble-1">Hi</div>
      <div className="floating-bubble bubble-2">Olá</div>
      <div className="floating-bubble bubble-3">Hola</div>
      <div className="floating-bubble bubble-4">안녕하세요</div>
      <div className="floating-bubble bubble-5">你好</div>
      <div className="floating-bubble bubble-6">こんにちは</div>
      {/* Añade el resto de los saludos según tu CSS */}

      {/* Tarjeta de Login */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 z-10 text-center border-2 border-[#0082a9]">
        <h2 className="text-[#0082a9] text-2xl font-bold mb-6">INICIA SESIÓN</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div>
            <label className="text-gray-700 font-bold text-sm">Usuario</label>
            <input 
              type="text" 
              name="usuario"
              placeholder="Ingresa tu usuario" 
              className="w-full mt-1 p-2 border rounded-lg bg-gray-50 focus:outline-none focus:border-[#0082a9]"
              onChange={handleInputChange}
            />
          </div>
          
          <div>
            <label className="text-gray-700 font-bold text-sm">Contraseña</label>
            <input 
              type="password" 
              name="password"
              placeholder="Ingresa tu contraseña" 
              className="w-full mt-1 p-2 border rounded-lg bg-gray-50 focus:outline-none focus:border-[#0082a9]"
              onChange={handleInputChange}
            />
          </div>

          <a href="#" className="text-xs text-[#0082a9] text-center font-bold hover:underline mb-2">
            ¿Olvidaste tu contraseña?
          </a>

          <button 
            type="submit" 
            className="bg-[#0082a9] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#006685] transition-colors self-center w-3/4">
            INICIAR SESIÓN
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};