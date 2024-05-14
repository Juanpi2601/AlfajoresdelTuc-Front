import React from 'react'
import { Link } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const SettingsUserV1 = () => {
  return (
    <div>
      <Link to="/profile" style={{ textDecoration: 'none' }}>
      <ArrowCircleLeftIcon fontSize='large' style={{ color: 'black' }}/>
      </Link>
      <div>
        Configuracion
      </div>
    </div>
  )
}

export default SettingsUserV1
