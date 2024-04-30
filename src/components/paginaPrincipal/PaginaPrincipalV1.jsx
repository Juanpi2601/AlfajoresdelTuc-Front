import React, { useRef } from 'react';
import '../paginaPrincipal/paginaPrincipal.css'
import { Container, Row, Carousel, Card, CardText } from 'react-bootstrap'

const PaginaPrincipalV1 = () => {

    const videosRefs = [useRef(null), useRef(null), useRef(null)];

    const handleVideoEnd = (index) => {
        if (videosRefs[index].current) {
            videosRefs[index].current.play();
        }
    };
    
        return (
            <>
                <Container>
                    <Row>
                        <section className='section1 mt-5 p-0'>
                            <Carousel>
                                <Carousel.Item interval={10500}>
                                    <video ref={videosRefs[0]} autoPlay muted className='video1 w-100 ' onEnded={() => handleVideoEnd(0)}>
                                        <source src='/src/assets/alfajor1.mp4' type='video/mp4' />
                                    </video>
                                </Carousel.Item>
                                <Carousel.Item interval={6000}>
                                    <video ref={videosRefs[1]} autoPlay muted className='video1 w-100' onEnded={() => handleVideoEnd(1)} >
                                        <source src='/src/assets/Colacion.mp4' type='video/mp4' />
                                    </video>

                                </Carousel.Item>
                                <Carousel.Item interval={11000}>
                                    <video ref={videosRefs[2]} autoPlay muted className='video1 w-100' onEnded={() => handleVideoEnd(2)}>
                                        <source src='/src/assets/Conitos.mp4' type='video/mp4' />
                                    </video>
                                </Carousel.Item>
                            </Carousel>

                        </section>
                        <section className='cardContainer cards2'>
                            <section className='mt-5'>
                                <Card style={{ width: '18rem' }} className='card1 cards3'>
                                    <Card.Img variant="top" src="/src/assets/Nuestro e-Comercve.png" className='img1' />
                                    <div className='cardText'>
                                        <h4 className='text1'>E-comerce</h4>
                                        <p className='text-white'>Conoce nuestra nueva tienda de Productos</p>
                                    </div>
                                </Card>
                            </section>
                            <section className='mt-5'>
                                <Card style={{ width: '18rem' }} className='card1 cards3'>
                                    <Card.Img variant="top" src="/src/assets/Nuestro e-Comercve.png" className='img1' />
                                    <div className='cardText'>
                                        <h4 className='text1'>E-comerce</h4>
                                        <p className='text-white'>Conoce nuestra nueva tienda de Productos</p>
                                    </div>
                                </Card>
                            </section>
                            <section className='mt-5'>
                                <Card style={{ width: '18rem' }} className='card1 cards3'>
                                    <Card.Img variant="top" src="/src/assets/Nuestro e-Comercve.png" className='img1' />
                                    <div className='cardText'>
                                        <h4 className='text1'>E-comerce</h4>
                                        <p className='text-white'>Conoce nuestra nueva tienda de Productos</p>
                                    </div>
                                </Card>
                            </section>
                            <section className='mt-5'>
                                <Card style={{ width: '18rem' }} className='card1 cards3'>
                                    <Card.Img variant="top" src="/src/assets/Nuestro e-Comercve.png" className='img1' />
                                    <div className='cardText'>
                                        <h4 className='text1'>E-comerce</h4>
                                        <p className='text-white'>Conoce nuestra nueva tienda de Productos</p>
                                    </div>


                                </Card>
                            </section>
                            <section className='mt-5'>
                                <Card style={{ width: '18rem' }} className='card1 cards3'>
                                    <Card.Img variant="top" src="/src/assets/Nuestro e-Comercve.png" className='img1' />
                                    <div className='cardText'>
                                        <h4 className='text1'>E-comerce</h4>
                                        <p className='text-white'>Conoce nuestra nueva tienda de Productos</p>
                                    </div>
                                </Card>
                            </section>
                            <section className='mt-5'>
                                <Card style={{ width: '18rem' }} className='card1 cards3'>
                                    <Card.Img variant="top" src="/src/assets/Nuestro e-Comercve.png" className='img1' />
                                    <div className='cardText'>
                                        <h4 className='text1'>E-comerce</h4>
                                        <p className='text-white'>Conoce nuestra nueva tienda de Productos</p>
                                    </div>
                                </Card>
                            </section>
                            <section className='mt-5'>
                                <Card style={{ width: '18rem' }} className='card1 cards3'>
                                    <Card.Img variant="top" src="/src/assets/Nuestro e-Comercve.png" className='img1' />
                                    <div className='cardText'>
                                        <h4 className='text1'>E-comerce</h4>
                                        <p className='text-white'>Conoce nuestra nueva tienda de Productos</p>
                                    </div>
                                </Card>
                            </section>
                            <section className='mt-5'>
                                <Card style={{ width: '18rem' }} className='card1 cards3'>
                                    <Card.Img variant="top" src="/src/assets/Nuestro e-Comercve.png" className='img1' />
                                    <div className='cardText'>
                                        <h4 className='text1'>E-comerce</h4>
                                        <p className='text-white'>Conoce nuestra nueva tienda de Productos</p>
                                    </div>
                                </Card>
                            </section>
                        </section>
                    </Row>
                </Container>


                <h1 className='mt-5'>FOOTER</h1>




            </>
        )
    }

    export default PaginaPrincipalV1;