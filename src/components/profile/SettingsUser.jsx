import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/UserContext";
import { passRegex } from "../../validation/registerValidation";
import axios from "../../api/axios";
import { alertCustom, alertConfirm, alertCustomWithTimerInterval } from '../../utils/alertCustom';
import { useNavigate } from "react-router-dom";
import LoadingScreen from '../loadingScreen/LoadingScreen';

const SettingsUserV1 = () => {
  const navigate = useNavigate();
  const { user, updatePassword, errors: updateErrors } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async (values) => {
    await updatePassword(values);
    reset();
  });

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      alertConfirm(
        '¿Estás seguro?',
        'Estás por eliminar tu cuenta de manera definitiva. Esta acción no se puede deshacer.',
        'warning',
        'Eliminar Cuenta',
        async () => {
          try {
            await axios.delete(`/user/delete/${user._id}`);
            alertCustomWithTimerInterval('¡Adiós!', 'Tu cuenta ha sido eliminada correctamente.', 'success', () => {
              navigate("/login");
              window.location.reload();
            });
          } catch (error) {
            alertCustom('Upps', 'Ha ocurrido un error al eliminar la cuenta.', 'error');
          } finally {
            setIsLoading(false);
          }
        }
      );
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error al eliminar la cuenta.', 'error');
      setIsLoading(false);
    }
  };

  return (
    <Container className="bg-white mt-5 w-75 border pt-5">
      <Row>
        <Col xs={12} md={6} className="mx-auto">
          {updateErrors && updateErrors.length > 0 && (
            <Alert variant="danger">
              {updateErrors}
            </Alert>
          )}
          <h3 className="text-black mt-3 pt-3">Actualizar Contraseña</h3>
          <Form onSubmit={onSubmit}>
            <Form.Group>
              <Form.Label htmlFor="currentPassword">Contraseña Actual</Form.Label>
              <Form.Control
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña Actual"
                className={errors.currentPassword ? "is-invalid" : ""}
                {...register("currentPassword", {
                  required: {
                    value: true,
                    message: "La contraseña actual es requerida",
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.currentPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="newPassword">Nueva Contraseña</Form.Label>
              <Form.Control
                id="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Nueva Contraseña"
                className={errors.newPassword ? "is-invalid" : ""}
                {...register("newPassword", {
                  required: {
                    value: true,
                    message: "La nueva contraseña es requerida",
                  },
                  pattern: {
                    value: passRegex,
                    message:
                      "La contraseña debe tener por lo menos una letra mayúscula, una minúscula, un caracter especial (ej:! - $). Debe tener una longitud entre 6 y 20 caracteres",
                  },
                  validate: (value) => {
                    if (value !== watch("currentPassword")) {
                      return true;
                    }
                    return "La nueva contraseña debe ser diferente a la actual";
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.newPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</Form.Label>
              <Form.Control
                id="confirmNewPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar Nueva Contraseña"
                className={errors.confirmNewPassword ? "is-invalid" : ""}
                {...register("confirmNewPassword", {
                  required: {
                    value: true,
                    message: "Debe confirmar la nueva contraseña",
                  },
                  validate: (value) => {
                    if (value === watch("newPassword")) {
                      return true;
                    }
                    return "Las contraseñas no coinciden";
                  },
                })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmNewPassword?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox1">
              <Form.Check
                className="text-black"
                type="checkbox"
                label="Mostrar contraseñas"
                onClick={togglePasswordVisibility}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              className="mb-5"
            >
              Actualizar Contraseña
            </Button>
          </Form>

          {user.role === 'client' && (
            <div className="pb-5">
              <h3 className="text-black">¿Deseas eliminar la cuenta?</h3>
              <Button
                variant="danger"
                onClick={handleDeleteAccount}
                disabled={isLoading}
              >
                Eliminar Cuenta
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsUserV1;
