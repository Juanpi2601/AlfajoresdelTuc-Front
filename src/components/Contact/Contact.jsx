import React, {useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";
import { alertCustom } from "../../utils/alertCustom";
import axios from '../../api/axios';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
        setIsLoading(true);
        await axios.post('/sendmail', data);
        alertCustom('Consulta registrada', 'Su consulta fue registrada', 'success');
        reset();
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alertCustom('Error', 'Hubo un error al enviar el formulario', 'error');
    } finally {
        setIsLoading(false);
    }
};


  return (
    <Container fluid className="mt-2">
      <h1 className="text-center contacto">Contacto</h1>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <div className="mapa embed-responsive embed-responsive-1by1">
            <iframe
              title="mapa"
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d33870.857204343265!2d-65.22125404118867!3d-26.832467319685865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sAlfajores%20Del%20Tucuman!5e0!3m2!1ses!2sar!4v1714999631368!5m2!1ses!2sar"
              style={{ width: "100%", height: "100%" }}
            ></iframe>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6} lg={4}>
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
              <div className="mb-3">
                <textarea
                  placeholder="Mensaje"
                  maxLength={100}
                  className={`form-control ${errors?.mensaje ? "is-invalid" : ""}`}
                  {...register("mensaje", { required: "Mensaje es requerido" })}
                ></textarea>
                {errors?.mensaje && <div className="invalid-feedback">{errors.mensaje.message}</div>}
              </div>
              {isLoading && <LoadingScreen />}
              <button  type="submit" className="btn btn-warning btnEnviarCont">
                Enviar
              </button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;