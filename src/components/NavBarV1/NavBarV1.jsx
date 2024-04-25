import React, { useState } from 'react';
import { Col, Container, Nav, Navbar, Offcanvas, Row } from 'react-bootstrap';

const NavBarV1 = () => {

    const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showCarrito, setShowCarrito] = useState(false)

  const handleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
  const handleCarrito = () => setShowCarrito(!showCarrito);

  return (
    <Container fluid>
      <Row className='py-3'>
        <Navbar expand="lg">
          <Container>
            <Col>
              <h1>Aqui va el logo</h1>
            </Col>
            <Col className=" d-none d-lg-block">
              <Nav className="d-flex justify-content-end">
                <Nav.Link href="/link-4">CONTACTO</Nav.Link>
                <Nav.Link href="#link">CARRITO</Nav.Link>
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
          <Col className=" d-none d-lg-block">
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
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
}

export default NavBarV1