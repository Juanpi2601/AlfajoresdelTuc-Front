import React, { useState, useEffect,useRef } from 'react';
import { useLocation } from 'react-router-dom';
import CardProductos from '../components/paginaProductos/CardProductos';
import { useProductAuth } from '../context/ProductContext';
import { Container, Row, Form, Button } from 'react-bootstrap';
import "../components/paginaProductos/paginaProductos.css"

const PaginaProductos = () => {
    const { productos, getAllProduct } = useProductAuth();
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const searchInputRef = useRef();
    const priceInputRef = useRef();
    const categoryInputRef = useRef();
    const searchFormRef = useRef();


    useEffect(() => {
        setFormData(productos);
        setLoading(false);
    }, [productos]);

    useEffect(() => {
        getAllProduct();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
    };
    
    const handleAddToCart = (product) => {
        addToCart(product); 
    };



    return (
        <Container fluid className=''>
            <Row >
                <div className="columnaCategorias text-center px-0">
                    <h1 className='text-light '>Nuestros Productos!</h1>
                </div>
                
                <section className="container mt-3 ">
                    <Form
                        ref={searchFormRef}
                        onSubmit={submitHandler}
                        className="row g-3 align-items-center"
                    >
                        <div className="col-12 col-md-4">
                            <div className="input-group">
                                <Form.Control
                                    className="colColor"
                                    type="text"
                                    id="searchInput"
                                    placeholder="Buscar por nombre"
                                    ref={searchInputRef}
                                    onKeyDown={(e) =>
                                        e.code == "Enter"
                                            ? handleQueryParams({
                                                valueSearchInput: searchInputRef.current.value,
                                                valueCategoryInput: categoryInputRef.current.value,
                                                valuePriceInput: priceInputRef.current.value,
                                                setQueryParams: setQueryParams,
                                            })
                                            : ""
                                    }
                                />
                            </div>
                        </div>
                        <div className="col-12 col-md-3">
                            <Form.Select
                                className="form-select colColor"
                                id="priceSelect"
                                defaultValue={""}
                                ref={priceInputRef}
                                onChange={(e) =>
                                    handleQueryParams({
                                        valueSearchInput: searchInputRef.current.value,
                                        valuecategoryInput: categoryInputRef.current.value,
                                        valuepriceInput: priceInputRef.current.value,
                                        setQueryParams: setQueryParams,
                                    })
                                }
                            >
                                <option disabled hidden value="">
                                    Filtrar por precio
                                </option>
                                <option value="asc" className='' >Precio ascendente</option>
                                <option value="desc">Precio descendiente</option>
                            </Form.Select>
                        </div>
                        <div className="col-12 col-md-3">
                            <Form.Select
                                className="form-select colColor"
                                id="categorySelect"
                                defaultValue={""}
                                ref={categoryInputRef}
                                onChange={(e) =>
                                    handleQueryParams({
                                        valueSearchInput: searchInputRef.current.value,
                                        valueCategoryInput: valueCategoryInput.current.value,
                                        valuepriceInput: priceInputRef.current.value,
                                        setQueryParams: setQueryParams,
                                    })
                                }
                            >
                                <option disabled hidden value="">
                                    Filtrar por categoria
                                </option>
                                <option value="Alfajor">Alfajor</option>
                                <option value="Conitos">Conitos</option>
                                <option value="Nueces">Nueces</option>
                                
                            </Form.Select>
                        </div>
                        <div className="col-lg-1">
                            <button
                                type="button"
                                className="btn btn-primary w-100 btnFiltrar"
                                onClick={() =>
                                    handleQueryParams({
                                        valueSearchInput: searchInputRef.current.value,
                                        valuecategoryInput: categoryInputRef.current.value,
                                        valuepriceInput: priceInputRef.current.value,
                                        setQueryParams: setQueryParams,
                                    })
                                }
                            >
                                Filtrar
                            </button>

                        </div>
                        <div className="col-lg-1">
                            <button
                                type="button"
                                className="btn btn-dark border-1 border-light w-100 boton6"
                                onClick={(e) => {
                                    e.preventDefault();
                                    searchFormRef.current.reset();
                                    setQueryParams();
                                }}
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    </Form>
                </section>
                
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        {formData?.length > 0 ? (
                                <CardProductos formData={formData} handleAddToCart={handleAddToCart}/>
                        ) : (
                            <>
                                <p className="mb-5 fs-3">
                                    Disculpa, no encontramos ningún producto
                                </p>
                            </>
                        )}
                    </>
                )}
            </Row>
        </Container>
    );
};


export default PaginaProductos;

