import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditNoteIcon from '@mui/icons-material/EditNote';

const UserEdit = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={4} md={12}>
          <NavLink to="/profile/settings">
            <SettingsIcon fontSize="large" style={{ fontSize: 64 }} />
            <p>Configuración</p>
          </NavLink>
        </Col>
        <Col xs={4} md={4}>
          <NavLink to="/profile/mylocation">
            <LocationOnIcon fontSize="large" style={{ fontSize: 64 }} />
            <p>Mis direcciones</p>
          </NavLink>
        </Col>
        <Col xs={4} md={4}>
          <NavLink to="/profile/myorders">
            <EditNoteIcon fontSize="large" style={{ fontSize: 64 }} />
            <p>Mis pedidos</p>
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
}

export default UserEdit;
