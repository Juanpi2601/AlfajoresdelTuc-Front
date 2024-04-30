import React from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const ProfileUser = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  const dropdownItems = [
    { label: "Cerrar Sesión", action: cerrarSesion }
  ];

  if (isAuthenticated && user && user.role === "admin") {
    dropdownItems.unshift({ label: "Administrador", action: () => navigate("/admin") });
  }

  if (isAuthenticated && user && user.role === "client") {
    dropdownItems.unshift({ label: "Panel de Cliente", action: () => navigate("/cliente") });
  }

  return (
    <div>
      {isAuthenticated && user ? (
        <>
          <Container>
            <Row>
              <Col className="cardProfile">
                <Dropdown>
                  <Dropdown.Toggle style={{ backgroundColor: 'transparent', border: 'none', color: 'black' }} className="p-0 mx-2" id="dropdown-basic">
                    {user.role === "admin" ? (
                      <ManageAccountsIcon fontSize="large" />
                    ) : (
                      <PersonAddAlt1Icon fontSize="large" />
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {dropdownItems.map((item, index) => (
                      <Dropdown.Item key={index} onClick={item.action}>
                        {item.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Container>
        </>
      ) : null}
    </div>
  );
};

export default ProfileUser;


