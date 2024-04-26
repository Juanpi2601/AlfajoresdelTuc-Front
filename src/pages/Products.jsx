import React from 'react'
import PaginaProductos from '../components/paginaProductos/PaginaProductos';


const Products = () => {


    return (
        <>
        
            <div className='product-container'>
                
                
                <PaginaProductos
                    imagen="https://assets.elgourmet.com/wp-content/uploads/2023/03/cover_bpl03xf1vk_alfajores-marplatenses-juan-manuel-herrera-el-gourmet.jpg"
                    nombre="Alfajor x Ud."
                    precio="1000"
                />

                <PaginaProductos
                    imagen="https://acdn.mitiendanube.com/stores/001/274/874/products/productos-1024x1024-conito-x-40-gr1-558232b7cd33b49fe015961146800643-640-0.jpg"
                    nombre="Conito x 5 Uds."
                    precio="5000"
                />
                
                <PaginaProductos
                    imagen="https://www.alfajoresdeltucuman.com.ar/uploads/img/normales/b6ca2f858381d2dfc.jpg"
                    nombre="Bandeja de Nueces x 8 Uds."
                    precio="8000"
                />

            </div>
        </>
    )
};

export default Products;
