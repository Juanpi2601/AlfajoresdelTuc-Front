import React, { useState } from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useProductAuth } from "../../context/ProductContext";
import { alertAdd } from "../../utils/alertCustom";

const DetallesProductosV1 = ({ producto }) => {
    const { addToCart } = useProductAuth();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart({ ...producto, quantity });
        alertAdd("top-end", "success", "Su pedido fue agregado al carrito");
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <Container fluid className=''>
            <Row className="my-5 ">
                <Col className='d-flex justify-content-center p-0 '>
                    <Col className=' p-5 bg-white '>
                        <div className='divImg'>
                            <img src={producto.imagenUrl} alt={producto.nombre} className="imgProducto img-fluid" />
                        </div>

                    </Col>
                    <Col className='p-5 bg-white border-left'>
                        <div className='divDatos'>
                            <h1 className='txtNombre mx-2'>{producto.nombre}</h1>
                            <h2 className='txtPrecio mx-2'>${producto.precio}</h2>
                            <span className='mx-2'>Cantidad: {producto.cantidad} </span>
                        </div>
                        <div className="align-items-center justify-content-between">
                            <div className='divCantidad p-3'>
                                <Button className='btnDisminuir' variant="none" onClick={handleDecreaseQuantity}>-</Button>
                                <span className="mx-2">{quantity}</span>
                                <Button className='btnIncrementar' variant="none" onClick={handleIncreaseQuantity}>+</Button>
                            </div>
                            <div className='divCarrito d-flex '>
                                <Button className='añadirAlCarrito' onClick={handleAddToCart} variant='none'>
                                    Añadir al carrito
                                </Button>
                                <Button className='btnComprar mx-3' variant='none'>
                                    Comprar ahora
                                </Button>
                            </div>
                        </div>
                        <hr className='my-4' />
                        <div className='divDescripcion d-flex justify-content-center' variant='none'>
                            <h1 className='txtDescripcion'>Descripcion</h1>
                        </div>
                        <div className='d-flex '>
                            <p>{producto.descripcion} </p>
                        </div>
                    </Col>

                </Col>
                <hr />

            </Row>
        </Container>
    );
}

export default DetallesProductosV1;
