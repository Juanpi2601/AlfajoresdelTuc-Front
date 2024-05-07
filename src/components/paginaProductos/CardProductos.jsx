import React from "react";
import { useAuth } from "../../context/UserContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { alertAdd } from "../../utils/alertCustom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';

const CardProductos = ({ formData }) => {
  const { addToCart } = useAuth();

  const handleAddToCart = (productc) => {
    addToCart(producto);
    alertAdd("top-end", "success", "Su pedido fue agregado al carrito");
  };

  return (
    <Container>
      <Row>
        {formData.map((producto, i) =>
        (
          <Col key={producto._id} xs={12} sm={6} md={6} lg={4} xl={3}>
            <Card className="cardProduct my-4 mx-4 ">
              <Card.Img className="imgCard" variant="top" src={producto.imagenUrl} alt={producto.imagenUrl} />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="nameProduct text-center">{producto.nombre}</Card.Title>
                <div className="d-flex flex-column">
                  <Card.Title className="priceProduct text-center">$ {producto.precio}</Card.Title>
                  <div className="product-buttons d-flex ">
                    <Button
                      className="btnAddCart mx-2 text-center"
                      data-text="Agregar al Carrito"
                      onClick={() => handleAddToCart(producto)}>
                      <ShoppingCartIcon ></ShoppingCartIcon>
                    </Button>
                    <Button 
                    className="btnVisibility" 
                    data-text="Ver Más">
                      <VisibilityIcon ></VisibilityIcon>
                    </Button>
                  </div>

                </div>
              </Card.Body>
            </Card>
          </Col>
        )
        )}
      </Row>
    </Container>
  );
};

export default CardProductos;