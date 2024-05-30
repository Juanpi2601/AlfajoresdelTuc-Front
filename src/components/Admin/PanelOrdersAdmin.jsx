import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useOrderAuth } from '../../context/OrderContext';
import PaginationRounded from "../pagination/Pagination";
import { alertCustom } from '../../utils/alertCustom';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminPanel = () => {
  const { orders, updateOrderStatus, fetchOrders, deleteOrder } = useOrderAuth(); // Agregar deleteOrder
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleUpdateOrderStatus = async (newStatus, order) => {
    try {
      const updatedOrder = { ...order, status: newStatus };
      await updateOrderStatus(order._id, newStatus, updatedOrder, trackingNumber);
      setTrackingNumber('');
      alertCustom('Éxito', 'Estado actualizado exitosamente.', 'success');
      fetchOrders();
    } catch (error) {
      alertCustom('Error', 'Ha ocurrido un error al actualizar la orden', 'error');
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      alertCustom('Éxito', 'La orden ha sido cancelada correctamente.', 'success');
      fetchOrders();
    } catch (error) {
      alertCustom('Error', 'Ha ocurrido un error al cancelar la orden', 'error');
    }
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
              <OrderRow key={order._id} order={order} updateOrderStatus={handleUpdateOrderStatus} trackingNumber={trackingNumber} setTrackingNumber={setTrackingNumber} onCancelOrder={handleCancelOrder} />
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

const OrderRow = ({ order, updateOrderStatus, trackingNumber, setTrackingNumber, onCancelOrder }) => {
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
        <input
          type="text"
          value={trackingNumber}
          onChange={(e) => setTrackingNumber(e.target.value)} 
          placeholder="Código de Seguimiento"
        />
        {order.status === 'pendiente' && (
          <>
            <Button className='mx-1' variant="primary" onClick={() => updateOrderStatus('enviado', order)}>
              Enviar
            </Button>
            <Button className='mx-1' variant="danger" onClick={() => onCancelOrder(order._id)}>
              <DeleteIcon fontSize="small" />
            </Button>
          </>
        )}
        {order.status === 'enviado' && (
          <Button className='mx-2' variant="success" onClick={() => updateOrderStatus('completado', order)}>
            Completar
          </Button>
        )}
      </td>
    </tr>
  );
};

export default AdminPanel;
