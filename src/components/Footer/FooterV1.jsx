import React from 'react'
import '/src/components/Footer/footer.css'
import { Container, Row } from 'react-bootstrap'

const FooterV1 = () => {
  return (
    <Container fluid>
      <Row>
        <div className='ft1 display-flex'>
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
                <li><a href="/locales">Locales</a></li>
                <li> <a href="/about">Sobre Nosotros</a></li>
                <li><a href="/alfatuc"><img src="/src/assets/LOGO ALFATUC.png" alt="Alfatuc" className='alfatuc' /></a></li>
              </ul>
            </div>
            <div>
              <h3 className='title3 text-center'>Contacto</h3>
              <ul className='text-center list-unstyled'>
                <li>Depto de Marketing y Ventas Tel:+54 9 381 254 2853</li>
                <li>Email: info@alfajoresdeltucuman.com</li>
              </ul>
            </div>
            <div>
              <h2 className='title3'>Redes Sociales</h2>
              <ul className='text-center list-unstyled'>
                <li> <img src="/src/assets/Facebook.png" alt="facebook" className='facebook p-1 m-1' /> <a target="_blank" href="https://www.facebook.com/alfajores.deltucuman">Facebook</a> </li>
                <li> <img src="/src/assets/instagram.png" alt="Instagram" className='facebook p-1 m-1' /> <a target="_blank" href="https://www.instagram.com/alfajoresdeltucuman/">Instagram</a></li>

              </ul>
            </div>
            <div>
              <img src="/src/assets/Tucuman-TieneMuchoParaVos.png" alt="tucumantieneMucho" className='tucumantieneMucho' />
            </div>
          </div>
        </div>
        <div className='ft2 ft1'>
          <a href='https://marcatucuman.com.ar/'><img src="/src/assets/TucumanTurismo.png" alt="TucumanTurismo" className='tucumanTurismo align-end' /></a>
        </div>
        <div className='ft1'>
          <p className='legal'>2024 Alfajores Del Tucumán®. All rights reserved. Tucumán. Argentina</p>
        </div>
      </Row>
    </Container>
  )

}


export default FooterV1