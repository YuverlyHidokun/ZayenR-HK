import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { Home } from './pages/home'
import { Login } from './pages/Login'
import { Register } from './pages/Registro'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='registro' element={<Register/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App