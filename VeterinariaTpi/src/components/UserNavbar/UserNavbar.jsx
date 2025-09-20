import { faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Container, Nav, Navbar, NavbarCollapse, NavbarText, NavbarToggle } from "react-bootstrap"
import { useNavigate } from "react-router"

function UserNavbar({ user }) {

    const navigate = useNavigate();

    const handleAddPetClick = () => {
        navigate("/addpets");
    }

    const handleEditProfile = () => {
        navigate("/editarperfil")
    }

    return (
        <Navbar bg="dark" variant="dark" expand='lg'>
            <Container>
                <NavbarText className="text-white">Bienvenido {user.name}.</NavbarText>
                <NavbarToggle aria-controls="navbar-nav" className="mb-3 mt-1" />
                <NavbarCollapse id="navbar-nav" className="jstify-content-end mb-1 mt-1" >
                    <Nav className="ms-auto">

                        <Button variant="outline-light" className="me-2" onClick={handleAddPetClick}>Agregar mascota</Button>
                        <Button variant="outline-light" className="me-2" onClick={handleEditProfile}>
                            <FontAwesomeIcon icon={faGear} className="me-2" />
                            Editar Perfil</Button>
                        <Button variant="outline-light" className="me-2">
                            <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
                            Cerrar Sesion</Button>
                    </Nav>
                </NavbarCollapse>
            </Container>
        </Navbar>
    )
}

export default UserNavbar