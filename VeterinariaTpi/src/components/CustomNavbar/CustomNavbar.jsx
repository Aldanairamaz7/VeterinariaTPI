import React, { useState } from 'react'
import { Container, Navbar, NavbarBrand, NavbarCollapse, NavbarToggle, Nav,Button } from 'react-bootstrap';
import vetIcon from '../../assets/logo.jpg';
import '../CustomNavbar/customNavbar.css';
import { useNavigate } from 'react-router';
import ContactModal from '../ContactModal/ContactModal';
import { useAuth } from '../../Services/authContext/AuthContext';
import Profile from '../Profile/Profile';


function CustomNavbar() {
    const [showContact, setShowContact] = useState(false);
    const {token} = useAuth();

    const openContact = () => setShowContact(true);
    const closeContact = () => setShowContact(false);

    const navigate = useNavigate();
    const handleGoToRoot= () => {
        navigate("/");
    }
    const HandleScrollToServices = () => {
    const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
     };
    const handleLogin = () => {
        navigate("/login");
    }

    return (
    
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className='d-flex justify-content-between'>
            <Container >
                <NavbarBrand className='d-flex align-items-center' >
                    <img
                        className='logo'
                        src={vetIcon}
                        alt="veterinary icon"
                        onClick={handleGoToRoot}
                    />
                    <h1>VetCare</h1>
                </NavbarBrand>
                <NavbarToggle aria-controls='basic-navbar-nav' />
                <NavbarCollapse id='basic-navbar-nav' className="justify-content-end">
                  {token ? <Profile/> :   
                    <Nav className="ms-auto" >
                        <Button onClick={handleGoToRoot}>Inicio</Button>
                        <Button onClick={HandleScrollToServices}>Servicios</Button>
                        <Button onClick={openContact}>Contacto</Button>
                        <Button onClick={handleLogin}>Iniciar Sesion</Button>
                    </Nav>
                    }
                </NavbarCollapse>
            </Container>
            <ContactModal show={showContact} onHide={closeContact} />
        </Navbar> 
    )
}

export default CustomNavbar