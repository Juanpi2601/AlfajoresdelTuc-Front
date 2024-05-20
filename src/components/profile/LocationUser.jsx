import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import provincias from '../../json/provincias.json';
import ciudades from '../../json/ciudades.json';
import axios from '../../api/axios';
import { alertCustom, alertConfirm } from '../../utils/alertCustom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const LocationUserV1 = ({ userId, addresses }) => {
  const [selectedProvinceShipping, setSelectedProvinceShipping] = useState('');
  const [citiesShipping, setCitiesShipping] = useState([]);
  const [provincesList, setProvincesList] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]); 

  useEffect(() => {
    setProvincesList(provincias.provincias);
  }, []);

  const fetchSavedAddresses = async () => {
    try {
      const response = await axios.get('/address/getAddresses');
      setSavedAddresses(response.data);
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error al obtener las direcciones guardadas.', 'error');
    }
  };
  useEffect(() => {
    fetchSavedAddresses();
  }, []);

  const {
    register: registerShipping,
    handleSubmit: handleSubmitShipping,
    formState: { errors: errorsShipping },
    setValue,
    reset
  } = useForm();

  useEffect(() => {
    if (editingAddress) {
      Object.keys(editingAddress).forEach((key) => {
        setValue(key, editingAddress[key]);
      });
    } else {
      reset();
    }
  }, [editingAddress, setValue, reset]);

  const handleCreateAddress = async (data) => {
    try {
      const response = await axios.post('/address/addresses', data);
      alertCustom('¡Éxito!', 'La dirección fue agregada correctamente.', 'success');
      setSavedAddresses([...savedAddresses, response.data]);  
      reset();
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error al guardar la dirección.', 'error');
    }
  };

  const handleUpdateAddress = async (data) => {
    try {
      const response = await axios.patch(`/address/updateAddress/${editingAddress._id}`, data);
      alertCustom('¡Éxito!', 'La dirección fue editada correctamente.', 'success');
      setSavedAddresses(savedAddresses.map(addr => addr._id === editingAddress._id ? response.data : addr));  
      setEditingAddress(null);
      fetchSavedAddresses();
    } catch (error) {
      alertCustom('Error', 'Ha ocurrido un error al actualizar la dirección', 'error');
    }
  };
  

  const handleDeleteAddress = async (addressId, addressName) => {
    try {
      alertConfirm(
        '¿Estás seguro?',
        `Estás por eliminar la Dirección "${addressName}" de manera definitiva`,
        'warning',
        'Eliminar',
        async () => {
          try {
            await axios.delete(`/address/deleteAddress/${addressId}`);
            setSavedAddresses(savedAddresses.filter(address => address._id !== addressId));
            alertCustom('Éxito', 'Dirección eliminada correctamente', 'success');
          } catch (error) {
            alertCustom('Error', 'Ha ocurrido un error al eliminar la dirección', 'error');
          }
        }
      );
    } catch (error) {
      alertCustom('Error', 'Ha ocurrido un error al mostrar la confirmación', 'error');
    }
  };
  

  const onSubmitShipping = async (data, e) => {
    e.preventDefault();
    if (editingAddress) {
      handleUpdateAddress(data);
    } else {
      handleCreateAddress(data);
    }
  };

  const handleProvinceChangeShipping = (e) => {
    const selectedProvinceName = e.target.value;
    setSelectedProvinceShipping(selectedProvinceName);
    const selectedProvinceId = provincesList.find(provincia => provincia.nombre === selectedProvinceName).id;
    const selectedCities = ciudades.provincias.filter((departamento) => departamento.provincia.id === selectedProvinceId);
    setCitiesShipping(selectedCities);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
  };

  return (
    <Container className="bg-white mt-5 w-75 border pt-5">
      <Row>
        <Col xs={6}>
          <div className="d-flex justify-content-center">
            <Form onSubmit={handleSubmitShipping(onSubmitShipping)}>
              <h3 className="text-black">Dirección</h3>
              {/* <Form.Group>
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  {...registerShipping("firstName", { required: "El nombre es requerido" })}
                />
                {errorsShipping.firstName && (
                  <Form.Text className="text-danger">{errorsShipping.firstName.message}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Apellidos *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Apellidos"
                  {...registerShipping("lastName", { required: "Los apellidos son requeridos" })}
                />
                {errorsShipping.lastName && (
                  <Form.Text className="text-danger">{errorsShipping.lastName.message}</Form.Text>
                )}
              </Form.Group> */}
              <Form.Group>
                <Form.Label>Dirección (calle y nro) *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Dirección (calle y nro)"
                  {...registerShipping("address", { required: "La dirección es requerida" })}
                />
                {errorsShipping.address && (
                  <Form.Text className="text-danger">{errorsShipping.address.message}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Piso / Dto (opcional)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Piso / Dto"
                  {...registerShipping("floor")}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Provincia *</Form.Label>
                <Form.Control
                  as="select"
                  {...registerShipping("province", { required: "La provincia es requerida" })}
                  onChange={handleProvinceChangeShipping}
                >
                  <option value="">Selecciona una provincia</option>
                  {provincesList.map((provincia) => (
                    <option key={provincia.id} value={provincia.nombre}>{provincia.nombre}</option>
                  ))}
                </Form.Control>
                {errorsShipping.province && (
                  <Form.Text className="text-danger">{errorsShipping.province.message}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Ciudad *</Form.Label>
                <Form.Control
                  as="select"
                  {...registerShipping("city", { required: "La ciudad es requerida" })}
                >
                  <option value="">Selecciona una ciudad</option>
                  {citiesShipping.map((ciudad) => (
                    <option key={ciudad.id} value={ciudad.nombre}>{ciudad.nombre}</option>
                  ))}
                </Form.Control>
                {errorsShipping.city && (
                  <Form.Text className="text-danger">{errorsShipping.city.message}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label>Código postal / ZIP *</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Código postal / ZIP"
                  {...registerShipping("postalCode", { required: "El código postal es requerido" })}
                />
                {errorsShipping.postalCode && (
                  <Form.Text className="text-danger">{errorsShipping.postalCode.message}</Form.Text>
                )}
              </Form.Group>
              <Form.Group>
                <Button className="mt-4 mb-5" variant="primary" type="submit">
                  {editingAddress ? 'Guardar Dirección' : 'Crear Dirección'}
                </Button>
                {editingAddress && (
                  <Button onClick={() => setEditingAddress(null)} className="mt-4 mb-3 ml-3" variant="secondary">
                    Cancelar
                  </Button>
                )}
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
        {savedAddresses.length === 0 ? (
          <p className="text-center mt-3">Sin direcciones, cree una por favor.</p>
        ) : (
          <>
            <h4 className="text-center mt-5">Direcciones Guardadas</h4>
            <Table striped bordered hover >
            <thead>
              <tr style={{ textAlign: 'center' }}>
                {/* <th>Nombre</th>
                <th>Apellidos</th> */}
                <th>Dirección</th>
                <th>Ciudad</th>
                <th>Provincia</th>
                <th>Código Postal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {savedAddresses.map((address) => (
                <tr key={`${userId}-${address._id}`} style={{ textAlign: 'center' }}>
                  <td>{address.address}</td>
                  <td>{address.city}</td>
                  <td>{address.province}</td>
                  <td>{address.postalCode}</td>
                  <td>
                    <Button variant="warning" onClick={() => handleEditAddress(address)}>
                      <EditIcon />
                    </Button>{' '}
                    <Button variant="danger" onClick={() => handleDeleteAddress(address._id, address.address)}>
                      <DeleteIcon/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </>
          )}
        </Col>
      </Row>
      </Container>
  );
};

export default LocationUserV1;

