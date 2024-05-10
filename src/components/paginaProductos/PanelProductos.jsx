import React, { useState, useEffect } from 'react';
import { Container, Form, InputGroup, Button, Table } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { alertCustom, alertConfirm } from '../../utils/alertCustom';
import { useProductAuth } from '../../context/ProductContext';
import PaginationRounded from "../pagination/Pagination";

const PanelProductos = () => {
    const { signin, productos, getAllProduct, deleteProduct, editProduct } = useProductAuth();
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        imagenUrl: '',
        descripcion: '',
        cantidad:'',
        categoria: ''
    });
    const [editIndex, setEditIndex] = useState(null);
    const [submitButtonText, setSubmitButtonText] = useState('Agregar Producto');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        if (editIndex !== null) {
            const productoEditado = productos[editIndex];
            setFormData({
                nombre: productoEditado.nombre,
                precio: productoEditado.precio,
                imagenUrl: productoEditado.imagenUrl,
                descripcion: productoEditado.descripcion,
                cantidad: productoEditado.cantidad,
                categoria: productoEditado.categoria
            });
            setSubmitButtonText('Editar Producto');
        } else {
            setFormData({
                nombre: '',
                precio: '',
                imagenUrl: '',
                descripcion: '',
                cantidad:'',
                categoria: ''
            });
            setSubmitButtonText('Agregar Producto');
        }
    }, [editIndex, productos, getAllProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombre, precio, imagenUrl, descripcion, cantidad, categoria } = formData;
        try {
            if (!nombre || !precio || !imagenUrl || !descripcion|| !cantidad || !categoria) {
                alertCustom("Por favor, completa todos los campos.");
                return;
            }
            if (editIndex !== null) {
                await editProduct(productos[editIndex]._id, formData);
            } else {
                await signin(formData);
            }
            alertCustom('¡Éxito!', 'El producto fue agregado/editado correctamente.', 'success');
            getAllProduct();
            setEditIndex(null);
            setFormData({
                nombre: '',
                precio: '',
                imagenUrl: '',
                descripcion: '',
                cantidad:'',
                categoria: ''
            });
            setSubmitButtonText('Agregar Producto');
        } catch (error) {
            alertCustom('Upps', 'Ha ocurrido un error al crear/editar el producto.', 'error');
        }
    };

    const handleDelete = async (id, nombre) => {
        try {
            alertConfirm(
                '¿Estás seguro?',
                `Estás por eliminar el Producto ${nombre} de manera definitiva`,
                'warning',
                'Eliminar',
                async () => {
                    await deleteProduct(id);
                    alertCustom('Éxito', 'Producto eliminado correctamente', 'success');
                    getAllProduct();
                }
            );
        } catch (error) {
            alertCustom('Error', 'Ha ocurrido un error al eliminar el producto', 'error');
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setSubmitButtonText('Editar Producto');
    };

    const totalPages = Math.ceil(productos.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = productos.slice(indexOfFirstItem, indexOfLastItem);

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };


    return (
        <>
            <Container className="bg-white mt-5 w-75 py-5 border rounded ">
                <h3 className='text-center'>Administración de Productos</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupNombre">
                        <Form.Control type="text" name="nombre" placeholder="Ingresar Nombre del Producto" value={formData.nombre} onChange={handleChange} />
                    </Form.Group>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control type="number" name="precio" placeholder="Precio del Producto" aria-label="Amount (to the nearest dollar)" value={formData.precio} onChange={handleChange} />
                    </InputGroup>
                    <Form.Group controlId="formImageUrl" className="mb-3">
                        <Form.Control type="text" name="imagenUrl" placeholder="Ingrese la URL de la imagen" value={formData.imagenUrl} onChange={handleChange} />
                    </Form.Group>
                    <Form.Select className='mb-3' aria-label="Default select example" name="categoria" value={formData.categoria} onChange={handleChange}>
                        <option>Seleccionar Categoría</option>
                        <option value="Alfajores">Alfajores</option>
                        <option value="Conitos">Conitos</option>
                        <option value="Nueces">Nueces</option>
                        <option value="Cajas">Cajas</option>
                        <option value="Bombones">Bombones</option>
                    </Form.Select>
                    <Form.Group controlId="formDescripcion" className="mb-3">
                        <Form.Control  type='text' name="descripcion" placeholder="Descripcion del Producto" aria-label="Amount (to the nearest dollar)" value={formData.descripcion} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='text' name="cantidad" placeholder='Cantidad del Producto' aria-label="Amount (to the nearest dollar)" value={formData.cantidad} onChange={handleChange}/>
                    </Form.Group>
                    <Button type="submit" className='my-3'>{editIndex !== null ? 'Editar Producto' : 'Agregar Producto'}</Button>
                </Form>
            </Container>

            <Container className="mt-5">
                <h3 className="text-center">Lista de Productos</h3>
                <Table striped bordered hover className='my-5'>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Imagen</th>
                            <th>Categoría</th>
                            <th>Cantidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {productos.map((producto, index) => (
                            <tr key={producto._id}>
                                <td>{producto.nombre}</td>
                                <td>${producto.precio}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <img src={producto.imagenUrl} alt={producto.nombre} style={{ width: '80px', height: '60px' }} />
                                </td>
                                <td>{producto.categoria}</td>
                                <td>{producto.cantidad}</td>
                                <td>
                                    <Button variant="danger" className='mx-1' onClick={() => handleDelete(producto._id, producto.nombre)}> <DeleteIcon /> </Button>
                                    <Button variant="warning" className='mx-1' onClick={() => handleEdit(index)}> <EditIcon /> </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
                <div style={{ position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)", width: "fit-content", backgroundColor: "#FFF", zIndex: 1, margin: "0 auto" }}>
                    <PaginationRounded count={totalPages} onChange={handleChangePage} />
                </div>


            </Container>

        </>
    );
};

export default PanelProductos;
