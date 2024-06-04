import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'

const TerminosYCondiconesV1 = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Términos y Condiciones</Modal.Title>
                </Modal.Header>
                <Modal.Body>1. Introducción
                    Bienvenido a Alfajores Del Tucumán®. Al acceder y utilizar nuestro sitio web, aceptas estar sujeto a estos términos y condiciones.

                    2. Información que Recopilamos
                    Recopilamos la siguiente información personal: nombre, apellido, documento, correo electrónico y ubicación del usuario.

                    3. Uso de la Información
                    Utilizamos tu información personal para mejorar nuestro servicio, comunicarnos contigo y personalizar tu experiencia en nuestro sitio.

                    4. Protección de Datos
                    Implementamos medidas de seguridad para proteger tu información personal. Puedes acceder y modificar tu información contactándonos directamente.

                    5. Divulgación de Información
                    No compartimos tu información personal con terceros, excepto cuando es necesario para cumplir con la ley o para proporcionar nuestros servicios.

                    6. Derechos de los Usuarios
                    Tienes el derecho de acceder, corregir y retirar tu consentimiento para el uso de tu información personal.

                    7. Cookies y Tecnologías Similares
                    Utilizamos cookies para mejorar tu experiencia en nuestro sitio. Puedes gestionar las cookies a través de la configuración de tu navegador.

                    8. Modificaciones de los Términos
                    Nos reservamos el derecho a modificar estos términos y condiciones en cualquier momento. Te notificaremos sobre cualquier cambio importante.

                    9. Limitación de Responsabilidad
                    No nos hacemos responsables por cualquier daño que pueda resultar del uso de nuestro sitio web.

                    10. Propiedad Intelectual
                    Todos los contenidos de este sitio, incluyendo textos, gráficos, logos y software, son propiedad de [Nombre de la Empresa].

                    11. Jurisdicción y Ley Aplicable
                    Estos términos y condiciones se rigen por las leyes de [Jurisdicción].

                    12. Contacto
                    Si tienes alguna pregunta o inquietud sobre estos términos y condiciones, por favor contáctanos en alfajoresdeltucuman@hotmail.com.ar.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default TerminosYCondiconesV1