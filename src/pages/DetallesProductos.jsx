import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductAuth } from "../context/ProductContext";
import DetallesProductosV1 from "../components/paginaProductos/DetallesProductosV1";

const DetallesProductos = () => {
    const { id } = useParams();
    const { getById } = useProductAuth();
    const [producto, setProducto] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const productoData = await getById(id);
                setProducto(productoData);
            } catch (error) {
                console.error("Error al obtener detalles del producto:", error);
                navigate('/');
            }
        };

        fetchProducto();
    }, [getById, id, navigate]);

    return (
        <div>
            {producto && <DetallesProductosV1 producto={producto} />}
        </div>
    );
};

export default DetallesProductos;
