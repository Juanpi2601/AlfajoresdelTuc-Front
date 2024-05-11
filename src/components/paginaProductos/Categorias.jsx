import React from 'react';
import { Button } from 'react-bootstrap';

const Categorias = ({ categoria, handleCategoriaSeleccionada }) => {
    const handleClick = (categoria) => {
        handleCategoriaSeleccionada(categoria);
    };

    return (
        <div className='d-flex justify-content-center'>
            
            {categoria.map((categoria, index) => (
                
                <Button className=' mx-1 w-100 bg-warning border-warning text-dark ' key={index} onClick={() => handleClick(categoria)}>
                    {categoria}
                </Button>
            ))}
        </div>
    );
};

export default Categorias;
