
import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';

const Categorias = ({ categoria, handleCategoriaSeleccionada }) => {
    const handleClick = (categoria) => {
        handleCategoriaSeleccionada(categoria);
    };

    return (
        <Dropdown className=''>
            <Dropdown.Toggle className='w-100 mx-1 my-1 border'  variant="light" id="dropdown-basic">
                Seleccionar Categoría
            </Dropdown.Toggle>

            <Dropdown.Menu className=''>
                {categoria.map((categoria, index) => (
                    <Dropdown.Item key={index} onClick={() => handleClick(categoria)}>
                        {categoria}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Categorias;
