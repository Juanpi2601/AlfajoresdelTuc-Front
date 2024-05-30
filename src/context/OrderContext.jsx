import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../api/axios";
import { useAuth } from "./UserContext";
import { useCartAuth } from "./CartContext";
import { alertCustom } from '../utils/alertCustom';

export const OrderContext = createContext();

export const useOrderAuth = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrderAuth must be used within an OrderProvider");
    }
    return context;
};

export const OrderProvider = ({ children }) => {
    const { user } = useAuth();
    const { cartItems, totalPrice, selectedAddress } = useCartAuth();
    const [order, setOrder] = useState(null);
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/order/getAll');
            setOrders(response.data);
        } catch (error) {
            alertCustom("Upps", "Ha ocurrido un error.", "error")
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const createOrder = async () => {
        try {
            if (!user || cartItems.length === 0 || !selectedAddress) {
                return;
            }
    
            const body = {
                userId: user._id,
                nombre: user.name,
                products: cartItems.map(item => ({
                    name: item.name,
                    productId: item.productId._id,
                    quantity: item.quantity,
                    price: item.price
                })),
                shippingAddress: selectedAddress,
                totalPrice: totalPrice
            };
    
            const response = await axios.post("/order/create", body);
            alertCustom('Éxito', 'Orden creada exitosamente.', 'success');
            setOrder(response.data.order);
    
        } catch (error) {
            alertCustom("Upps", "Ha ocurrido un error al crear la orden", "error.")
        }
    };

    const updateOrderStatus = async (orderId, status, order, trackingNumber) => {
        try {
            await axios.patch(`/order/status/${orderId}`, { status, order,trackingNumber });
            fetchOrders(); 
        } catch (error) {
            alertCustom('Error', 'Ha ocurrido un error al actualizar la orden', 'error');
        }
    };
    
    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`/order/delete/${orderId}`);
            setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
            setOrder(null); 
        } catch (error) {
            alertCustom('Error', 'Ha ocurrido un error al eliminar la orden.', 'error');
        }
    };

    return (
        <OrderContext.Provider 
        value={{ 
            order, 
            orders, 
            createOrder, 
            deleteOrder, 
            fetchOrders, 
            updateOrderStatus 
        }}>
            {children}
        </OrderContext.Provider>
    );
};
