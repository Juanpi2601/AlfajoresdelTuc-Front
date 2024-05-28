import React from 'react'
import '../Alfatuc/alfatuc.css'
import { Container, Row } from 'react-bootstrap'

const AlfatucV1 = () => {
    return (
        <Container>
            <Row>
                <div>
                    <img src="src/assets/LOGO ALFATUC.png" alt="LogoAlfatuc" className='img8' />
                </div>
                <div className='alfajorDescription mt-5'>
                    <h2 className='text-white text-center'>AlfaTuc</h2>
                    <p className='text-white'><small className='fs-4 text-warning'>Alfajor de Dulce de Leche Bañado en Chocolate:</small>
                        Sumérgete en una experiencia irresistible con nuestro alfajor artesanal: suave dulce de leche rodeado de intenso chocolate, un equilibrio perfecto de sabores en cada bocado.</p>
                    <p className='text-white'><small className='fs-4 text-warning'>Alfajor de Dulce de Leche Glaseado:</small>
                        Déjate seducir por la suavidad de nuestro dulce de leche en un alfajor único: un delicado glaseado añade un toque de elegancia a esta delicia artesanal, una experiencia gourmet incomparable.</p>
                </div>
            </Row>
        </Container>
    )
}

export default AlfatucV1