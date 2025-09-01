import React from 'react'
import { Container, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, NavLink, Nav } from 'react-bootstrap';
import vetIcon from '../../assets/logo.jpg';
import '../CustomNavbar/customNavbar.css'

function CustomNavbar() {
    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
            <Container>
                <NavbarBrand className='d-flex align-items-center'>
                    <img
                        className='logo'
                        src={vetIcon}
                        alt="veterinary icon"
                    />
                    <h1>VetCare</h1>
                </NavbarBrand>
                <NavbarToggle aria-controls='basic-navbar-nav' />
                <NavbarCollapse id='basic-navbar-nav'>

                    <Nav className="ms-auto">
                        <NavLink href="#inicio">Inicio</NavLink>
                        <NavLink href="#servicios">Servicios</NavLink>
                        <NavLink href="#contacto">Contacto</NavLink>
                        <NavLink href="#login">Iniciar Sesión</NavLink>
                    </Nav>

                </NavbarCollapse>
            </Container>
        </Navbar>
    )
}

export default CustomNavbar