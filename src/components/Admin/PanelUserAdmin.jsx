import React, { useState, useEffect } from "react";
import { Button, Table, Container, Row, Col } from "react-bootstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "../../api/axios"; 
import LoadingScreen from "../loadingScreen/LoadingScreen";
import { alertCustom, alertConfirm } from '../../utils/alertCustom';
import PaginationRounded from "../pagination/Pagination"; 

const PanelUserAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [changeFlag, setChangeFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); 

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

  const handleDeleteUser = async (_id, userName) => {
    try {
      setIsLoading(true);
      alertConfirm(
        '¿Estás seguro?',
        `Estás por eliminar el usuario ${userName} de manera definitiva`,
        'warning',
        'Eliminar',
        async () => {
          await axios.delete(`user/delete/${_id}`);
          const totalPagesAfterDelete = Math.ceil((users.length - 1) / itemsPerPage);
          const newCurrentPage = Math.min(currentPage, totalPagesAfterDelete); 
          setCurrentPage(newCurrentPage);
          setChangeFlag(!changeFlag);
        }
      );
    } catch (error) {
      alertCustom('Upps', 'Ha ocurrido un error.', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchData()
  }, [changeFlag]);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

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
            <Table striped bordered className="mt-3" style={{ backgroundColor: '#F2F2F2' }}>
              <thead>
                <tr>
                  <th className="text-center"><b>Nombre y Apellido</b></th>
                  <th className="text-center"><b>DNI</b></th>
                  <th className="text-center"><b>Acciones</b></th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, i) => (
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <PaginationRounded count={totalPages} onChange={handleChangePage} />
            </div>
          </>
        )}
      </Col>
      </Row> 
    </Container>
  )
};

export default PanelUserAdmin;
