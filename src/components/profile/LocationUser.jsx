import React from 'react';
import { Link } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const LocationUserV1 = () => {
  return (
    <div>
      <Link to="/profile" style={{ textDecoration: 'none' }}>
        <ArrowCircleLeftIcon fontSize='large' style={{ color: 'black' }}/>
      </Link>
      <div>
        Mis direcciones
      </div>
    </div>
  );
};

export default LocationUserV1;
