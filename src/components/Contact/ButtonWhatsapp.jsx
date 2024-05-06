import React from 'react'
import { Container } from 'react-bootstrap'



const ButtonWhatsapp = () => {
  return (
    <Container>
        <div className="position-fixed bottom-0 end-0 m-5">
            <a href="https://api.whatsapp.com/send?phone=5493813257054&text=¡Hola! Me encantaría obtener más información sobre sus productos/servicios. ¿Podría ayudarme?" target="_blank" rel="noopener noreferrer">
                <img src="/src/assets/iconoWhatsapp.gif" type="gif" alt="WhatsApp" style={{ width: '4rem', height: '4rem', cursor: 'pointer'}} className="wp" />
            </a>
        </div>
    </Container>
  )
}

export default ButtonWhatsapp