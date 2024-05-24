import React, {useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import { alertCustom } from "../../utils/alertCustom";
import axios from '../../api/axios';

const RecoverPassword = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
        setIsLoading(true);
        await axios.post('/sendmail/forgot-password', data);
        alertCustom('Consulta registrada', 'Su consulta fue registrada', 'success');
        navigate("/login");
        reset();
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alertCustom('Error', 'Hubo un error al enviar el formulario', 'error');
    } finally {
        setIsLoading(false);
    }
};

  return (
    <Container className="mt-2 w-75">
      <h1 className="text-center contacto">Recuperar Contraseña</h1>
      <Row className="justify-content-center mt-5">
        <Col xs={12}>
          <div className="formulario-contacto">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <input
                  placeholder="Nombre y Apellido"
                  type="text" 
                  className={`form-control ${errors?.name ? "is-invalid" : ""}`}
                  {...register("name", {
                    required: "Nombre y Apellido son requeridos",
                    pattern: {
                      value: /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(?: [A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+)?$/, 
                      message: "El nombre y apellido deben empezar con mayúscula"
                    }
                  })}
                />
                {errors?.name && <div className="invalid-feedback">{errors.name.message}</div>}
              </div>
              <div className="mb-3">
                <input
                  placeholder="Email"
                  type="email"
                  className={`form-control ${errors?.email ? "is-invalid" : ""}`}
                  {...register("email", { 
                    required: "Email es requerido",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Dirección de correo electrónico inválida"
                    }
                  })}
                />
                {errors?.email && <div className="invalid-feedback">{errors.email.message}</div>}
              </div>
              {isLoading && <LoadingScreen />}
              <button type="submit" className="btn btn-primary btnEnviarCont">
                Enviar
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RecoverPassword;