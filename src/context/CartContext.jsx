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

export const CartProvider = ({ children } ) => {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();
    const { productos } = useProductAuth();

    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
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
        getCartItems();
    }, [user]);
    

    const calculateTotal = (cartItems) => {
        
        const { totalPrice, totalItems, cart } = cartItems?.reduce((accumulator, item) => {
          const product = productos.find((product) => product._id === item.productId._id);
            
          accumulator.quantity += item.quantity
          accumulator.price += product ? product.precio * item.quantity : 0;
            
          if (product) accumulator.cart.push(product)
      
          return accumulator
        }, {
          totalPrice: 0,
          totalItems: 0,
          cart: []
        });
      console.log({cart, cartItems});
        setTotalItems(totalItems);
        setTotalPrice(totalPrice);
        setCart(cart);
    };

    const addToCart = async (product, quantity) => {
        try {
            if (!user) {

                console.error("No hay usuario autenticado");
                return;
            }
            console.log(product);
            await axios.post("/cart/add", {
                userId: user._id, 
                product,
                quantity,
            });
            const updatedCart = [...cartItems, { product, quantity }];
            setCartItems(updatedCart);
            calculateTotal(updatedCart);
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axios.delete(`/cart/${user._id}/${productId}`);
            const updatedCart = cartItems.filter((item) => item.productId !== productId);
            setCartItems(updatedCart);
            calculateTotal(updatedCart);
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error);
        }
    };

    const incrementQuantity = (productId) => {
        const updatedCart = cartItems.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
    };

    const decrementQuantity = (productId) => {
        const updatedCart = cartItems.map((item) =>
            item.productId === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedCart);
        calculateTotal(updatedCart);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                totalItems,
                totalPrice,
                addToCart,
                removeFromCart,
                incrementQuantity,
                decrementQuantity,
                cart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
