import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useOrderAuth } from '../../context/OrderContext'; 
import { useAuth } from '../../context/UserContext'; 
import PaginationRounded from "../pagination/Pagination"; 

const OrderUserV1 = () => {
  const { orders } = useOrderAuth();
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); 

  const userOrders = orders.filter(order => order.userId === user._id);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-AR', options);
  };

  const totalPages = Math.ceil(userOrders.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = userOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <h1 className='text-center'>Mis pedidos</h1>
      {currentOrders.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Productos</th>
                <th>Dirección de Envío</th>
                <th>Precio Total</th>
                <th>Estado</th> 
                <th>Fecha de Pedido</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map(order => (
                <tr key={order._id}>
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
                </tr>
              ))}
            </tbody>
          </Table>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PaginationRounded count={totalPages} onChange={handleChangePage} />
          </div>
        </>
      ) : (
        <p>No tienes órdenes actualmente</p>
      )}
    </div>
  );
};

export default OrderUserV1;
