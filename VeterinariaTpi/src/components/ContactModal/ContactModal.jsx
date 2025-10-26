import React from "react";
import { Modal, Button } from "react-bootstrap";
import { PrefetchPageLinks } from "react-router";

const ContactModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="bg-primary text-white border-0">
        <Modal.Title>Contacto</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-ligth">
        <p className="mb-2">
          <strong>Teléfono:</strong> (341) 555-0123
        </p>
        <p className="mb-2">
          <strong>Correo:</strong> info@vetcare.com
        </p>
        <p className="mb-3">
          <strong>Dirección:</strong> Zeballos 1341, Rosario - Santa Fe
        </p>
        <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.2!2d-60.6393!3d-32.9468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab1b0f3e7d3b%3A0x1234567890abcdef!2sZeballos%201341%2C%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1234567890123!5m2!1ses!2sar"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de VetCare"
            style={{ border: 0 }}
          ></iframe>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-ligth border-0">
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContactModal;
