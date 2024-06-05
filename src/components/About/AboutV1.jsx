import React from 'react'
import { Container, Row } from 'react-bootstrap'
import '/src/components/About/AboutV1.css'


const AboutV1 = () => {
    return (
        <>
                <section >
                    <div className='filaImagen'>
                        <h2 className='fondoImagen'>Sobre Nosotros</h2>
                    </div>
                    <Container className='bg-light '>
                        <img src="https://i.postimg.cc/PJW9ZHH9/Logo-Casa-Historica-Color2.png" alt="LogoAlfajoresDelTucuman" className='img4' />
                    <div className='p-3'>
                        <div className='sobreNosotros'>
                            <p>
                                <small className='text-warning fs-2'>Alfajores Del Tucumán</small> se fundó en San Miguel de Tucumán el 9 de junio de 1970. Desde entonces, nuestra fábrica, situada en la Av. Adolfo de la Vega esquina Lamadrid, ha sido el corazón donde combinamos métodos artesanales con tecnología avanzada para crear los alfajores más deliciosos y auténticos de la región.
                            </p>
                            <p>
                                Nuestra dedicación a la calidad ha sido reconocida con numerosos premios, lo que refleja nuestro compromiso con la excelencia en cada bocado. A lo largo de los años, hemos crecido y nos hemos expandido, estableciendo cuatro sucursales en la provincia de Tucumán. Además, hemos llevado el sabor inigualable de nuestros alfajores a las provincias vecinas de Salta y Santiago del Estero bajo las marcas <small className='text-danger fs-5'>"Alfajores Salteños"</small> y <small className='text-danger fs-5'>"Alfajores Termeños"</small>.
                            </p>
                            <p>
                                Hoy en día, <small className='text-warning fs-5'>Alfajores Del Tucumán</small> sigue siendo una marca querida y popular no solo en el norte argentino, sino también más allá de nuestras fronteras. Nuestra pasión por los alfajores y nuestro compromiso con la calidad continúan guiando cada paso de nuestro camino, asegurando que cada producto que ofrecemos sea un testimonio de nuestra historia y tradición.
                            </p>
                        </div>
                    </div>
                    <div className='my-1 p-3'>
                        <h2 className='text-center'>Misión</h2>
                        <div className='mision'>
                            <p>
                                En <small className='text-warning fs-5'>Alfajores Del Tucumán</small>, nuestra misión es elaborar alfajores de la más alta calidad, combinando métodos artesanales con tecnología avanzada.
                                Nos esforzamos por mantener viva la tradición y el sabor auténtico que nos ha caracterizado desde <small className='text-danger fs-5'>1970</small>, brindando experiencias dulces y memorables a nuestros clientes.
                            </p>
                        </div>
                    </div>
                    <div className='my-1 p-3'>
                        <h2 className='text-center'>Visión</h2>
                        <div className='vision'>
                            <p>
                                Nuestra visión es ser la marca líder de <small className='text-danger fs-5'>alfajores</small> en el norte argentino y expandir nuestro reconocimiento y presencia a nivel nacional e internacional.
                                Aspiramos a crecer y evolucionar continuamente, manteniendo nuestro compromiso con la excelencia y la innovación, mientras seguimos siendo fieles a nuestras raíces y valores tradicionales.
                            </p>
                        </div>
                    </div>
                    <span>¡Gracias por ser parte de nuestra historia y por permitirnos endulzar sus momentos especiales!</span>
                    </Container>
                </section>
                </>
    )
}

export default AboutV1
