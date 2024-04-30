import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import LoginV1 from "../login/LoginV1";

const ProfileUser = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };


  return (
    <div>
      {isAuthenticated && user ? (
        <>
          <Container>
            <Row>
              <Col className="cardProfile">
              </Col>
            </Row>
          </Container>
          <Button
            size=""
            className="p-0 mx-3"
            onClick={cerrarSesion}
            style={{ backgroundColor: 'transparent', border: 'none' }}
          >
            <LogoutIcon fontSize="large" style={{ color: 'black'}}/>
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default ProfileUser;
