import React from 'react'


const DetallesProductosV1 = ({ producto }) => {
    return (
        <div>
            
            <h2>{producto.nombre}</h2>
            <p>Precio: ${producto.precio}</p>
            
        </div>
    )
}

export default DetallesProductosV1;
