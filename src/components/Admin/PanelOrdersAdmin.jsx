import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { Table } from 'react-bootstrap';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/order/getAll');
        setOrders(response.data);
      } catch (error) {
        console.error('Error al obtener todas las órdenes:', error);
      }
    };

    fetchOrders();
  }, []);

  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(`/user/${userId}`);
      return response.data.name; 
    } catch (error) {
      console.error('Error al obtener el nombre del usuario:', error);
      return 'Usuario Desconocido';
    }
  };

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <h2>Órdenes:</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID de la Orden</th>
            <th>Usuario</th>
            <th>Productos</th>
            <th>Dirección de Envío</th>
            <th>Precio Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userName}</td> 
              <td>
                <ul>
                  {order.products.map(product => (
                    <li key={product.productId}>
                      {product.productName} - Cantidad: {product.quantity} - Precio: {product.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.province}, ${order.shippingAddress.postalCode}`}</td>
              <td>{order.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminPanel;
