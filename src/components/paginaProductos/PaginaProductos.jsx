import React from 'react';
import {Link , useNavigate } from 'react-router-dom';
import './paginaProductos.css'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


const PaginaProductos = ({imagen , nombre , precio}) => {
    

  return( 
    <>
    
    
    <div className="product-card bg-white">
    
      <img src={imagen} alt={nombre} className="product-image" />
      <div className="product-details">
        <h2 className="product-name">{nombre}</h2>
        <p className="product-price">${precio}</p>
        <div className="product-buttons">
          <button className="add-to-cart-btn" data-text= "Agregar al Carrito"> <ShoppingCartIcon/> </button>
          <button className='favorite-btn mx-2' data-text= "Agregar a Favoritos"> <FavoriteBorderIcon/> </button>
        </div>
      </div>
    </div>
    </>
    )
}

export default PaginaProductos;