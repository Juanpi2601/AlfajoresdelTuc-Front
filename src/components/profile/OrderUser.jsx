import React from 'react'
import { Link } from 'react-router-dom';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const OrderUserV1 = () => {
  return (
    <div>
      <Link to="/profile" style={{ textDecoration: 'none' }}>
      <ArrowCircleLeftIcon fontSize='large' style={{ color: 'black' }}/>
      </Link>
      <div>
        Mis pedidos
      </div>
    </div>
  )
}

export default OrderUserV1
