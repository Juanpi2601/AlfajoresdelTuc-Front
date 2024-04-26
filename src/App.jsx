import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaPrincipalV1 from './components/paginaPrincipal/PaginaPrincipalV1'
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
      
    <BrowserRouter>
      <main>
        <PaginaPrincipalV1></PaginaPrincipalV1>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
      </Routes>
    <PaginaPrincipalV1/>
      </main>
    </BrowserRouter>
  )
}

export default App
