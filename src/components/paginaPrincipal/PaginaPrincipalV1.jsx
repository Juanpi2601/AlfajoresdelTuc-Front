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
                            <h2 className='text-center mt-4 titulo1'>Primero comenzareos con la historia de la <small className='text-warning'>Casa Historica De Tucumán</small></h2>
                            <div className='text2 mt-4'>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur commodi enim accusamus officiis! Iste beatae recusandae ex veniam distinctio illum deleniti quasi, esse, ducimus enim illo amet ea tempore. Nam? </p>
                            </div>
                            <img src="/src/assets/casaHistoricaRota.jpeg" alt="CasaHistoricaRota.jpeg" className='img5' />
                        </div>
                    </section>
                    <section className='div2 conatiner mt-5'>
                        <div>
                            <h2 className='mt-5 display-3 text-center'>Nuestra <small className='text-danger'>Historia</small></h2>
                            <div className='text2 mt-4'>
                                <p>
                                    ALFAJORES DEL TUCUMÁN se estableció oficialmente el 9 de Junio de 1970 en la vibrante ciudad de San Miguel de Tucumán, como un modesto proyecto dirigido exclusivamente por su fundador, el Fundador.
                                    Después de exhaustivos análisis de mercado, eligieron estratégicamente ubicar su primera tienda justo frente a la majestuosa Casa Histórica de Tucumán, dando así origen a la reconocida marca "Alfajores del Tucumán".
                                    Al emplazar su fábrica en la intersección de Av. Adolfo de La Vega y La Madrid, manteniendo la esencia del método artesanal, gradualmente incorporaron tecnología de vanguardia en sus procesos productivos. Esto no solo permitió mejorar la eficiencia, sino también atrajo la atención de instituciones educativas y grupos turísticos que se maravillan al presenciar la meticulosa elaboración de sus productos.
                                    La calidad inigualable de sus productos ha sido consistentemente reconocida con numerosos premios tanto a nivel nacional como internacional, siendo un testimonio de su compromiso con la excelencia.
                                    Hoy en día, ALFAJORES DEL TUCUMÁN ha expandido su presencia con éxito, contando con cuatro sucursales adicionales en la provincia y extendiendo su alcance a las vecinas provincias de Salta y Santiago del Estero con sus aclamadas marcas "Alfajores Salteños" y "Alfajores Termeños", respectivamente.
                                    La marca sigue siendo una elección popular entre los residentes locales del norte argentino, y su reputación ha trascendido las fronteras de Tucumán para llegar a otros rincones del país. </p>
                            </div>
                            <img src="/src/assets/casaHistoricaRota.jpeg" alt="CasaHistoricaRota.jpeg" className='img5' />
                        </div>
                    </section>
                </Row>
            </Container>




            <h1 className='mt-5'>FOOTER</h1>




        </>
    )
}

export default PaginaPrincipalV1;