import React from 'react';
import { Col, Container, Form, Row, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const LoginV1 = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

	const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <Container className="bg-white mt-5 w-75 border py-5">
      <Row >
        <Col xs={6} className='mx-auto'>
          {/* {signinErrors.map((error, i) => (
            <Alert key={i} variant="danger">
              {error}
            </Alert>
          ))} */}
          <h3 className="text-black mb-5">Iniciar sesión</h3>
          <Form  onSubmit={onSubmit}>
            <Form.Group >
              <Form.Label  htmlFor="email"></Form.Label>
              <Form.Control
                type="text"
                id="email"
                placeholder="Email"
                className={` ${errors.email?.message ? "is-invalid" : ""}`} 
                {...register("email", {
                  required: {
                    value: true,
                    message: "El email es requerido",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group >
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password"></Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder="Contraseña"
                className={errors.password?.message ? "is-invalid" : ""}
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es requerida",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                className="text-black"
                type="checkbox"
                label="Mostrar contraseña"
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="btnLogin mt-4">
              Iniciar sesión
            </Button>
          </Form>
          <p className="mt-2 d-flex justify-content-between text-black">
            Todavia no tienes cuenta?
            <Link to="/register" className="btnReg">
              Registrate
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginV1;