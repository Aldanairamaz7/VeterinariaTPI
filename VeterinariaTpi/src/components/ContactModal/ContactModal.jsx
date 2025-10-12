
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { PrefetchPageLinks } from 'react-router';

function ContactModal({ show, onHide }) {

    return (

        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton className='bg-primary text-white border-0'>
                <Modal.Title>Contacto</Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-ligth'>
                <p className='mb-2'>Teléfono: (341) 555-0123</p>
                <p className='mb-2'>Correo: info@vetcare.com</p>
                <p className='mb-0'>Dirección: Zeballos 1341, Rosario - Santa Fe</p>
            </Modal.Body>
            <Modal.Footer className='bg-ligth border-0'>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ContactModal;