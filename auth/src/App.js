import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages';
import AuthUpload from './pages/authUpload';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Dashboard from './pages/dashboard';

library.add(fas)

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home />} exact />
      <Route path='/dashboard' element={<Dashboard />} exact />
      <Route path='/products/new' element={<AuthUpload />} exact />
      </Routes>
    </BrowserRouter>
  )
}

export default App
