import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBarV1 from './components/NavBarV1/NavBarV1';
import Products from './pages/Products';
import PaginaPrincipal from './pages/PaginaPrincipal';
import Profile from './pages/Profile';
import ProtectedRouteAdmin from './protectecRoute/ProtectedRouteAdmin';
import Admin from './pages/Admin';
import PanelUserAdmin from './components/Admin/PanelUserAdmin';
import PanelProductos from './components/paginaProductos/PanelProductos';
import { ProductProvider } from './context/ProductContext';
import ContactPage from './pages/Contact';
function App() {

  return (
      
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
        <NavBarV1 />
        <main>
          <Routes>
            <Route path='/' element = {<PaginaPrincipal/>}/>
            <Route path="/products" element = {<Products/>}/>
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
        </main>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App;
