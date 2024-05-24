import React, { useEffect, useState } from 'react';
import { useCartAuth } from '../../context/CartContext';
import { Container, Row, Button, Col, Form } from 'react-bootstrap';
import axios from '../../api/axios'; 
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const KEY_MP = import.meta.env.VITE_KEY_MP;

const CarritoCheckV1 = () => {
  const { cartItems, totalPrice, savedAddresses, selectedAddress, setSelectedAddress } = useCartAuth();
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    initMercadoPago(KEY_MP, { locale: 'es-AR' });
  }, []);
  
  const handleAddressChange = (e) => {
    const addressId = e.target.value;
    const address = savedAddresses.find((addr) => addr._id === addressId);
    setSelectedAddress(address);
  };

  const handleBuy = async () => {
    try {
      if (cartItems.length > 0) {
        const body = {
          items: cartItems.map(item => ({
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
            currency_id: 'ARS',
          })),
          back_urls: {
            success: 'http://localhost:5173',
            failure: 'http://localhost:5173',
            pending: 'http://localhost:5173',
          },
          auto_return: 'approved',
        };
        
        const response = await axios.post('/mercadopago/create_preference', body); 
        const { id } = response.data;
        setPreferenceId(id);
      } else {
        console.error('No hay productos en el carrito');
      }
    } catch (error) {
      console.error('Error al crear preferencia:', error);
    }
  };

  return (
    <Container className='vh-100'>
      <Row>
        <h3 className='mt-3'>Confirmar Pedido</h3>
        <Col className='d-flex justify-content-center p-0'>
          <Col xs={8} className='p-5 bg-white'>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="mb-3 d-flex align-items-center">
                  <div className='divImg me-3'>
                    <img src={item.productId.imagenUrl} alt={item.name} className="imgProducto img-fluid" />
                  </div>
                  <div className='col-6'>
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
            <Button className="btn bg-warning text-dark border-0 mt-3" disabled={!selectedAddress} onClick={handleBuy}>
              Comprar
            </Button>
            {preferenceId && (
              <div className="mt-3">
                <Wallet initialization={{ preferenceId }} />
              </div>
            )}
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default CarritoCheckV1;
