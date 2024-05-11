import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductAuth } from "../context/ProductContext";
import CarritoCheckV1 from '../components/Carrito/CarritoCheckV1'

const CarritoCheck = () => {
    const { id } = useParams();
    const { getById } = useProductAuth();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                if (!id) {
                    throw new Error("ID del producto no definido");
                }
                const productoData = await getById(id);
                setProducto(productoData);
                setLoading(false);
            } catch (error) {
                console.error("Error al obtener detalles del producto:", error);
                navigate('/');
            }
        };

        fetchProducto();
    }, [getById, id, navigate]);

    

    return (
        <div>
            {producto && <CarritoCheckV1 producto={producto} />}
        </div>
    );
}

export default CarritoCheck;
