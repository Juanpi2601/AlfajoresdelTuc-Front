import React, { useState, useEffect } from 'react';
import SectionNovedadV1 from '../components/Novedades/SectionNovedadV1';

const SectionNovedades = ({ novedades }) => {
  // Elimina la declaración de la variable novedades aquí
  const [novedadesState, setNovedadesState] = useState([]);

  useEffect(() => {
  
    const fetchNovedades = async () => {
      try {
        const response = await fetch('/api/novedad');
        const data = await response.json();
        setNovedadesState(data); // Cambia el estado de novedadesState en lugar de novedades
      } catch (error) {
        console.error('Error al obtener las novedades:', error);
      }
    };

    fetchNovedades();
  }, []);

  return (
    <>
      <SectionNovedadV1 novedades={novedadesState.filter(n => n.visible)} />
      <h1>Holaaa</h1>
    </>
  );
}

export default SectionNovedades;
