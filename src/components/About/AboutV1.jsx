import React from 'react'
import { Container, Row } from 'react-bootstrap'

const AboutV1 = () => {
    return (
        <Container>
            <Row>
                <div></div>
                        <h2 className='text-center mt-4 titulo1'>Primero comenzareos con la historia de la <small className='text-warning'>Casa Historica De Tucumán</small></h2>
                <section className='div2 conatiner mt-5'>
                    <div>
                        <div className='text2 mt-4'>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur commodi enim accusamus officiis! Iste beatae recusandae ex veniam distinctio illum deleniti quasi, esse, ducimus enim illo amet ea tempore. Nam? </p>
                        </div>
                        <img src="/src/assets/casaHistoricaRota.jpeg" alt="CasaHistoricaRota.jpeg" className='img5' />
                    </div>
                </section>
                        <h2 className='mt-5 display-3 text-center'>Nuestra <small className='text-danger'>Historia</small></h2>
                <section className='div2 conatiner mt-5'>
                    <div>
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
    )
}

export default AboutV1
