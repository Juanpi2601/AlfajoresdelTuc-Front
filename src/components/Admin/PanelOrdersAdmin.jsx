import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useOrderAuth } from '../../context/OrderContext';
import PaginationRounded from "../pagination/Pagination";

const AdminPanel = () => {
  const { orders, updateOrderStatus } = useOrderAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [changeFlag, setChangeFlag] = useState(false);

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <h1>Panel de Administrador</h1>
      <h2>Órdenes:</h2>
      {currentOrders.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Productos</th>
              <th>Dirección de Envío</th>
              <th>Precio Total</th>
              <th>Estado</th>
              <th>Fecha de Pedido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map(order => (
              <OrderRow key={order._id} order={order} updateOrderStatus={handleUpdateOrderStatus} />
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Sin órdenes actualmente</p>
      )}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <PaginationRounded count={totalPages} onChange={handleChangePage} />
      </div>
    </div>
  );
};

const OrderRow = ({ order, updateOrderStatus }) => {
  const handleUpdateOrderStatus = (newStatus) => {
    updateOrderStatus(order._id, newStatus);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <tr>
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
      <td>{order.status}</td>
      <td>{formatDate(order.createdAt)}</td>
      <td>
        {order.status === 'pendiente' && (
          <Button variant="primary" onClick={() => handleUpdateOrderStatus('enviado')}>
            Enviar
          </Button>
        )}
        {order.status === 'enviado' && (
          <Button variant="success" onClick={() => handleUpdateOrderStatus('completado')}>
            Completar
          </Button>
        )}
      </td>
    </tr>
  );
};

export default AdminPanel;
