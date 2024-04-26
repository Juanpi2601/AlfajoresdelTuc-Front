import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PaginaPrincipalV1 from './components/paginaPrincipal/PaginaPrincipalV1'
import Login from './pages/Login';
import Register from './pages/Register';
import NavBarV1 from './components/NavBarV1/NavBarV1';
import Products from './pages/Products';

function App() {

  return (
      
    <BrowserRouter>
      <NavBarV1 />
      <main>
      <PaginaPrincipalV1/>
        <Routes>
          <Route path="/products" element = {<Products/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register />} />
      </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
