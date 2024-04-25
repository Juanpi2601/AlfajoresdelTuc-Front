import React from 'react'
import '../paginaPrincipal/paginaPrincipal.css'
import { Container, Row } from 'react-bootstrap'
import NavBarV1 from '../NavBarV1/NavBarV1'

const PaginaPrincipalV1 = () => {
  return (
    <>
    <Container fluid className='div1'>
      <NavBarV1/>
    </Container>
    
    </>
  )
}

export default PaginaPrincipalV1