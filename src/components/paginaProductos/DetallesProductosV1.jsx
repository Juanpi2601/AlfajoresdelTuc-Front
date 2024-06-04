import React, { useState } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useCartAuth } from "../../context/CartContext";
import { alertAdd } from "../../utils/alertCustom";

const DetallesProductosV1 = ({ producto }) => {
    const { addToCart } = useCartAuth();
    // const [cantidad, setCantidad] = useState(1);

    const handleAddToCart = (product) => {
        // if (cantidad <= 0) {
        //     alert("Sin stock");
        //     return;
        // }
        addToCart(product, 1); 
        alertAdd("top-end", "success", "Su pedido fue agregado al carrito");
        // setCantidad(cantidad - 1);
        // if (cantidad === 1) {
        //     setCantidad("No hay stock");
        // }
    };

    return (
        <Container>
            <Row className="my-5 ">
                <Col className='d-flex justify-content-center p-0 '>
                    <Col className=' p-5 bg-white '>
                        <div className='divImg'>
                            <img src={producto.imagenUrl} alt={producto.nombre} className="imgProducto img-fluid" />
                        </div>

                    </Col>
                    <Col className='p-5 bg-white border-left'>
                        <div className='divDatos'>
                            <h1 className='txtNombre my-4'>{producto.nombre}</h1>
                            <h2 className='txtPrecio my-4'>${producto.precio}</h2>
                            <span className='my-4'>{producto.cantidad <= 0 ? '✖ Sin stock' : `✔ Hay stock`}</span>
                        </div>
                        <div className="align-items-center justify-content-between">
                            
                            <div className='divCarrito d-flex my-4'>
                                <Button className='añadirAlCarrito' onClick={() => handleAddToCart(producto)} variant='none'>
                                    Añadir al carrito
                                </Button>
                                {/* <Button className='mx-3' variant='warning'>
                                    Comprar ahora
                                </Button> */}
                            </div>
                        </div>
                        <hr className='my-4' />
                        <div className='divDescripcion d-flex justify-content-center' variant='none'>
                            <h1 className='txtDescripcion'>Descripcion</h1>
                        </div>
                        <div className=''>
                            <p className='my-3 text-justify'>{producto.descripcion} </p>
                        </div>
                    </Col>

                </Col>
                <hr />

            </Row>
        </Container>
    );
}
export default DetallesProductosV1;