import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Alert, FormGroup } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import Checkbox from '@mui/material/Checkbox';
import axios from '../../api/axios';
import { alertCustom, alertConfirm } from '../../utils/alertCustom';
import PaginationRounded from '../pagination/Pagination';

const PanelNovedadesAdmin = () => {
    const [novedades, setNovedades] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        imgUrl: '',
        visible: true,
    });

    const [errors, setErrors] = useState({
        nombre: '',
        imgUrl: '',
    });
    const [submitButtonText, setSubmitButtonText] = useState('Agregar Producto');
    const [editIndex, setEditIndex] = useState(null);

    const getAllNovedades = async () => {
        try {
            const response = await axios.get('/novedad/getAll');
            setNovedades(response.data);
        } catch (error) {
            console.error('Error al obtener las novedades:', error);
        }
    };

    useEffect(() => {
        getAllNovedades();
    }, []);

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
        const { nombre, imgUrl, visible } = formData;
        const validationErrors = validateForm();
        if (!nombre || !imgUrl) {
            alertCustom("Por favor, completa todos los campos.");
            return;
        }
        if (Object.values(validationErrors).some(error => error !== '')) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (editIndex !== null) {
                const updatedNovedades = [...novedades];
                updatedNovedades[editIndex] = formData;
                await axios.patch(`/novedad/${novedades[editIndex]._id}`, formData);
                setNovedades(updatedNovedades);
            } else {
                const response = await axios.post('/novedad/create', formData);
                setNovedades([...novedades, response.data]);
            }
            alertCustom('¡Éxito!', 'La Novedad fue agregada correctamente.', 'success');
            setFormData({
                nombre: '',
                imgUrl: '',
                visible: true,
            });
            setEditIndex(null);
            setSubmitButtonText('Agregar Producto');
        } catch (error) {
            alertCustom('Upps', 'Ha ocurrido un error al crear la Novedad', 'error');
        }
    };

    const handleDelete = async (id, nombre) => {
        alertConfirm(
            '¿Estás seguro?',
            `Estás por eliminar la Novedad ${nombre} de manera definitiva`,
            'warning',
            'Eliminar',
            async () => {
                try {
                    await axios.delete(`/novedad/delete/${id}`);
                    const updatedNovedades = novedades.filter(novedad => novedad._id !== id);
                    setNovedades(updatedNovedades);
                    alertCustom('Éxito', 'Novedad eliminada correctamente', 'success');
                } catch (error) {
                    alertCustom('Error', 'Ha ocurrido un error al eliminar la Novedad', 'error');
                }
            }
        );
    };
    const handleVisibilityChange = async (novedadId) => {
        const updatedNovedades = novedades.map(n => n._id === novedadId ? { ...n, visible: !n.visible } : n);
        setNovedades(updatedNovedades);
        try {
            await axios.patch(`/novedad/updateVisibility/${novedadId}`, { visible: !novedades.find(n => n._id === novedadId).visible });
        } catch (error) {
            console.error('Error al actualizar visibilidad de la novedad:', error);
        }
    };
    

    const validateForm = () => {
        const { nombre, imgUrl } = formData;
        const errors = {
            nombre: nombre ? '' : 'Por favor, introduce un nombre.',
            imgUrl: imgUrl ? '' : 'Por favor, selecciona una imagen.',
        };
        return errors;
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = novedades.filter((item, index) => index >= indexOfFirstItem && index < indexOfLastItem);

    const totalPages = Math.ceil(novedades.length / itemsPerPage);

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <>
            <Container className="bg-white mt-5 w-75 py-5 border rounded">
                <h3 className='text-center'>Administración de Novedades</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupNombre">
                        <Form.Control type="text" name="nombre" placeholder="Ingresar Nombre de la Novedad" value={formData.nombre} onChange={handleChange} />
                        {errors.nombre && <Alert className='my-3' variant="danger"><ErrorIcon />{errors.nombre}</Alert>}
                    </Form.Group>
                    <Form.Group controlId="formImageUrl" className="mb-3">
                        <Form.Control type="text" name="imgUrl" placeholder="Ingrese la URL de la imagen" value={formData.imgUrl} onChange={handleChange} />
                        {errors.imgUrl && <Alert className='my-3 ' variant="danger"><ErrorIcon/>{errors.imgUrl}</Alert>}
                    </Form.Group>
                    <FormGroup className='text-center'>
                        <Button type="submit" variant="warning" className='my-3 color-warning'>{editIndex !== null ? 'Editar Producto' : 'Agregar Novedad'}</Button>
                    </FormGroup>
                </Form>
            </Container>
            <Container className="mt-5">
                <h3 className="text-center">Novedades cargadas</h3>
                <Table striped bordered hover className='my-5'>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>Nombre de La imagen</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {currentItems.map((novedad) => (
                            <tr key={novedad._id}>
                                <td>{novedad.nombre}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <img src={novedad.imgUrl} alt={novedad.nombre} style={{ width: '80px', height: '60px' }} />
                                </td>
                                <td>
                                    <Checkbox
                                        checked={novedad.visible}
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                                        onChange={() => handleVisibilityChange(novedad._id)}
                                    />
                                    <Button variant="danger" className='mx-1' onClick={() => handleDelete(novedad._id, novedad.nombre)}> <DeleteIcon /> </Button>
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

export default PanelNovedadesAdmin;

