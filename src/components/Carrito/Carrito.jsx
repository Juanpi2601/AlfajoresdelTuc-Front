import React, { useState, useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useProductAuth } from "../../context/ProductContext";
import { alertAdd } from "../../utils/alertCustom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavbarCart = () => {
    const { cart, removeFromCart, incrementQuantity, decrementQuantity, clearCart } = useProductAuth();
    const [show, setShow] = useState(false);
    const [tableNumber, setTableNumber] = useState("");
    const [triggerRerender, setTriggerRerender] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const total = cart.reduce(
        (acc, currentItem) => acc + currentItem.precio * currentItem.quantity,
        0
    );

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === "tableNumber") {
                setTriggerRerender((prev) => !prev);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const handleConfirmOrder = () => {
        localStorage.setItem("cart", JSON.stringify(cart));
        alertAdd("center", "success", "Pedido confirmado");
        const orderDetails = {
            tableNumber,
            cart,
            total: total.toFixed(2), 
        };

        localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
        clearCart();
        alertAdd(
            "center",
            "success",
            `Pedido confirmado`
        );
    };

    useEffect(() => {
        const savedTableNumber = localStorage.getItem("tableNumber");
        if (savedTableNumber) {
            setTableNumber(savedTableNumber);
        }
    }, [triggerRerender]);

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
                    {cart.length > 0 ? (
                        <>
                            {cart.map((item) => (
                                <div key={item._id} className="mb-3">
                                    <h5>{item.nombre}</h5>
                                    <p>Precio: ${item.precio}</p>
                                    <p>Cantidad: {item.quantity}</p>
                                    <p className="fw-bold">Subtotal: ${(item.precio * item.quantity).toFixed(2)}</p>
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
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            ))}
                            <div className="cart-total mb-4">
                                <h5>Total del Pedido: ${total.toFixed(2)}</h5>
                            </div>
                            <Button variant="success" onClick={handleConfirmOrder}>
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
