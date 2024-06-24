import React, { useRef } from 'react';
import '../paginaPrincipal/paginaPrincipal.css'
import { Container, Row, Carousel, Card, CardText } from 'react-bootstrap'
import { Link } from 'react-router-dom';

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
                            <Carousel.Item interval={1050}>
                                <video ref={videosRefs[0]} autoPlay muted className='video1 w-100 ' onEnded={() => handleVideoEnd(0)}>
                                    <source src='https://drive.google.com/file/d/1DJrap7NhTbblTBFg8LbUv13oII90PZFQ/view?usp=drive_link' type='video/mp4' />
                                </video>
                            </Carousel.Item>
                            <Carousel.Item interval={600}>
                                <video ref={videosRefs[1]} autoPlay muted className='video1 w-100' onEnded={() => handleVideoEnd(1)} >
                                    <source src='https://drive.google.com/file/d/1oEgtF_rrEus_sKvRWtbzhSgHzRCf2ivS/view?usp=drive_link' type='video/mp4' />
                                </video>

                            </Carousel.Item>
                            <Carousel.Item interval={1100}>
                                <video ref={videosRefs[2]} autoPlay muted className='video1 w-100' onEnded={() => handleVideoEnd(2)}>
                                    <source src='https://drive.google.com/file/d/10HVLckSaHZ15ufu55i9kFDEfhzfR_tQl/view?usp=drive_link' type='video/mp4' />
                                </video>
                            </Carousel.Item>
                        </Carousel>

                    </section>
                    <section className='cardContainer cards2'>
                        <section className='mt-5'>
                            <a href="/products">
                                <Card style={{ width: '18rem' }} className='card1 cards3'>
                                    <Card.Img variant="top" src="https://i.postimg.cc/6qfbqhLN/E-comerce.png" className='img1' />
                                    <div className='cardText'>
                                        <h4 className='text1'><img src="https://i.postimg.cc/zGX6L4c2/Nuestro-E-Comerce.png" alt="E-Comerce" className='img3' /></h4>
                                    </div>
                                </Card>
                            </a>
                        </section>
                        <section className='mt-5'>
                            <a href="/locales">
                            <Card style={{ width: '18rem' }} className='card1 cards3'>
                                <Card.Img variant="top" src="https://i.postimg.cc/WbsfKQTp/Sucursales.png" className='img1' />
                                <div className='cardText'>
                                    <h4 className='text1'><img src="https://i.postimg.cc/HkZKbBGY/Sucursales2.png" alt="Sucursales solo" className='img2' /></h4>
                                </div>
                            </Card>
                            </a>
                        </section>
                        <section className='mt-5'>
                            <a href="/novedad">
                            <Card style={{ width: '18rem' }} className='card1 cards3'>
                                <Card.Img variant="top" src="https://i.postimg.cc/NftWtK7c/Novedades.png" className='img1' />
                                <div className='cardText'>
                                    <h4 className='text1'><img src="https://i.postimg.cc/wTknj90s/Novedades2.png" alt="Sucursales solo" className='img6' /></h4>
                                </div>
                            </Card>
                            </a>
                        </section>
                        <section className='mt-5'>
                            <a href="/alfatuc">
                            <Card style={{ width: '18rem' }} className='card1 cards3'>
                                <Card.Img variant="top" src="https://i.postimg.cc/brc4sJ71/conoce-Alfatuc.png" className='img1' />
                            </Card>
                            </a>
                        </section>
                    </section>


                </Row>
            </Container>
        </>
    )
}

export default PaginaPrincipalV1;