import React, { useState, useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useCartAuth } from "../../context/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import './CarritoStyles.css';

const NavbarCart = ({ id }) => {
  const { removeFromCart, incrementQuantity, decrementQuantity, totalPrice, cartItems } = useCartAuth();
  const [show, setShow] = useState(false);
  const [animateItems, setAnimateItems] = useState(false);
  const totalItems = cartItems ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;
  const navigate = useNavigate();

  useEffect(() => {
    if (show && cartItems.length > 0) {
      setAnimateItems(false);
      setTimeout(() => setAnimateItems(true), 100);
    }
  }, [show, cartItems]);

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
        <ShoppingCartIcon fontSize="large" style={{ color: 'black' }} />
        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
      </div>
      <Offcanvas show={show} onHide={handleClose} placement="end" className={show ? 'offcanvas-anim' : ''}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrito de compra</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {!!cartItems?.length ? (
            <>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className={`mb-3 cart-item ${animateItems ? 'enter-active' : ''}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <h5>{item.name}</h5>
                  <p>Precio: ${item.price}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p className="fw-bold">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  <Button
                    className="btnQuantity"
                    variant="warning"
                    onClick={() => decrementQuantity(item.productId._id)}
                  >
                    -
                  </Button>
                  <Button
                    className="mx-2 btnQuantity"
                    variant="warning"
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
