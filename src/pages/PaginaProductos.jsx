import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import CardProductos from '../components/paginaProductos/CardProductos';
import { useProductAuth } from '../context/ProductContext';
import { Container, Row, Form, Button, Modal } from 'react-bootstrap'; // Quité Dropdown y Modal de la importación
import Categorias from '../components/paginaProductos/Categorias';
import "../components/paginaProductos/paginaProductos.css";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const PaginaProductos = () => {
    const { productos, getAllProduct } = useProductAuth();
    const [originalFormData, setOriginalFormData] = useState([])
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const searchInputRef = useRef();
    const priceInputRef = useRef();
    const searchFormRef = useRef();
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [todasLasCategorias, setTodasLasCategorias] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        setOriginalFormData(productos);
        setFormData(productos);
        setLoading(false);
        const categoriasUnicas = [...new Set(productos.map(producto => producto.categoria))];
        setTodasLasCategorias(categoriasUnicas);
    }, [productos]);

    useEffect(() => {
        getAllProduct();
    }, []);

    const filterBySearch = (searchValue) => {
        return formData.filter(producto =>
            producto.nombre.toLowerCase().includes(searchValue.trim().toLowerCase())
        );
    };

    const filterByPrice = (priceValue) => {
        let filteredProducts = [...formData];
        if (priceValue === 'asc') {
            filteredProducts.sort((a, b) => a.precio - b.precio);
        } else if (priceValue === 'desc') {
            filteredProducts.sort((a, b) => b.precio - a.precio);
        }
        return filteredProducts;
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const searchValue = searchInputRef.current.value;
        const priceValue = priceInputRef.current.value;
        let filteredProducts = [...originalFormData];
        if (searchValue.trim() !== '') {
            filteredProducts = filterBySearch(searchValue);
        }
        if (priceValue !== '') {
            filteredProducts = filterByPrice(priceValue);
        }

        setFormData(filteredProducts);
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const clearFilters = () => {
        setFormData(originalFormData);
        setCategoriaSeleccionada('');
        searchInputRef.current.value = '';
        priceInputRef.current.value = '';
    };

    const productosFiltrados = categoriaSeleccionada === '' || categoriaSeleccionada === 'Todas las categorias'
        ? formData
        : formData.filter(producto => producto.categoria === categoriaSeleccionada);

    return (
        <>
            <div className="columnaCategorias text-center px-0">
                <h1 className='text-light '>Nuestros Productos!</h1>
            </div>

            <Container >
                <section className="justify-content-center p-3 text-center w-100">
                    
                    <Form
                        ref={searchFormRef}
                        onSubmit={submitHandler}
                        className='justify-content-center my-1'
                    >
                        <div className="d-flex w-100 justify-content-center text-center d-none d-lg-flex " >

                            <Form.Control
                                className="mx-1 my-1"
                                type="text"
                                id="searchInput"
                                placeholder="Buscar por nombre..."
                                ref={searchInputRef}
                                onKeyDown={(e) => e.code === "Enter"}
                            />
                            <Form.Select
                                className="text-center mx-1 my-1"
                                style={{ cursor: 'pointer' }}
                                id=""
                                defaultValue={""}
                                ref={priceInputRef}
                            >
                                <option value="" disabled hidden>
                                    Filtrar por precio
                                </option>
                                <option value="asc">menor - mayor</option>
                                <option value="desc">mayor - menor</option>
                            </Form.Select>

                            <Categorias className="" categoria={['Todas las categorias', ...todasLasCategorias]} handleCategoriaSeleccionada={setCategoriaSeleccionada} />

                            <Button onClick={clearFilters} variant="secondary" className="w-100 mx-3 my-1">Limpiar filtros</Button>
                            <Button type="submit" variant='warning'  className='w-75 my-1 text-dark'>Filtrar</Button>
                        </div>

                        <div className="d-flex d-lg-none justify-content-center">
                            <Button variant='warning' className='w-75 text-dark' onClick={() => setModalShow(true)}> <FilterAltIcon></FilterAltIcon> Filtros</Button>
                            <Modal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Filtros</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form
                                        ref={searchFormRef}
                                        onSubmit={submitHandler}
                                        className=' justify-content-center mx-1 my-1'
                                    >
                                        <div className=" justify-content-center text-center " >

                                            <Form.Control
                                                className="mx-1 my-1"
                                                type="text"
                                                id="searchInput"
                                                placeholder="Buscar por nombre..."
                                                ref={searchInputRef}
                                                onKeyDown={(e) => e.code === "Enter"}
                                            />
                                            <Form.Select
                                                className="text-center mx-1 my-1"
                                                style={{ cursor: 'pointer' }}
                                                id=""
                                                defaultValue={""}
                                                ref={priceInputRef}
                                            >
                                                <option value="" disabled hidden>
                                                    Filtrar por precio
                                                </option>
                                                <option value="asc">Precio ascendente</option>
                                                <option value="desc">Precio descendente</option>
                                            </Form.Select>

                                            <Categorias className="border" categoria={['Todas las categorias', ...todasLasCategorias]} handleCategoriaSeleccionada={setCategoriaSeleccionada} />
                                            <div className='d-flex w-100'>
                                            <Button onClick={clearFilters} variant="secondary" className="w-50 mx-1 my-1">Limpiar filtros</Button>
                                            <Button type="submit" variant='warning'  className='w-50 my-1 text-dark'>Filtrar</Button>
                                            </div>
                                            
                                        </div>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setModalShow(false)}>Cerrar</Button>
                                </Modal.Footer>
                            </Modal>
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
                                <p className="my-5 fs-4 text-center p-2 bg-warning text-danger border-rounded w-75 m-auto"> ⚠ No se han encontrado productos que coincidan con tu selección.</p>
                            )}
                        </>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default PaginaProductos;
