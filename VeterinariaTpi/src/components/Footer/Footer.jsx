import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-1">
      <Container>
        <Row className="text-center text-md-center">
          <Col md={4}>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" />
              Zeballos 1341, Rosario - Santa Fe
            </p>
          </Col>
          <Col md={4}>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              info@vetcare.com
            </p>
          </Col>
          <Col md={4}>
            <p>
              <FontAwesomeIcon icon={faPhone} className="me-2" />
              341 - 555-0123
            </p>
          </Col>
        </Row>
        <hr className="border-light" />
        <p className="text-center mb-0">
          &copy; 2025 VetCare. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
