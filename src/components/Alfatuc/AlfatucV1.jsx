import React from 'react'
import '../Alfatuc/alfatuc.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Instagram } from '@mui/icons-material'

const AlfatucV1 = () => {
    return (
        <>
            <Container>
                <div>
                    <img src="https://i.postimg.cc/FFyBT9tn/LOGO-ALFATUC.png" alt="LogoAlfatuc" className='img8' />
                </div>
                <Row className="mt-1 align-items-center">
                    <Col md={6} className='alfajorDescription'>
                        <div className='descripción1'>
                            <p className='text-dark fs-5 text-center'>
                                <small className='fs-3 text-primary alfajorclas'>Alfajor de Dulce de Leche Bañado en Chocolate:</small>
                                Sumérgete en una experiencia irresistible con nuestro alfajor artesanal: suave dulce de leche rodeado de intenso chocolate, un equilibrio perfecto de sabores en cada bocado.
                            </p>
                            <p className='text-dark mt-4 fs-5 text-center'>
                                <small className='fs-3 text-danger alfajorclas'>Alfajor de Dulce de Leche Glaseado:</small>
                                Déjate seducir por la suavidad de nuestro dulce de leche en un alfajor único: un delicado glaseado añade un toque de elegancia a esta delicia artesanal, una experiencia gourmet incomparable.
                            </p>
                            <p className='text-dark mt-5 fs-5 text-center'>Lo puedes encontrar en cada kiosco de la provincia.</p>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className='text-center'>
                            <img src="https://i.postimg.cc/25tsNTTc/Alfatuc-BYN.png" alt="AlfatucBlancoyNegro" className='imgAlfatuc' />
                        </div>
                    </Col>
                    <Col>
                        <div className='divwp'>
                            <p className='text-dark mt-4 fs-5 text-center'>Si prestas algún servicio/cafetería/kiosco y quieres incluir estos deliciosos alfajores en tu lista, te dejamos los números de nuestros revendedores</p>
                            <Col md={2}>
                                <Button variant='success' className='botonwp2'>
                                    <a href="https://api.whatsapp.com/send?phone=5493814666960&text=¡Hola! Me encantaría obtener más información sobre Alfatuc. ¿Podría ayudarme?" target="_blank" rel="noopener noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 48 48" style={{ cursor: 'pointer' }}>
                                            <path fill="#fff" fillRule="evenodd" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path>
                                            <path fill="#fff" fillRule="evenodd" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path>
                                            <path fill="#cfd8dc" fillRule="evenodd" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path>
                                            <path fill="#40c351" fillRule="evenodd" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path>
                                            <path fill="#fff" fillRule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clipRule="evenodd"></path>
                                        </svg>
                                    </a>
                                    <p>San Miguel</p>
                                </Button>
                                </Col>
                                <Col md={2}>
                                <Button variant='success' className='botonwp2'>
                                    <a href="https://api.whatsapp.com/send?phone=5493816008225&text=¡Hola! Me encantaría obtener más información sobre Alfatuc. ¿Podría ayudarme?" target="_blank" rel="noopener noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 48 48" style={{ cursor: 'pointer' }}>
                                            <path fill="#fff" fillRule="evenodd" d="M4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5c5.1,0,9.8,2,13.4,5.6	C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19c0,0,0,0,0,0h0c-3.2,0-6.3-0.8-9.1-2.3L4.9,43.3z"></path>
                                            <path fill="#fff" fillRule="evenodd" d="M4.9,43.8c-0.1,0-0.3-0.1-0.4-0.1c-0.1-0.1-0.2-0.3-0.1-0.5L7,33.5c-1.6-2.9-2.5-6.2-2.5-9.6	C4.5,13.2,13.3,4.5,24,4.5c5.2,0,10.1,2,13.8,5.7c3.7,3.7,5.7,8.6,5.7,13.8c0,10.7-8.7,19.5-19.5,19.5c-3.2,0-6.3-0.8-9.1-2.3	L5,43.8C5,43.8,4.9,43.8,4.9,43.8z"></path>
                                            <path fill="#cfd8dc" fillRule="evenodd" d="M24,5c5.1,0,9.8,2,13.4,5.6C41,14.2,43,18.9,43,24c0,10.5-8.5,19-19,19h0c-3.2,0-6.3-0.8-9.1-2.3	L4.9,43.3l2.7-9.8C5.9,30.6,5,27.3,5,24C5,13.5,13.5,5,24,5 M24,43L24,43L24,43 M24,43L24,43L24,43 M24,4L24,4C13,4,4,13,4,24	c0,3.4,0.8,6.7,2.5,9.6L3.9,43c-0.1,0.3,0,0.7,0.3,1c0.2,0.2,0.4,0.3,0.7,0.3c0.1,0,0.2,0,0.3,0l9.7-2.5c2.8,1.5,6,2.2,9.2,2.2	c11,0,20-9,20-20c0-5.3-2.1-10.4-5.8-14.1C34.4,6.1,29.4,4,24,4L24,4z"></path>
                                            <path fill="#40c351" fillRule="evenodd" d="M35.2,12.8c-3-3-6.9-4.6-11.2-4.6C15.3,8.2,8.2,15.3,8.2,24c0,3,0.8,5.9,2.4,8.4L11,33l-1.6,5.8	l6-1.6l0.6,0.3c2.4,1.4,5.2,2.2,8,2.2h0c8.7,0,15.8-7.1,15.8-15.8C39.8,19.8,38.2,15.8,35.2,12.8z"></path>
                                            <path fill="#fff" fillRule="evenodd" d="M19.3,16c-0.4-0.8-0.7-0.8-1.1-0.8c-0.3,0-0.6,0-0.9,0	s-0.8,0.1-1.3,0.6c-0.4,0.5-1.7,1.6-1.7,4s1.7,4.6,1.9,4.9s3.3,5.3,8.1,7.2c4,1.6,4.8,1.3,5.7,1.2c0.9-0.1,2.8-1.1,3.2-2.3	c0.4-1.1,0.4-2.1,0.3-2.3c-0.1-0.2-0.4-0.3-0.9-0.6s-2.8-1.4-3.2-1.5c-0.4-0.2-0.8-0.2-1.1,0.2c-0.3,0.5-1.2,1.5-1.5,1.9	c-0.3,0.3-0.6,0.4-1,0.1c-0.5-0.2-2-0.7-3.8-2.4c-1.4-1.3-2.4-2.8-2.6-3.3c-0.3-0.5,0-0.7,0.2-1c0.2-0.2,0.5-0.6,0.7-0.8	c0.2-0.3,0.3-0.5,0.5-0.8c0.2-0.3,0.1-0.6,0-0.8C20.6,19.3,19.7,17,19.3,16z" clipRule="evenodd"></path>
                                        </svg>
                                    </a>
                                    <p className='text-center'>Yerba Buena</p>
                                </Button>
                            </Col>
                        </div>
                    </Col>
                </Row>
                <p className='fs-5 mt-5 text-center'> Seguinos en <Instagram></Instagram> <a href="https://www.instagram.com/alfajoresdeltucuman/" className='text-warning'>alfajoresdeltucuman</a></p>
            </Container>
        </>
    )
}

export default AlfatucV1