import React, { useEffect } from 'react';
import { Col, Container, Form, Row, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import PassText from '../passText/PassText';
// import LoginGoogle from './LoginGoogle';

const LoginV1 = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);
  
	const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <Container className="bg-white mt-5 w-75 border py-5" >
      <Row className="justify-content-center">
        <Col  xs={12} md={6} lg={6}>
        {signinErrors && signinErrors.map((error, i) => (
          <Alert key={i} variant="danger">
            {error}
          </Alert>
        ))}
          <h3 className="text-black mb-5 text-center">Iniciar sesión</h3>
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
                onClick={PassText}
                type="checkbox"
                label="Mostrar contraseña"
              />
            </Form.Group>
            {/* <p>o</p>
            <LoginGoogle/> */}
           <div>
              <Button variant="warning" type="submit" className="btnLogin mt-2">
                Iniciar sesión
              </Button>
              <Link to="/forgot-password" className="text-black mt-3 d-block">¿Olvidaste tu contraseña?</Link>
            </div>
          </Form>
          <Row className="mt-3">
            <Col xs={12} md={12} lg={6} className="text-black">
              Todavía no tienes cuenta?
            </Col>
            <Col xs={12} md={12} lg={6} className="text-md-right">
              <Link to="/register" className="btnReg text-dark">
                Regístrate
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginV1;