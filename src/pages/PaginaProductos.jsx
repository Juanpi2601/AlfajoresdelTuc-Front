import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import CardProductos from '../components/paginaProductos/CardProductos';
import { useProductAuth } from '../context/ProductContext';
import { Container, Row, Form, Button } from 'react-bootstrap';
import Categorias from '../components/paginaProductos/Categorias';
import "../components/paginaProductos/paginaProductos.css"

const PaginaProductos = () => {
    const { productos, getAllProduct } = useProductAuth();
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const searchInputRef = useRef();
    const priceInputRef = useRef();
    const searchFormRef = useRef();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [todasLasCategorias, setTodasLasCategorias] = useState([]);

    useEffect(() => {
        setFormData(productos);
        setLoading(false);
        const categoriasUnicas = [...new Set(productos.map(producto => producto.categoria))];
        setTodasLasCategorias(categoriasUnicas);
    }, [productos]);



    useEffect(() => {
        getAllProduct();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const searchValue = searchInputRef.current.value.trim().toLowerCase();
        const priceValue = priceInputRef.current.value;

        let filteredProducts = productos;

        if (searchValue !== '') {
            filteredProducts = filteredProducts.filter(producto =>
                producto.nombre.toLowerCase().includes(searchValue)
            );
        }
        if (priceValue !== '') {
            if (priceValue === 'asc') {
                filteredProducts = filteredProducts.sort((a, b) => a.precio - b.precio);
            } else if (priceValue === 'desc') {
                filteredProducts = filteredProducts.sort((a, b) => b.precio - a.precio);
            }
        }

        setCategoriaSeleccionada('');
        setFormData(filteredProducts);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const productosFiltrados = categoriaSeleccionada === '' || categoriaSeleccionada === 'Todas las categorias'
        ? formData
        : formData.filter(producto => producto.categoria === categoriaSeleccionada);

    return (
        <>
            <div className="columnaCategorias text-center px-0">
                <h1 className='text-light '>Nuestros Productos!</h1>
            </div>
            <Container className="w-100" >
                <section className="d-flex justify-content-center text-center w-100">
                    <Form
                        ref={searchFormRef}
                        onSubmit={submitHandler}
                        className="align-items-center "
                    >
                        <div className="d-flex">
                        <div className="d-flex col-12 col-md-4 w-50 m-2">
                            <div className="input-group">
                                <Form.Control
                                    className="colColor"
                                    type="text"
                                    id="searchInput"
                                    placeholder="Buscar por nombre"
                                    ref={searchInputRef}
                                    onKeyDown={(e) =>
                                        e.code == "Enter"
                                    }
                                />
                            </div>
                        </div>
                        <div className="d-flex col-12 col-md-3 w-50 my-2">
                            <Form.Select
                                className="form-select colColor"
                                id="priceSelect"
                                defaultValue={""}
                                ref={priceInputRef}
                                
                            >
                                <option disabled hidden value="" className='my-2'>
                                    Filtrar por precio
                                </option>
                                <option value="asc" className='my-2 border border-radius' >Precio ascendente</option>
                                <option value="desc" className='my-2 border border-radius'>Precio descendiente</option>
                            </Form.Select>
                            <Button type="submit" variant="primary" className='mx-2'>Filtrar</Button>
                        </div>
                        </div>
                        <div className="col-12 col-md-3 w-100 m-3 ">
                            <Categorias categoria={['Todas las categorias', ...todasLasCategorias]} handleCategoriaSeleccionada={setCategoriaSeleccionada} />
                        </div>
                        
                    </Form>
                </section>
                <Row className="">

                    {loading ? (
                        <LoadingScreen />
                    ) : (
                        <>
                            {productosFiltrados.length > 0 ? (
                                <CardProductos formData={productosFiltrados} handleAddToCart={handleAddToCart} />
                            ) : (
                                <p className="mb-5 fs-3">No hay productos disponibles para la categoría seleccionada.</p>
                            )}
                        </>
                    )}

                </Row>
            </Container>
        </>
    );
};

export default PaginaProductos;

