import React, { useState, useEffect } from 'react';
import { Container, Form, InputGroup, Button, Table,Alert  } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { alertCustom, alertConfirm } from '../../utils/alertCustom';
import { useProductAuth } from '../../context/ProductContext';
import PaginationRounded from "../pagination/Pagination";
import ErrorIcon from '@mui/icons-material/Error';

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
    const [errors, setErrors] = useState({
        nombre: '',
        precio: '',
        imagenUrl: '',
        descripcion: '',
        cantidad: '',
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
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombre, precio, imagenUrl, descripcion, cantidad, categoria } = formData;
        const validationErrors = validateForm();
        try {
            if (!nombre || !precio || !imagenUrl || !descripcion|| !cantidad || !categoria) {
                alertCustom("Por favor, completa todos los campos.");
                return;
            }
            if (Object.values(validationErrors).some(error => error !== '')) {
                setErrors(validationErrors);
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

    const validateForm = () => {
        const { nombre, precio, imagenUrl, descripcion, cantidad, categoria } = formData;
        const errors = {
            nombre: nombre ? '' : 'Por favor, introduce un nombre.',
            precio: precio ? (isValidPrice(precio) ? '' : 'El precio debe ser un número positivo.') : 'Por favor, introduce un precio.',
            imagenUrl: imagenUrl ? (isValidImageUrl(imagenUrl) ? '' : 'La URL de la imagen debe ser válida y tener una extensión .jpg, .jpeg o .png.') : 'Por favor, introduce una URL de imagen.',
            descripcion: descripcion ? '' : 'Por favor, introduce una descripción.',
            cantidad: cantidad ? (isValidQuantity(cantidad) ? '' : 'La cantidad debe ser un número positivo.') : 'Por favor, introduce una cantidad.',
            categoria: categoria ? '' : 'Por favor, selecciona una categoría.'
        };
        return errors;
    };
    const isValidImageUrl = (url) => {
        const imageUrlRegex = /\.(jpeg|jpg|png)$/;
        return imageUrlRegex.test(url);
    };
    const isValidPrice = (price) => {
        return !isNaN(price) && parseFloat(price) > 0 && parseFloat(price) <10000000;
    };
    
    const isValidQuantity = (quantity) => {
        return !isNaN(quantity) && parseFloat(quantity) > 0;
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
                        {errors.nombre && <Alert className='my-3' variant="danger"><ErrorIcon/>{errors.nombre}</Alert>}
                    </Form.Group>
                    <InputGroup className="d-flex mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control type="number" name="precio" placeholder="Precio del Producto" aria-label="Amount (to the nearest dollar)" value={formData.precio} onChange={handleChange} />
                        
                    </InputGroup>
                    {errors.precio && <Alert className='' variant="danger"><ErrorIcon/>{errors.precio}</Alert>}
                    <Form.Group controlId="formImageUrl" className="mb-3">
                        <Form.Control type="text" name="imagenUrl" placeholder="Ingrese la URL de la imagen" value={formData.imagenUrl} onChange={handleChange} />
                        {errors.imagenUrl && <Alert className='my-3 ' variant="danger"><ErrorIcon/>{errors.imagenUrl}</Alert>}
                    </Form.Group>
                    <Form.Select className='mb-3' aria-label="Default select example" name="categoria" value={formData.categoria} onChange={handleChange}>
                        <option>Seleccionar Categoría</option>
                        <option value="Alfajores">Alfajores</option>
                        <option value="Conitos">Conitos</option>
                        <option value="Nueces">Nueces</option>
                        <option value="Cajas">Cajas</option>
                        <option value="Bombones">Bombones</option>\
                    </Form.Select>
                    <Form.Group controlId="formDescripcion" className="mb-3">
                        <Form.Control  type='text' name="descripcion" placeholder="Descripcion del Producto" aria-label="Amount (to the nearest dollar)" value={formData.descripcion} onChange={handleChange} />
                        {errors.descripcion && <Alert className='my-3' variant="danger"><ErrorIcon/>{errors.descripcion}</Alert>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type='text' name="cantidad" placeholder='Cantidad del Producto' aria-label="Amount (to the nearest dollar)" value={formData.cantidad} onChange={handleChange}/>
                        {errors.cantidad && <Alert className='my-3' variant="danger"><ErrorIcon/>{errors.cantidad}</Alert>}
                    </Form.Group>
                    <Button type="submit" variant="warning" className='my-3'>{editIndex !== null ? 'Editar Producto' : 'Agregar Producto'}</Button>
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
                        {currentItems.map((producto, index) => (
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <PaginationRounded count={totalPages} onChange={handleChangePage} />
                </div>


            </Container>

        </>
    );
};

export default PanelProductos;
