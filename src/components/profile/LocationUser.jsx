import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import provincias from '../../json/provincias.json';
import ciudades from '../../json/ciudades.json';
import axios from '../../api/axios';
import { alertCustom, alertConfirm } from '../../utils/alertCustom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PaginationRounded from "../pagination/Pagination";

const LocationUserV1 = ({ userId }) => {
  const [selectedProvinceShipping, setSelectedProvinceShipping] = useState('');
  const [citiesShipping, setCitiesShipping] = useState([]);
  const [provincesList, setProvincesList] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(savedAddresses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = savedAddresses.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

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
            if (currentItems.length === 1 && currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
          } catch (error) {
            alertCustom('Error', 'Ha ocurrido un error al eliminar la dirección', 'error');
          }
        }
      );
    } catch (error) {
      alertCustom('Error', 'Ha ocurrido un error al mostrar la confirmación', 'error');
    }
  };

  const onSubmitShipping = async (data) => {
    if (editingAddress) {
      handleUpdateAddress(data);
    } else {
      handleCreateAddress(data);
    }
  };

  useEffect(() => {
    if (editingAddress) {
      Object.keys(editingAddress).forEach((key) => {
        setValue(key, editingAddress[key]);
      });
      handleProvinceChangeShipping({ target: { value: editingAddress.province } }, editingAddress.city);
    } else {
      reset();
    }
  }, [editingAddress, setValue, reset]);

  const handleProvinceChangeShipping = (e, preselectedCity = '') => {
    const selectedProvinceName = e.target.value;
    setSelectedProvinceShipping(selectedProvinceName);
    const selectedProvinceId = provincesList.find(provincia => provincia.nombre === selectedProvinceName).id;
    const selectedCities = ciudades.provincias.filter((departamento) => departamento.provincia.id === selectedProvinceId);
    setCitiesShipping(selectedCities);

    if (preselectedCity) {
      setTimeout(() => setValue('city', preselectedCity), 0);
    } else {
      setValue('city', '');
    }
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
  };

  return (
    <Container className="bg-white mt-3 w-100 border pt-3">
      <Row>
        <Col xs={12}>
          <div className="d-flex justify-content-center">
            <Form onSubmit={handleSubmitShipping(onSubmitShipping)}>
              <h3 className="text-black">Dirección</h3>
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
            <p className="text-center small">Sin direcciones, cree una por favor.</p>
          ) : (
            <>
              <h4 className="text-center">Direcciones Guardadas</h4>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr style={{ textAlign: 'center' }}>
                    <th>Dirección</th>
                    <th>Ciudad</th>
                    <th>Provincia</th>
                    <th>Código Postal</th>
                    <th>Acciones</th>
                  </tr>

                  </thead>
                <tbody>
                  {currentItems.map((address) => (
                    <tr key={`${userId}-${address._id}`} style={{ textAlign: 'center' }}>
                      <td>{address.address}</td>
                      <td>{address.city}</td>
                      <td>{address.province}</td>
                      <td>{address.postalCode}</td>
                      <td>
                        <Button variant="warning mb-2" onClick={() => handleEditAddress(address)}>
                          <EditIcon />
                        </Button>{' '}
                        <Button variant="danger mb-2" onClick={() => handleDeleteAddress(address._id, address.address)}>
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PaginationRounded count={totalPages} onChange={handleChangePage} />
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LocationUserV1;


