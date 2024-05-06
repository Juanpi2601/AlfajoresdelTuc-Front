import React, { useState } from 'react';
import { Col, Container, Nav, NavLink, Navbar, Offcanvas, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ProfileUser from "../profile/ProfileUser";
import { useAuth } from "../../context/UserContext";

const NavBarV1 = () => {

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showCarrito, setShowCarrito] = useState(false)
  const { isAuthenticated, user } = useAuth();

  const handleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
  const handleCarrito = () => setShowCarrito(!showCarrito);

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container fluid className='div1'>
      <Row className='py-3'>
        <Navbar expand="lg">
          <Container>
            <Col sm={2} md={2} lg={2}>
              <Link to="/">
                <img className="img-fluid w-50" src="https://i.postimg.cc/W1Z4mtcj/Screenshot-1-removebg-preview.png" alt="" />
            </Link>
            </Col>
            <Col className=" d-none d-lg-block">
              <Nav className="d-flex justify-content-end ">
                <Link to='./contact' className="mx-3">
                  <CallIcon fontSize="large" style={{ color: 'black'}}/>
                </Link>
                <NavLink to='' className="p-0 mx-3 cursor-pointer" onClick={handleCarrito}>
                  <ShoppingCartIcon fontSize="large" style={{ color: 'black'}}/>
                </NavLink>
                {isAuthenticated ? (
                        <ProfileUser/>
                    ) : (
                        <Link to='./login' className="mx-3">
                            <PersonIcon fontSize="large" style={{ color: 'black'}}/>
                        </Link>
                    )}
              </Nav>
            </Col>
            <Col className='d-flex justify-content-end d-lg-none'>
              <Navbar.Toggle className='p-2 justify-content-end' aria-controls="basic-navbar-nav" onClick={handleCarrito}><ShoppingCartIcon fontSize="large" style={{ color: 'black'}}/></Navbar.Toggle>
              <Navbar.Toggle className="justify-content-end" aria-controls="basic-navbar-nav" onClick={handleOffcanvas} />
            </Col>
          </Container>
        </Navbar>
      </Row>
      <Container>
        <Row>
          <Col className=" d-none d-lg-block pb-2">
            <Nav variant="underline" defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link href="/about">NOSOTROS</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/products">PRODUCTOS</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/link-2">LOCALES</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/link-3">NOVEDADES</Nav.Link>
            </Nav.Item>
          </Nav>
          </Col>
        </Row>
      </Container>

      <Offcanvas show={showCarrito} onHide={handleCarrito} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>carrito</p>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={showOffcanvas} onHide={handleOffcanvas} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
              {isAuthenticated ? (
                      <div className='d-flex align-items-end'> 
                          <ProfileUser/>
                          <p className="fs-5 m-0 text-black">Hola!! {user && user.name}</p>
                      </div>
                  ) : (
                      <Link to='./login' className="mx-3">
                          <PersonIcon fontSize="large" style={{ color: 'black'}}/>
                      </Link>
                  )}
            <Nav.Link href="/about">NOSOTROS</Nav.Link>
            <Nav.Link href="/products">PRODUCTOS</Nav.Link>
            <Nav.Link href="/link-2">LOCALES</Nav.Link>
            <Nav.Link href="/link-3">NOVEDADES</Nav.Link>
            <Nav.Link href="/contact">CONTACTO</Nav.Link>
            
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
}

export default NavBarV1;