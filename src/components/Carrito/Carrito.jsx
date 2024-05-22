import React, { useState, useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useProductAuth } from "../../context/ProductContext";
import { useCartAuth } from "../../context/CartContext"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavbarCart = ({ id }) => {
    const { cart, removeFromCart, incrementQuantity, decrementQuantity, totalPrice, cartItems } = useCartAuth();
    const [show, setShow] = useState(false);
     const totalItems = cartItems ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;
     const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleConfirm = () => {
        handleClose();
        navigate('/CarritoCheck');
        location.reload();
    };
    


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
                                            onClick={() => decrementQuantity(item.productId._id)}
                                        >
                                            -
                                        </Button>
                                        <Button
                                            className="mx-2 btnQuantity"
                                            variant="primary"
                                            onClick={() => incrementQuantity(item.productId._id)}
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
                                <h5>Total del Pedido: ${totalPrice.toFixed(2)}</h5>
                            </div>
                            <Button className="btn bg-warning text-dark border-0" onClick={handleConfirm}>
                                Confirmar Pedido
                            </Button>
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
