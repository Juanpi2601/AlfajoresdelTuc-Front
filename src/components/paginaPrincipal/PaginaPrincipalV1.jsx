import React from 'react'
import '../paginaPrincipal/paginaPrincipal.css'
import { Container, Row } from 'react-bootstrap'
import NavBarV1 from '../NavBarV1/NavBarV1'

const PaginaPrincipalV1 = () => {
  return (
    <>
    <Container>
      <NavBarV1/>
        <Row>
            <div className='div1 text-center'>Alfajores Del Tucumán</div>
        </Row>
    </Container>
    
    </>
  )
}

export default PaginaPrincipalV1