import React from "react";
import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { useAuth } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SettingsIcon from '@mui/icons-material/Settings';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditNoteIcon from '@mui/icons-material/EditNote';

const ProfileUser = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  const dropdownItems = [
    { label: "Cerrar Sesión", action: cerrarSesion, icon: <LogoutIcon fontSize="small" /> }
  ];

  if (isAuthenticated && user) {
    if (user.role === "admin") {
      dropdownItems.unshift({ label: "Panel Usuarios", action: () => navigate("/admin/usuarios"), icon: <GroupIcon fontSize="small" /> });
      dropdownItems.unshift({ label: "Panel Productos", action: () => navigate("/admin/productos"), icon: <InventoryIcon fontSize="small" /> });
    } else if (user.role === "client") {
      dropdownItems.unshift({ label: "Configuración", action: () => navigate("/profile/settings"), icon: <SettingsIcon fontSize="small" /> });
      dropdownItems.unshift({ label: "Mis pedidos", action: () => navigate("/profile/myorders"), icon: <EditNoteIcon fontSize="small" /> });
      dropdownItems.unshift({ label: "Mis direcciones", action: () => navigate("/profile/mylocation"), icon: <LocationOnIcon fontSize="small" /> });
    }
  }

  return (
    <div>
      {isAuthenticated && user ? (
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
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {item.icon}
                        <span style={{ marginLeft: 8 }}>{item.label}</span>
                      </div>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      ) : (
        user?.role === "admin" && (
          <Button
            variant="secondary"
            size="sm"
            className="mt-1 text-light fw-semibold"
            onClick={() => navigate("/admin")}
          >
            Panel Admin
          </Button>
        )
      )}
    </div>
  );
};

export default ProfileUser;
