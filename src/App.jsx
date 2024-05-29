import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './pages/Login';
import Register from './pages/Register';
import NavBarV1 from './components/NavBarV1/NavBarV1';
import PaginaPrincipal from './pages/PaginaPrincipal';
import Profile from './pages/Profile';
import ProtectedRouteUser from './protectecRoute/ProtectedRouteUser';
import Admin from './pages/Admin';
import PanelUserAdmin from './components/Admin/PanelUserAdmin';
import PanelProductosAdmin from './components/Admin/PanelProductosAdmin';
import PanelNovedadesAdmin from './components/Admin/PanelNovedadesAdmin';
import PanelOrdersAdmin from './components/Admin/PanelOrdersAdmin';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import ContactPage from './pages/Contact';
import ButtonWhatsapp from './components/Contact/ButtonWhatsapp';
import PaginaProductos from './pages/PaginaProductos';
import About from './pages/About';
import Footer from './pages/Footer';
import DetallesProductos from './pages/DetallesProductos';
import CarritoCheck from './pages/CarritoCheck';
import SettingsUser from './pages/SettingsUser';
import LocationUser from './pages/LocationUser';
import OrderUser from './pages/OrderUser';
import ProtectedRouteAdmin from './protectecRoute/ProtectedRouteAdmin';
import RecoverPassword from './pages/RecoverPassword';
import SectionNovedades from './pages/SectionNovedades'
import Locales from './pages/Locales'
import Alfatuc from './pages/Alfatuc';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <CartProvider>
          <OrderProvider>
            <NavBarV1 />
            <main>
              <Routes>
                <Route path='/' element={<PaginaPrincipal/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/products" element={<PaginaProductos/>}/> 
                <Route path="/products/:id" element={<DetallesProductos />} />
                <Route path="/locales" element= {<Locales/>} ></Route>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="/forgot-password" element={<RecoverPassword />} />
                <Route path="/CarritoCheck" element={<CarritoCheck />} />
                <Route path="/novedad" element={<SectionNovedades/>} />
                <Route path="/alfatuc" element={<Alfatuc/>} />
                <Route element={<ProtectedRouteAdmin/>}>
                  <Route path="/admin" element={<Admin/>}/>
                  <Route path="/admin/usuarios" element={<PanelUserAdmin/>}/>
                  <Route path="/admin/novedad" element={<PanelNovedadesAdmin/>}/>
                  <Route path="/admin/productos" element={<PanelProductosAdmin />} />
                  <Route path="/admin/orders" element={<PanelOrdersAdmin />} />
                </Route>
                <Route element={<ProtectedRouteUser/>}>
                  <Route path="/profile" element={<Profile/>}/>
                  <Route path="/profile/settings" element={<SettingsUser/>}/>
                  <Route path="/profile/mylocation" element={<LocationUser/>}/>
                  <Route path="/profile/myorders" element={<OrderUser/>}/>
                </Route>
              </Routes>
              <ButtonWhatsapp/>
            </main>
            <ConditionalFooter/>
            <ConditionalStyles />
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
}
function ConditionalFooter() {
  const location = useLocation();
  const noFooterPaths = ['/alfatuc', '/admin/usuarios', '/admin/novedad', '/admin/productos'];

  if (noFooterPaths.includes(location.pathname)) {
    return null;
  }

  return <Footer />;
}
function ConditionalStyles() {
  const location = useLocation();
  const alfatucStyles = `
    body {
      font-family: Arial, sans-serif;
      font-weight: normal;
      background: antiquewhite;
    }
  `;

  if (location.pathname === "/alfatuc") {
    return <style>{alfatucStyles}</style>;
  }

  return null;
}


export default App;
