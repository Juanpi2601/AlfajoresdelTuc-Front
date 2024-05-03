import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "../api/axios";
import { alertCustom } from '../utils/alertCustom';


export const ProductContext = createContext();

export const useProductAuth = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuhtProvider");
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    const [errors, setErrors] = useState("");
    const [productos, setProductos] = useState([]);

    const signin = async (product) => {
        try {
            const res = await axios.post('/products/create', product);
            if (res.status === 200 || res.status === 201) {
                alertCustom('Éxito', 'Producto creado exitosamente', 'success');
            } else {
                alertCustom('Upps', 'El producto se creó, pero se recibió un código de estado inesperado.', 'warning');
            }
            console.log(product);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Ha ocurrido un error.';
            alertCustom('Upps', errorMessage, 'error');
            console.log(error);
        }
    };

    const addProduct = (product) => {
        setProductos(currentProducts => [...currentProducts, product]);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setErrors("");
        }, 3500);
        return () => clearTimeout(timer);
    }, [errors]);

    return (
        <ProductContext.Provider
            value={{
                signin,
                addProduct,
                errors,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};