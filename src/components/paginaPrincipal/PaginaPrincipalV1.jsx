import React from 'react'
import '../paginaPrincipal/paginaPrincipal.css'
import { Container, Row, Carousel, Card, CardText } from 'react-bootstrap'


const PaginaPrincipalV1 = () => {
    return (
        <>
            <Container>
                <Row>
                    <section className='section1 mt-5'>
                        <Carousel>
                            <Carousel.Item interval={10000000}>
                                <video controls className='video1'>
                                    <source src='/src/assets/alfajor1.mp4' type='video/mp4' />
                                </video>
                            </Carousel.Item>
                            <Carousel.Item interval={500}>
                                <video autoPlay className='video1' >
                                    <source src='/src/assets/Colacion.mp4' type='video/mp4' />

                                </video>

                            </Carousel.Item>
                            <Carousel.Item>
                                <video autoPlay className='video1'>
                                    <source src='/src/assets/Conitos.mp4' type='video/mp4' />
                                </video>
                            </Carousel.Item>
                        </Carousel>

                    </section>
                    <section className='cardContainer'>
                        <section className='mt-5'>
                            <Card style={{ width: '18rem' }} className='card1'>
                                <Card.Img variant="top" src="/src/assets/Nuestro e-Comercve.png" className='img1' />
                                <CardText className='cardText'>
                                    <h4 className='text1'>E-comerce</h4>
                                    <p className='text-white'>Conoce nuestra nueva tienda de Productos</p>
                                </CardText>
                            </Card>
                        </section>
                        <section className='mt-5'>
                            <Card style={{ width: '18rem' }} className='card1'>
                                <Card.Img variant="top" src="/src/assets/Nuestro e-Comercve.png" className='img1' />
                                <CardText className='cardText'>
                                    <h4 className='text1'>E-comerce</h4>
                                    <p className='text-white'>Conoce nuestra nueva tienda de Productos</p>
                                </CardText>
                            </Card>
                        </section>
                        <section className='mt-5'>
                            <Card style={{ width: '18rem' }} className='card1'>
                                <Card.Img variant="top" src="/src/assets/Nuestro e-Comercve.png" className='img1' />
                                <CardText className='cardText'>
                                    <h4 className='text1'>E-comerce</h4>
                                    <p className='text-white'>Conoce nuestra nueva tienda de Productos</p>
                                </CardText>
                            </Card>
                        </section>
                        <section className='mt-5'>
                            <Card style={{ width: '18rem' }} className='card1'>
                                <Card.Img variant="top" src="/src/assets/Nuestro e-Comercve.png" className='img1' />
                                <CardText className='cardText'>
                                    <h4 className='text1'>E-comerce</h4>
                                    <p className='text-white'>Conoce nuestra nueva tienda de Productos</p>
                                </CardText>
                            </Card>
                        </section>
                    </section>
                </Row>
            </Container>


            <h1 className='mt-5'>FOOTER</h1>




        </>
    )
}

export default PaginaPrincipalV1