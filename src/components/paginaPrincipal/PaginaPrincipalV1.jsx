import React from 'react';
import { Container, Row } from 'react-bootstrap';
import NavBarV1 from '../NavBarV1/NavBarV1';
import PaginaProductos from '../paginaProductos/PaginaProductos'


const PaginaPrincipalV1 = () => {
  return (
    <>
      <Container>
        <NavBarV1 />
        <Row>
          <div className='div1 text-center'>Alfajores Del Tucumán</div>
        </Row>
        
          <div className='product-container'>
            <PaginaProductos
              imagen="https://assets.elgourmet.com/wp-content/uploads/2023/03/cover_bpl03xf1vk_alfajores-marplatenses-juan-manuel-herrera-el-gourmet.jpg"
              nombre="alfajor"
              precio="3000" />
            <PaginaProductos
              imagen="https://acdn.mitiendanube.com/stores/001/274/874/products/productos-1024x1024-conito-x-40-gr1-558232b7cd33b49fe015961146800643-640-0.jpg"
              nombre="conito"
              precio="2000"/>

            <PaginaProductos
              imagen = ""
              nombre = ""
              precio = ""
            />
        </div>
        



      </Container>
    <Container fluid className='div1'>
      <NavBarV1/>
    </Container>

    </>
  )
}

export default PaginaPrincipalV1