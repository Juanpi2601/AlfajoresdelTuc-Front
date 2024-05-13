// CardProductos.js
import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useProductAuth } from "../../context/ProductContext";
import { useCartAuth } from "../../context/CartContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { alertAdd } from "../../utils/alertCustom";

const CardProductos = ({ formData }) => {
    const { addToCart } = useCartAuth(); 
    const { productos } = useProductAuth(); 

    const handleAddToCart = (product) => {
        addToCart(product, 1, product.nombre); 
        alertAdd("top-end", "success", "Su pedido fue agregado al carrito");
    };

    return (
        <Container>
            <Row className="d-flex">    
                {formData && formData.map((producto) => (
                    producto && (
                        <Col key={producto._id} xs={12} sm={12} md={6} lg={4} xl={4} >
                            <Card className="cardProduct m-3 border-0">
                                {producto.imagenUrl && (
                                    <Card.Img className="imgCard" variant="top" src={producto.imagenUrl} alt="" />
                                )}
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <Card.Title className="nameProduct text-center">{producto.nombre}</Card.Title>
                                    <div className="d-flex flex-column">
                                        <Card.Title className="priceProduct text-center">$ {producto.precio}</Card.Title>
                                        <div className="product-buttons d-flex ">
                                            <Button
                                                className="btnAddCart mx-2 text-center p-2"
                                                data-text="Agregar al Carrito" variant = "none"
                                                onClick={() => handleAddToCart(producto)}>
                                                <ShoppingCartIcon />
                                            </Button>
                                            <Link to={`/products/detalles/${producto._id}`} 
                                            className="btnVisibility p-2 text-center " 
                                            data-text="Ver más" variant = "none">
                                                <VisibilityIcon />
                                            </Link>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                ))}
            </Row>
        </Container>
    );
};

export default CardProductos;
