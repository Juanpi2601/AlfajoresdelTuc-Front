import React, { createContext, useState, useContext } from "react";
import axios from "../api/axios";
import { useAuth } from "./UserContext";
import { useCartAuth } from "./CartContext";

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
    const { cartItems, totalPrice, selectedAddress, setSelectedAddress, getCartItems } = useCartAuth();
    const [order, setOrder] = useState(null);

    const createOrder = async () => {
        try {
            if (!user || cartItems.length === 0 || !selectedAddress) {
                console.error("Faltan datos para crear la orden");
                return;
            }

            const body = {
                userId: user._id,
                nombre: user._name,
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
            setOrder(response.data.order);

        } catch (error) {
            console.error("Error al crear la orden:", error);
        }
    };

    // const removeFromCart = async (productId) => {
    //     try {
    //         await axios.delete(`/cart/${user._id}/${productId}`);
    //         getCartItems();
    //     } catch (error) {
    //         console.error("Error al eliminar el producto del carrito:", error);
    //     }
    // };

    return (
        <OrderContext.Provider value={{ order, createOrder }}>
            {children}
        </OrderContext.Provider>
    );
};
