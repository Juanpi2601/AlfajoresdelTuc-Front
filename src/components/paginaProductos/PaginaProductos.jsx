import React from 'react';
import {Link , useNavigate } from 'react-router-dom';
import './paginaProductos.css'; 


const PaginaProductos = ({imagen , nombre , precio}) => {
    

  return( 
    <>
    <div className="product-card bg-white">
      <img src={imagen} alt={nombre} className="product-image" />
      <div className="product-details">
        <h2 className="product-name">{nombre}</h2>
        <p className="product-price">${precio}</p>
        <div className="product-buttons">
          <button className="add-to-cart-btn">Agregar al carrito</button>
          <button className='buy-btn mx-2'>Comprar</button>
        </div>
      </div>
    </div>
    </>
    )
}

export default PaginaProductos