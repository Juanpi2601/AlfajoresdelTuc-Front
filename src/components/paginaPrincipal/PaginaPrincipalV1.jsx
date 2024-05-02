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
                                <Card.Img variant="top" src="/src/assets/E-Comerce.png" className='img1' />
                                <div className='cardText'>
                                    <h4 className='text1'><img src="/src/assets/Nuestro-E-comerce.png" alt="E-Comerce" className='img3' /></h4>
                                </div>
                            </Card>
                        </section>
                        <section className='mt-5'>
                            <Card style={{ width: '18rem' }} className='card1 cards3'>
                                <Card.Img variant="top" src="/src/assets/Sucursales.png" className='img1' />
                                <div className='cardText'>
                                    <h4 className='text1'><img src="/src/assets/Sucursales2.png" alt="Sucursales solo" className='img2' /></h4>
                                </div>
                            </Card>
                        </section>
                    </section>
                    <section>

                        <p><img src="/src/assets/Letras-DelTucuman.png" alt="AlfajoresDelTucuman" className='img4' /></p>
                    </section>
                    <section className='div2 conatiner mt-5'>
                        <div>
                            <h2 className='text-center mt-4'>Primero comenzareos con la historia de la Casa Historica De Tucumán</h2>
                            <div className='text2 mt-4'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur commodi enim accusamus officiis! Iste beatae recusandae ex veniam distinctio illum deleniti quasi, esse, ducimus enim illo amet ea tempore. Nam? </p>
                            </div>
                            <img src="/src/assets/casaHistoricaRota.jpeg" alt="CasaHistoricaRota.jpeg" className='img5'/>
                        </div>
                    </section>
                </Row>
            </Container>




            <h1 className='mt-5'>FOOTER</h1>




        </>
    )
}

export default PaginaPrincipalV1;