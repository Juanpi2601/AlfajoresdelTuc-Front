import React from 'react'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate()
  return (
    <Button variant="link" onClick={() => navigate("/admin/usuarios")} className="m-5">
      Panel de Usuarios
    </Button>
  )
}

export default Admin