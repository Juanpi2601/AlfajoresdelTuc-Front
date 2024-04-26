import React, { useState } from 'react';
import { Col, Container, Nav, Navbar, Offcanvas, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const NavBarV1 = () => {

    const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showCarrito, setShowCarrito] = useState(false)

  const handleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
  const handleCarrito = () => setShowCarrito(!showCarrito);

  return (
    <Container fluid className='div1'>
      <Row className='py-3'>
        <Navbar expand="lg">
          <Container>
            <Col sm={2} md={2} lg={2}>
              <img className="img-fluid w-50" src="https://i.postimg.cc/W1Z4mtcj/Screenshot-1-removebg-preview.png" alt=""/>
            </Col>
            <Col className=" d-none d-lg-block ">
              <Nav className="d-flex justify-content-end">
                <Link to='' className="mx-3">
                  <CallIcon fontSize="large" style={{ color: 'black'}}/>
                </Link>
                <Link to='' className="mx-3">
                  <ShoppingCartIcon fontSize="large" style={{ color: 'black'}}/>
                </Link>
                <Link to='./login' className="mx-3">
                  <PersonIcon fontSize="large" style={{ color: 'black'}}/>
                </Link>
              </Nav>
            </Col>
            <Col className='d-flex justify-content-end d-lg-none'>
              <Navbar.Toggle className='p-2 justify-content-end' aria-controls="basic-navbar-nav" onClick={handleCarrito}>CARRITO</Navbar.Toggle>
              <Navbar.Toggle className="justify-content-end" aria-controls="basic-navbar-nav" onClick={handleOffcanvas} />
            </Col>
          </Container>
        </Navbar>
      </Row>
      <Container>
        <Row>
          <Col className=" d-none d-lg-block pb-2">
            <Nav variant="underline" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link href="/home">NOSOTROS</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/link-1">PRODUCTOS</Nav.Link>
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
            <Nav.Link href="/home">NOSOTROS</Nav.Link>
            <Nav.Link href="/link-1">PRODUCTOS</Nav.Link>
            <Nav.Link href="/link-2">LOCALES</Nav.Link>
            <Nav.Link href="/link-3">NOVEDADES</Nav.Link>
            <Nav.Link href="/link-4">CONTACTO</Nav.Link>
            <Link to='./login' className="text-decoration-none">INICIAR SESION</Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
}

export default NavBarV1