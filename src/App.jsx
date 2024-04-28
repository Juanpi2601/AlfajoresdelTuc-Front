import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBarV1 from './components/NavBarV1/NavBarV1';
import Products from './pages/Products';
import PaginaPrincipal from './pages/PaginaPrincipal';
import Profile from './pages/Profile';

function App() {

  return (
      
    <BrowserRouter>
      <UserProvider>
        <NavBarV1 />
        <main>
          <Routes>
            <Route path='/home' element = {<PaginaPrincipal/>} />
            <Route path="/products" element = {<Products/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
