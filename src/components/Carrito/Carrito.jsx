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
  const navigate = useNavigate();

  const totalItems = cartItems ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

  useEffect(() => {
    if (show && cartItems.length > 0) {
      setAnimateItems(false);
      setTimeout(() => setAnimateItems(true), 100);
    }
  }, [show, cartItems]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirm = async () => {
    handleClose();
    const cartProducts = cartItems.map(item => ({ productId: item.productId._id, quantity: item.quantity }));
    navigate('/CarritoCheck', { replace: true });
    location.reload();
    try {
      const response = await axios.post('/confirmarPedido', { cartProducts });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error al confirmar el pedido:', error);
    }
  };

  const filteredCartItems = cartItems.filter(item => item.quantity > 0);

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
          {!!filteredCartItems?.length ? (
            <>
              {filteredCartItems.map((item, index) => (
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
                    disabled={item.quantity >= item.productId.cantidad}
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

