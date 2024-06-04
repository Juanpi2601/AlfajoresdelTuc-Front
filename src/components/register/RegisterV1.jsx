import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, Alert, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import {
  passRegex,
  emailRegex,
  nameRegex,
} from "../../validation/registerValidation";

const RegisterUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="bg-white mt-5 w-75 border py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          {registerErrors.map((error, i) => (
            <Alert key={i} variant="danger">
              {error}
            </Alert>
          ))}
          <h3 className="text-black mt-3 pt-3">Formulario de Registro</h3>
          <Form onSubmit={onSubmit} >
            <Form.Group>
              <Form.Label htmlFor="name"></Form.Label>
              <Form.Control
                type="text"
                id="name"
                placeholder="Nombre y Apellido"
                className={errors.name?.message ? "is-invalid" : ""}
                {...register("name", {
                  required: {
                    value: true,
                    message: "El nombre y apellido es requerido",
                  },
                  pattern: {
                    value: nameRegex,
                    message: "El nombre es invalido",
                  },
                  maxLenght: {
                    value: 40,
                    message: "El nombre no puede tener más de 40 caracteres",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="userName"></Form.Label>
              <Form.Control
                id="userName"
                type="text"
                placeholder="Nombre de usuario"
                className={errors.userName?.message ? "is-invalid" : ""}
                {...register("userName", {
                  required: {
                    value: true,
                    message: "El nombre de usuario es requerido",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.userName?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="email"></Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder="Correo"
                className={errors.email?.message ? "is-invalid" : ""}
                {...register("email", {
                  required: {
                    value: true,
                    message: "El correo es requerido",
                  },
                  pattern: {
                    value: emailRegex,
                    message: "El correo no es valido",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="dni"></Form.Label>
              <Form.Control
                id="dni"
                type="text"
                placeholder="DNI (sin puntos)"
                className={errors.dni?.message ? "is-invalid" : ""}
                {...register("dni", {
                  required: {
                    value: true,
                    message: "El DNI es requerido",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dni?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password"></Form.Label>
              <Form.Control
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className={errors.password?.message ? "is-invalid" : ""}
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                  pattern: {
                    value: passRegex,
                    message:
                      "La contraseña debe tener por lo menos una letra mayuscula, una minúscula, un caracter especial (ej:! - $). Debe tener una longitud entre 6 y 20 caracteres",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="passwordCheck"></Form.Label>
              <Form.Control
                id="passwordCheck"
                type={showPassword ? "text" : "password"}
                placeholder="Repite la Contraseña"
                className={errors.passwordCheck?.message ? "is-invalid" : ""}
                {...register("passwordCheck", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                  validate: (value) => {
                    if (value === watch("password")) {
                      return true;
                    }
                    return "Las contraseñas no coinciden";
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordCheck?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox1">
              <Form.Check
                className="text-black"
                type="checkbox"
                label="Mostrar contraseña"
                onClick={togglePasswordVisibility}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox2">
              <Form.Check
                className="text-black mt-3"
                type="checkbox"
                label={
                  <span style = {{ cursor: 'pointer' }}>
                    Acepto los <a onClick={handleShow} className='text-decoration'>Términos y Condiciones</a>
                  </span>
                }
                {...register("checkbox", {
                  required: {
                    value: true,
                    message: "Debe aceptar los términos y condiciones",
                  },
                })}
              />
              {errors.checkbox && (
                <span className="text-danger">{errors.checkbox.message}</span>
              )}
            </Form.Group>
            <Modal show={show} onHide={handleClose} backdrop="static" >
              <Modal.Header closeButton>
                <Modal.Title>Términos y Condiciones</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5 className='text-primary'>Introducción</h5>
                Bienvenido a Alfajores Del Tucumán®. Al acceder y utilizar nuestro sitio web, aceptas estar sujeto a estos términos y condiciones.
                <hr />
                <h5 className='text-primary'>Información que Recopilamos</h5>
                Recopilamos la siguiente información personal: nombre, apellido, documento, correo electrónico y ubicación del usuario.
                <hr />
                <h5 className='text-primary'>Uso de la Información</h5>
                Utilizamos tu información personal para mejorar nuestro servicio, comunicarnos contigo y personalizar tu experiencia en nuestro sitio.
                <hr />
                <h5 className='text-primary'>Protección de Datos</h5>
                Implementamos medidas de seguridad para proteger tu información personal. Puedes acceder y modificar tu información contactándonos directamente.
                <hr />
                <h5 className='text-primary'>Divulgacón de Información</h5>
                No compartimos tu información personal con terceros, excepto cuando es necesario para cumplir con la ley o para proporcionar nuestros servicios.
                <hr />
                <h5 className='text-primary'>Derechos de los Usuarios</h5>
                Tienes el derecho de acceder, corregir y retirar tu consentimiento para el uso de tu información personal.
                <hr />
                <h5 className='text-primary'>Cookies y Tecnologías</h5>
                Utilizamos cookies para mejorar tu experiencia en nuestro sitio. Puedes gestionar las cookies a través de la configuración de tu navegador.
                <hr />
                <h5 className='text-primary'>Modificaciones de los Términos</h5>
                Nos reservamos el derecho a modificar estos términos y condiciones en cualquier momento. Te notificaremos sobre cualquier cambio importante.
                <hr />
                <h5 className='text-primary'>Limitación de Responsabilidad</h5>
                No nos hacemos responsables por cualquier daño que pueda resultar del uso de nuestro sitio web.
                <hr />
                <h5 className='text-primary'>Propiedad Intelectual</h5>
                Todos los contenidos de este sitio, incluyendo textos, gráficos, logos y software, son propiedad de NAHISA SRL.
                <hr />
                <h5 className='text-primary'>Juridiscción y Ley Aplicable</h5>
                Estos términos y condiciones se rigen por las leyes de [Jurisdicción].
                <hr />
                <h5 className='text-primary'>Contacto</h5>
                Si tienes alguna pregunta o inquietud sobre estos términos y condiciones, por favor contáctanos en alfajoresdeltucuman@hotmail.com.ar.
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
            <Button
              variant="warning"
              type="submit"
              className="btnRegister mt-3"
            >
              Registrarse
            </Button>
          </Form>
            <Row className="mt-4">
              <Col xs={12} md={10} lg={6} className="text-black">
                Ya tienes una cuenta?
              </Col>
              <Col xs={12} md={10} lg={6} className="text-md-right">
                <Link to="/login" className="text-dark iniciarSesion">
                  Iniciar sesión
                </Link>
              </Col>
            </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterUser;
