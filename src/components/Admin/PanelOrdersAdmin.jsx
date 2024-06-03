import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useOrderAuth } from '../../context/OrderContext';
import PaginationRounded from "../pagination/Pagination";
import { alertCustom } from '../../utils/alertCustom';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";

const AdminPanel = () => {
  const { orders, updateOrderStatus, fetchOrders, deleteOrder } = useOrderAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [trackingNumbers, setTrackingNumbers] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateOrderStatus = async (newStatus, order) => {
    try {
      setIsLoading(true);
      const updatedOrder = { ...order, status: newStatus };
      await updateOrderStatus(order._id, newStatus, updatedOrder, trackingNumbers[order._id]);
      setTrackingNumbers(prevState => ({ ...prevState, [order._id]: '' }));
      alertCustom('Éxito', 'Estado actualizado exitosamente.', 'success');
      fetchOrders();
    } catch (error) {
      setIsLoading(false);
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

  const handleTrackingNumberChange = (orderId, value) => {
    setTrackingNumbers(prevState => ({ ...prevState, [orderId]: value }));
  };

  const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="table-responsive">
      <h3 className='text-center'>Administración de Ordenes</h3>
      {currentOrders.length > 0 ? (
        <Table striped bordered hover responsive>
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
              <OrderRow
                key={order._id}
                order={order}
                updateOrderStatus={handleUpdateOrderStatus}
                trackingNumber={trackingNumbers[order._id] || ''}
                setTrackingNumber={(value) => handleTrackingNumberChange(order._id, value)}
                onCancelOrder={handleCancelOrder}
              />
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
