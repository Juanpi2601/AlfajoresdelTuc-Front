import React, { useState, useEffect } from "react";
import { Button, Table, Container, Row, Col} from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "../../api/axios"; 
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { alertCustom, alertConfirm } from '../../utils/alertCustom';


const PanelUserAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [changeFlag, setChangeFlag] = useState(false);

 
  const fetchData = async () => {
    try {
      const response = await axios.get(`/user/getAll`); 
      const filteredUsers = response.data.filter(user => user.role === 'client');
      setUsers(filteredUsers);
      setLoading(false);
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error al traer los usuarios.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (_id,userName) => {
    try {
      setIsLoading(true);
      alertConfirm(
        '¿Estas seguro?',
        `Estas por eliminar el usuario ${userName} de manera definitiva`,
        'warning',
        'Eliminar',
        async () => {
          await axios.delete(`user/delete/${_id}`);
          setUsers(users.filter(user => user.id !== user._id));
          fetchData();
        });
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error.', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchData()
  }, [changeFlag]);

  return (
    <Container className="justify-content-center">
      <h3 className="mt-5 mb-4 text-center">Administración de Usuarios</h3>
      <Row className="justify-content-center">
      <Col>
        {isLoading ? (
          <LoadingScreen />
        ) : users.length === 0 ? (
          <p className="text-center">No hay usuarios para mostrar</p>
        ) : (
          <>
            <Table striped bordered variant='dark' className="mt-3">
              <thead>
                <tr>
                  <th className="text-center"><b>Nombre y Apellido</b></th>
                  <th className="text-center"><b>DNI</b></th>
                  <th className="text-center"><b>Acciones</b></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={i}>
                    <td className="text-center">{user.name}</td>
                    <td className="text-center">{user.dni}</td>
                    <td className="text-center">
                      <Button variant='danger' size='sm' onClick={() => handleDeleteUser(user._id, user.name)}>
                        <DeleteIcon fontSize='small'/>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Col>
      </Row> 
    </Container>
  )
};

export default PanelUserAdmin;
