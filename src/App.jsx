import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBarV1 from './components/NavBarV1/NavBarV1';
import PaginaPrincipal from './pages/PaginaPrincipal';
import Profile from './pages/Profile';
import ProtectedRouteAdmin from './protectecRoute/ProtectedRouteAdmin';
import Admin from './pages/Admin';
import PanelUserAdmin from './components/Admin/PanelUserAdmin';
import PanelProductos from './components/paginaProductos/PanelProductos';
import { ProductProvider } from './context/ProductContext';
import ContactPage from './pages/Contact';
import ButtonWhatsapp from '/src/components/Contact/ButtonWhatsapp.jsx'
import PaginaProductos from './pages/PaginaProductos';
import About from './pages/About';
import Footer from './pages/Footer';
function App() {

  return (
      
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
        <NavBarV1 />
        <main>
          <Routes>
            <Route path='/' element = {<PaginaPrincipal/>}/>
            <Route path="/about" element = {<About/>}/>
            <Route path="/products" element = {<PaginaProductos/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
            <Route element={<ProtectedRouteAdmin/>}>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/admin/usuarios" element={<PanelUserAdmin/>}/>
                <Route path="/admin/productos" element={<PanelProductos />} />
            </Route>
          </Routes>
          <ButtonWhatsapp/>
        </main>
        <Footer/>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App;
