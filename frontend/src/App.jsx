import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { Login } from './pages/Login';
import { Register } from './pages/Registro';

import { ForgotPassword } from './pages/ForgotPassword';
import { NewPassword } from './pages/NewPassword';
import { NotFound } from './pages/NotFound'; // Para la ruta 404
import {ResetPassword} from './pages/ResetPassword'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Register />} />

        <Route path="recuperar" element={<ForgotPassword />} />
        <Route path="reset/:token" element={<ResetPassword />} />
        <Route path="nueva-contrasena" element={<NewPassword />} />


        {/* Ruta para cualquier otra que no exista */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
