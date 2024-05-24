import React from 'react';
import { Row, Col } from "react-bootstrap";

const SectionNovedadV1 = ({ novedades }) => {
    return (
        <Row className="justify-content-center">
            {novedades && novedades.map((novedad) => (
                novedad && (
                    <Col key={novedad._id} className="text-center" xs={12}>
                        <div style={{ filter: 'drop-shadow(10px 10px 2px rgba(0,0,0,0.191))' }}>
                            <section className="productSection m-3 border-0">
                                {novedad.imgUrl && (
                                    <img className="imgProduct" src={novedad.imgUrl} alt={novedad.nombre} style={{ maxWidth: '100%', height: 'auto', paddingTop: '0' }} />
                                )}
                            </section>
                        </div>
                    </Col>
                )
            ))}
        </Row>
    )
}

export default SectionNovedadV1;



