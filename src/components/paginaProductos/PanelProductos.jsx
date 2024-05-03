import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row, InputGroup, Button, Table } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { alertCustom, alertConfirm } from '../../utils/alertCustom';
import { useProductAuth } from '../../context/ProductContext';

const PanelProductos = () => {
    const { signin } = useProductAuth()
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        imagenUrl: '',
        categoria: ''
    });
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [productos, setProductos] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        if (editIndex !== null) {
            const productoEditado = productos[editIndex];
            setFormData({
                nombre: productoEditado.nombre,
                precio: productoEditado.precio,
                imagenUrl: productoEditado.imagenUrl,
                categoria: productoEditado.categoria
            });
        } else {
            setFormData({
                nombre: '',
                precio: '',
                imagenUrl: '',
                categoria: ''
            });
        }
    }, [editIndex, productos]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombre, precio, imagenUrl, categoria } = formData;
        try {
            
            if (!nombre || !precio || !imagenUrl || !categoria) {
                alertCustom("Por favor, completa todos los campos.");
                return;
            }
            if (editIndex !== null) {

                const productosActualizados = [...productos];
                productosActualizados[editIndex] = formData;
                setProductos(productosActualizados);
                setEditIndex(null);
            } else {

                setProductos(prevProductos => [...prevProductos, formData]);
            }
            await signin(e)
            alertCustom('¡Éxito!', 'El producto fue agregado correctamente.', 'success');
        } catch (error) {
            alertCustom('Upps', 'Ha ocurrido un error al crear el producto.', 'error');
        }

    };
    const handleDelete = async (index) => {
        try {
            setIsLoading(true);
            const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este producto?");
            if (confirmacion) {
                const nuevosProductos = [...productos];
                nuevosProductos.splice(index, 1);
                setProductos(nuevosProductos);

                // await axios.delete(`ruta_del_backend/${producto.id}`);
                alertCustom('Éxito', 'Producto eliminado correctamente', 'success');
            }
        } catch (error) {
            alertCustom('Error', 'Ha ocurrido un error al eliminar el producto', 'error');
        } finally {
            setIsLoading(false);
        }
    };


    const handleEdit = (index) => {

        setEditIndex(index);
    };

    return (
        <>
            <Container className="bg-white mt-5 w-75 py-5 border rounded ">
                <h3 className='text-center'>Administracion de Productos</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupNombre">
                        <Form.Control type="text" name="nombre" placeholder="Ingresar Nombre del Producto" value={formData.nombre} onChange={handleChange} />
                    </Form.Group>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>$</InputGroup.Text>
                        <Form.Control type="number" name="precio" placeholder="Precio del Producto" aria-label="Amount (to the nearest dollar)" value={formData.precio} onChange={handleChange} />
                    </InputGroup>
                    <Form.Group controlId="formImageUrl" className="mb-3">
                        <Form.Label>URL de la Imagen</Form.Label>
                        <Form.Control type="text" name="imagenUrl" placeholder="Ingrese la URL de la imagen" value={formData.imagenUrl} onChange={handleChange} />
                    </Form.Group>
                    <Form.Select aria-label="Default select example" name="categoria" value={formData.categoria} onChange={handleChange}>
                        <option>Seleccionar Categoria</option>
                        <option value="1">Alfajores</option>
                        <option value="2">Conitos</option>
                        <option value="3">Nueces</option>
                    </Form.Select>
                    <Button type="submit" className='my-3'>Agregar Producto</Button>
                </Form>
            </Container>

            <Container className="mt-5">
                <h3 className="text-center">Lista de Productos</h3>
                <Table striped bordered hover className='my-5'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Imagen</th>
                            <th className='text-center'>Categoría</th>
                            <th className='d-flex'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto, index) => (
                            <tr key={index}>
                                <td>{producto.nombre}</td>
                                <td>${producto.precio}</td>
                                <td>{producto.imagenUrl}</td>
                                <td>{producto.categoria}</td>
                                <td >
                                    <Button variant="danger" className='mx-1' onClick={() => handleDelete(index)}> <DeleteIcon /> </Button>
                                    <Button variant="warning" className='mx-1' onClick={() => handleEdit(index)}> <EditIcon /> </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

        </>
    );
}

export default PanelProductos;