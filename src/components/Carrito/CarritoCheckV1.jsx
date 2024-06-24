import React, { useEffect, useState } from 'react';
import { useCartAuth } from '../../context/CartContext';
import { useOrderAuth } from '../../context/OrderContext'; 
import { Container, Row, Col, Form, Alert, Button } from 'react-bootstrap';
import axios from '../../api/axios'; 
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { alertConfirm, alertCustomWithTimerInterval, alertCustom } from '../../utils/alertCustom';

const KEY_MP = import.meta.env.VITE_KEY_MP;

const CarritoCheckV1 = () => {
  const { cartItems, totalPrice, savedAddresses, selectedAddress, setSelectedAddress } = useCartAuth();
  const { createOrder, deleteOrder, order } = useOrderAuth();
  const [preferenceId, setPreferenceId] = useState(null);
  const [showMercadoPago, setShowMercadoPago] = useState(false);

  useEffect(() => {
    initMercadoPago(KEY_MP, { locale: 'es-AR' });
  }, []);

  const handleAddressChange = (e) => {
    const addressId = e.target.value;
    const address = savedAddresses.find((addr) => addr._id === addressId);
    setSelectedAddress(address);
  };

  const handleConfirmOrder = async () => {
    await createOrder();

    if (cartItems.length > 0 && selectedAddress) {
      try {
        const body = {
          items: cartItems.map(item => ({
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: 'ARS',
          })),
          back_urls: {
            success: 'https://alfajoresdeltucuman.netlify.app',
            failure: 'https://alfajoresdeltucuman.netlify.app',
            pending: 'https://alfajoresdeltucuman.netlify.app',
          },
          auto_return: 'approved',
        };

        const response = await axios.post('/mercadopago/create_preference', body); 
        const { id } = response.data;
        setPreferenceId(id);
        setShowMercadoPago(true);
      } catch (error) {
        alertCustom("Upps", "Ha ocurrido un error al iniciar el pago.", "error")
      }
    }
  };

  const handleCancelOrder = async () => {
    if (order) {
      try {
        alertConfirm(
          '¿Estás seguro?',
          'Estás por eliminar tu orden de manera definitiva. Esta acción no se puede deshacer.',
          'warning',
          'Eliminar Orden',
          async () => {
            try {
              await deleteOrder(order._id);
              setPreferenceId(null);
              setShowMercadoPago(false);
              alertCustomWithTimerInterval('¡Adiós!', 'Tu orden ha sido eliminada correctamente.', 'success', () => {
                window.location.href = '/';
              });
            } catch (error) {
              alertCustom('Error', 'Ha ocurrido un error al cancelar la orden', 'error');
            }
          }
        );
      } catch (error) {
        alertCustom('Error', 'Ha ocurrido un error al cancelar la orden', 'error');
      }
    }
  };

  return (
    <Container className='vh-75'>
      <Row>
      <h3 className='mt-3 text-center bg-white'>Confirmar Pedido</h3>
        <Col className='d-flex justify-content-center p-0'>
          <Col xs={8} className='p-5 bg-white'>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="mb-3 d-flex flex-column flex-md-row align-items-md-center">
                  <div className='divImg me-3 mb-2 order-1 order-md-0'>
                    <img src={item.productId.imagenUrl} alt={item.name} className="imgProducto img-fluid" />
                  </div>
                  <div className='col-6 order-1 order-md-1'>
                    <h5>{item.name}</h5>
                    <p>Precio: ${item.price}</p>
                    <p>Cantidad: {item.quantity}</p>
                    <p className="fw-bold">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Tu carrito está vacío</p>
            )}
            <div className='d-flex justify-content-between'>
              <h5>Total del Pedido: ${totalPrice.toFixed(2)}</h5>
            </div>
            <Form.Group className='mt-3'>
              <Form.Label>Selecciona una dirección de envío:</Form.Label>
              <Form.Control as="select" onChange={handleAddressChange} value={selectedAddress ? selectedAddress._id : ''}>
                <option value="">Selecciona una dirección</option>
                {savedAddresses.map((address) => (
                  <option key={address._id} value={address._id}>
                    {`${address.address}, ${address.city}, ${address.province}, ${address.postalCode}`}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button className="btn bg-warning text-dark border-0 mt-3" disabled={!selectedAddress} onClick={handleConfirmOrder}>
              Confirmar pedido
            </Button>
            {showMercadoPago && preferenceId && (
              <div className="mt-3">
                <Wallet initialization={{ preferenceId }} />
                <Button className="btn btn-danger mt-2" onClick={handleCancelOrder}>
                  Cancelar pedido
                </Button>
              </div>
            )}
          </Col>
        </Col>
      </Row>
      <Alert variant="danger" className='mt-3'>
        Si eres de la provincia de Tucuman, ponte en contacto con nosotros para iniciar una compra rápida.
      </Alert>
    </Container>
  );
};

export default CarritoCheckV1;
