
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ContactModal({ show, onHide }) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Contacto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Teléfono: (123) 456-7890</p>
                <p>Correo: vetvare@hotmail.com</p>
                <p>Dirección: Avenida siempre viva 742, Sprinfield</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ContactModal;