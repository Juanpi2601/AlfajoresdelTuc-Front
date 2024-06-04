import React, { useState } from 'react'
import '/src/components/Footer/footer.css'
import { Container, Row, Button, Modal } from 'react-bootstrap'

const FooterV1 = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid>
      <Row>
        <div className='ft1 display-flex mt-4'>
          <div className='logo5 mt-3'>
            <span><img src="/src/assets/LogoCasaHistorica.png" alt="Alfajores-Del-Tucuman" className='img7' /></span>
          </div>
          <div className='secsion1 mt-5'>
            <div className='footer-section'>
              <ul className='text-center list-unstyled'>
                <h3 className='title3'>Alfajores Del Tucumán</h3>
                <li><a href="/">Inicio</a></li>
                <li><a href="/products">Productos</a></li>
                <li><a href="/locales">Novedades</a></li>
                <li><a href="/locales">Sucursales</a></li>
                <li> <a href="/about">Sobre Nosotros</a></li>
                <li><a href="/alfatuc"><img src="/src/assets/LOGO ALFATUC.png" alt="Alfatuc" className='alfatuc' /></a></li>
              </ul>
            </div>
            <div>
              <h3 className='title3 text-center'>Contacto</h3>
              <ul className='text-center list-unstyled'>
                <li>Depto de Marketing y Ventas Tel:+54 9 381 254 2853</li>
                <li>Email: info@alfajoresdeltucuman.com</li>
                <li>alfajoresdeltucuman@hotmail.com.ar</li>
                <li>alfajoresdeltucuman71@gmail.com</li>
              </ul>
            </div>
            <div>
              <h2 className='title3'>Redes Sociales</h2>
              <ul className='text-center list-unstyled'>
                <li> <img src="/src/assets/Facebook.png" alt="facebook" className='facebook p-1 m-1' /> <a target="_blank" href="https://www.facebook.com/alfajores.deltucuman">Facebook</a> </li>
                <li> <img src="/src/assets/instagram.png" alt="Instagram" className='facebook p-1 m-1' /> <a target="_blank" href="https://www.instagram.com/alfajoresdeltucuman/">Instagram</a></li>

              </ul>
            </div>
            <div className='mt-3'>
              <img src="/src/assets/Tucuman-TieneMuchoParaVos.png" alt="tucumantieneMucho" className='tucumantieneMucho' />
            </div>
          </div>
        </div>
        <div className='ft2 ft1'>
          <a href='https://marcatucuman.com.ar/'><img src="/src/assets/TucumanTurismo.png" alt="TucumanTurismo" className='tucumanTurismo align-end' /></a>
        </div>
        <div className='ft1'>
          <p className='text-center'>
            <a onClick={handleShow} className='text-decoration'> <small>Términos y Condicones</small></a>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Términos y Condiciones</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5 className='text-primary'>Introducción</h5>
                Bienvenido a Alfajores Del Tucumán®. Al acceder y utilizar nuestro sitio web, aceptas estar sujeto a estos términos y condiciones.
                <hr />
                <h5 className='text-primary'>Información que Recopilamos</h5>
                Recopilamos la siguiente información personal: nombre, apellido, documento, correo electrónico y ubicación del usuario.
                <hr />

                <h5 className='text-primary'>Uso de la Información</h5>
                Utilizamos tu información personal para mejorar nuestro servicio, comunicarnos contigo y personalizar tu experiencia en nuestro sitio.
                <hr />

                <h5 className='text-primary'>Protección de Datos</h5>
                Implementamos medidas de seguridad para proteger tu información personal. Puedes acceder y modificar tu información contactándonos directamente.
                <hr />

                <h5 className='text-primary'>Divulgacón de Información</h5>
                No compartimos tu información personal con terceros, excepto cuando es necesario para cumplir con la ley o para proporcionar nuestros servicios.
                <hr />

                <h5 className='text-primary'>Derechos de los Usuarios</h5>
                Tienes el derecho de acceder, corregir y retirar tu consentimiento para el uso de tu información personal.
                <hr />

                <h5 className='text-primary'>Cookies y Tecnologías</h5>
                Utilizamos cookies para mejorar tu experiencia en nuestro sitio. Puedes gestionar las cookies a través de la configuración de tu navegador.
                <hr />

                <h5 className='text-primary'>Modificaciones de los Términos</h5>
                Nos reservamos el derecho a modificar estos términos y condiciones en cualquier momento. Te notificaremos sobre cualquier cambio importante.
                <hr />

                <h5 className='text-primary'>Limitación de Responsabilidad</h5>
                No nos hacemos responsables por cualquier daño que pueda resultar del uso de nuestro sitio web.
                <hr />

                <h5 className='text-primary'>Propiedad Intelectual</h5>
                Todos los contenidos de este sitio, incluyendo textos, gráficos, logos y software, son propiedad de NAHISA SRL.
                <hr />

                <h5 className='text-primary'>Juridiscción y Ley Aplicable</h5>
                Estos términos y condiciones se rigen por las leyes de [Jurisdicción].
                <hr />

                <h5 className='text-primary'>Contacto</h5>
                Si tienes alguna pregunta o inquietud sobre estos términos y condiciones, por favor contáctanos en alfajoresdeltucuman@hotmail.com.ar.</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal></p>
          <p className='legal'>Alfajores Del Tucumán®. All rights reserved. Tucumán. Argentina</p>
        </div>
      </Row>
    </Container>
  )

}


export default FooterV1