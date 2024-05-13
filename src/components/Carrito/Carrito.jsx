import React, { useState, useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useProductAuth } from "../../context/ProductContext";
import { useCartAuth } from "../../context/CartContext"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import CarritoCheck from "../../pages/CarritoCheck";

const NavbarCart = ({ id }) => {
    const { cart, removeFromCart, incrementQuantity, decrementQuantity, clearCart, cartItems } = useCartAuth();
    const [show, setShow] = useState(false);
    const totalItems = cartItems ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;
    const total = cartItems ? cartItems.reduce((acc, currentItem) => acc + currentItem.price * currentItem.quantity, 0) : 0;    

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log({cart});
    console.log({totalItems});
    console.log({total});
    console.log({cartItems});
    
    

    return (
        <div>
            <div onClick={handleShow}>
                <ShoppingCartIcon fontSize="large" style={{ color: 'black'}} />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </div>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Carrito de compra</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {!!cartItems?.length ? (
                        <>
                            {cartItems.map((item, index) => (
                                    
                                    <div key={index} className="mb-3">
                                        
                                        <h5>{item.name}</h5>
                                        <p>Precio: ${item.price}</p>
                                        <p>Cantidad: {item.quantity}</p>
                                        <p className="fw-bold">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                                        <Button
                                            className="btnQuantity"
                                            variant="primary"
                                            onClick={() => decrementQuantity(item._id)}
                                        >
                                            -
                                        </Button>
                                        <Button
                                            className="mx-2 btnQuantity"
                                            variant="primary"
                                            onClick={() => incrementQuantity(item._id)}
                                        >
                                            +
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => removeFromCart(item.productId._id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                ))}
                            <div className="cart-total mb-4">
                                <h5>Total del Pedido: ${total.toFixed(2)}</h5>
                            </div>
                            <Link to={'/CarritoCheck'} className="btn bg-warning">
                                Confirmar Pedido
                                {/* <CarritoCheck/> */}
                            </Link>
                        </>
                    ) : (
                        <p>Tu carrito está vacío</p>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default NavbarCart;
