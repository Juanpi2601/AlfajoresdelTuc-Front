import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import provincias from '../../json/provincias.json';
import ciudades from '../../json/ciudades.json';

const LocationUserV1 = () => {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [cities, setCities] = useState([]);
  const [provincesList, setProvincesList] = useState([]);

  useEffect(() => {
    setProvincesList(provincias.provincias);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const handleProvinceChange = (e) => {
    const selectedProvinceName = e.target.value;
    setSelectedProvince(selectedProvinceName);
    const selectedProvinceId = provincesList.find(provincia => provincia.nombre === selectedProvinceName).id;
    const selectedCities = ciudades.provincias.filter((departamento) => departamento.provincia.id === selectedProvinceId);
    setCities(selectedCities);
  };

  return (
    <Container className="bg-white mt-5 w-75 border pt-5">
      <Row>
        <Col xs={6} className="mx-auto">
          <h3 className="text-black mt-3 pt-3">Dirección de Envío</h3>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                {...register("firstName", { required: "El nombre es requerido" })}
              />
              {errors.firstName && (
                <Form.Text className="text-danger">{errors.firstName.message}</Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellidos *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apellidos"
                {...register("lastName", { required: "Los apellidos son requeridos" })}
              />
              {errors.lastName && (
                <Form.Text className="text-danger">{errors.lastName.message}</Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Dirección (calle y nro) *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Dirección (calle y nro)"
                {...register("address", { required: "La dirección es requerida" })}
              />
              {errors.address && (
                <Form.Text className="text-danger">{errors.address.message}</Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Piso / Dto (opcional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Piso / Dto"
                {...register("floor")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Provincia *</Form.Label>
              <Form.Control
                as="select"
                {...register("province", { required: "La provincia es requerida" })}
                onChange={handleProvinceChange}
              >
                <option value="">Selecciona una provincia</option>
                {provincesList.map((provincia) => (
                  <option key={provincia.id} value={provincia.nombre}>{provincia.nombre}</option>
                ))}
              </Form.Control>
              {errors.province && (
                <Form.Text className="text-danger">{errors.province.message}</Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Ciudad *</Form.Label>
              <Form.Control
                as="select"
                {...register("city", { required: "La ciudad es requerida" })}
              >
                <option value="">Selecciona una ciudad</option>
                {cities.map((ciudad) => (
                  <option key={ciudad.id} value={ciudad.nombre}>{ciudad.nombre}</option>
                ))}
              </Form.Control>
              {errors.city && (
                <Form.Text className="text-danger">{errors.city.message}</Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Código postal / ZIP *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Código postal / ZIP"
                {...register("postalCode", { required: "El código postal es requerido" })}
              />
              {errors.postalCode && (
                <Form.Text className="text-danger">{errors.postalCode.message}</Form.Text>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar Dirección de Envío
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LocationUserV1;
