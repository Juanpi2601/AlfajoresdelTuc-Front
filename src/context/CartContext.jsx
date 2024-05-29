import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../api/axios";
import { useProductAuth } from "./ProductContext";
import { useAuth } from "./UserContext";

export const CartContext = createContext();

export const useCartAuth = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartAuth must be used within a CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [savedAddresses, setSavedAddresses] = useState([]); 
    const [selectedAddress, setSelectedAddress] = useState(null);
    const { user } = useAuth();
    const { productos } = useProductAuth();

    const getCartItems = async () => {
        try {
            if (user) {
                const response = await axios.get(`/cart/${user._id}`);
                setCartItems(response.data.products);
                calculateTotal(response.data.products);
            }
        } catch (error) {
            console.error("Error al obtener los productos del carrito:", error);
        }
    };
    
    const fetchSavedAddresses = async () => {
        try {
            const response = await axios.get(`/address/getAddresses`);
            setSavedAddresses(response.data);
        } catch (error) {
            console.error("Error al obtener las direcciones guardadas:", error);
        }
    };

    useEffect(() => {
        if (user) {
            getCartItems();
            fetchSavedAddresses();
        }
    }, [user]);

    const calculateTotal = (items) => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const addToCart = async (product, quantity) => {
        try {
            if (!user) {
                console.error("No hay usuario autenticado");
                return;
            }
            await axios.post("/cart/add", {
                userId: user._id,
                product,
                quantity,
            });
            getCartItems();
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`/cart/${user._id}/${productId}`);
            getCartItems();
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error);
        }
    };

    const incrementQuantity = async (productId) => {
        try {
            await axios.post(`/cart/increment`, {
                userId: user._id,
                productId
            });
            getCartItems();
        } catch (error) {
            console.error("Error al incrementar la cantidad del producto en el carrito:", error);
        }
    };

    const decrementQuantity = async (productId) => {
        try {
            await axios.post(`/cart/decrement`, {
                userId: user._id,
                productId
            });
            getCartItems();
        } catch (error) {
            console.error("Error al decrementar la cantidad del producto en el carrito:", error);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                totalPrice,
                addToCart,
                removeFromCart,
                incrementQuantity,
                decrementQuantity,
                savedAddresses,
                selectedAddress,
                setSelectedAddress,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
