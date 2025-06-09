import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { Home } from './pages/home'
import { Login } from './pages/Login'
import { Register } from './pages/Registro'
import {Forgot} from './pages/Forgot'
import {Reset} from './pages/Reset'
import {Confirm} from './pages/Confirm'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='registro' element={<Register/>}/>
                <Route path='forgot' element={<Forgot/>}/>
                <Route path='reset/:token' element={<Reset/>}/>
                <Route path='confirm/:token' element={<Confirm/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App