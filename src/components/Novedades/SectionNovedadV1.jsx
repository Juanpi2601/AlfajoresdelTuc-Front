import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from "react-bootstrap";
import axios from '../../api/axios';

const SectionNovedadV1 = () => {
    const [novedadesState, setNovedadesState] = useState([]);

    useEffect(() => {
        const fetchNovedades = async () => {
            try {
                const response = await axios.get('/novedad/getAll');
                setNovedadesState(response.data);
            } catch (error) {
                console.error('Error al obtener las novedades:', error);
            }
        };

        fetchNovedades();
    }, []);

    return (
        <>
            {novedadesState.length > 0 ? (
                <Row className="justify-content-center">
                    {novedadesState
                        .filter(novedad => novedad.visible)
                        .map((novedad) => (
                            <Col key={novedad._id} className="text-center" xs={12}>
                                <div style={{ filter: 'drop-shadow(10px 10px 2px rgba(0,0,0,0.191))' }}>
                                    <section className="productSection m-3 border-0">
                                        {novedad.imgUrl && (
                                            <img className="imgProduct" src={novedad.imgUrl} alt={novedad.nombre} style={{ maxWidth: '100%', height: 'auto', paddingTop: '0' }} />
                                        )}
                                    </section>
                                </div>
                            </Col>
                        ))}
                </Row>
            ) : (
                <Card className="text-center">
                    <Card.Body>
                        <Card.Text>No hay novedades disponibles</Card.Text>
                    </Card.Body>
                </Card>
            )}
        </>
    );
}

export default SectionNovedadV1;
