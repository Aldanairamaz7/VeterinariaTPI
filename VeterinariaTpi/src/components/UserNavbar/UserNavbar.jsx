import {
  faGear,
  faRightFromBracket,
  faUserTie,
  faPaw,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavbarCollapse,
  NavbarToggle,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { useAuth } from "../../Services/authContext/AuthContext";

const UserNavbar = () => {
  const { userLogout, user } = useAuth();
  const navigate = useNavigate();

  const handleAddPetClick = () => {
    navigate("/addpets");
  };

  const handleEditProfile = () => {
    navigate(`/editarperfil/${user.id}`);
  };

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };
  const handleAdminPanel = () => {
    navigate("/adminpanel");
  };
  const handleVeterinaryPanel = () => {
    navigate(`/veterinarian/${user.id}/shifts`);
  };

  const handleShiftHistory = () => {
    navigate(`/${user.id}/misturnos`);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <NavbarToggle aria-controls="navbar-nav" className="mb-3 mt-1" />
        <NavbarCollapse
          id="navbar-nav"
          className="jstify-content-end mb-1 mt-1"
        >
          <Nav className="ms-auto">
            {user.idRole !== 2 && (
              <Button
                variant="outline-light"
                className="me-2"
                onClick={handleShiftHistory}
              >
                <FontAwesomeIcon icon={faCalendarDays} />
                Mis turnos
              </Button>
            )}
            <Button
              variant="outline-light"
              className="me-2"
              onClick={handleAddPetClick}
            >
              <FontAwesomeIcon icon={faPaw} />
              Agregar mascota
            </Button>
            <Button
              variant="outline-light"
              className="me-2"
              onClick={handleEditProfile}
            >
              <FontAwesomeIcon icon={faGear} className="me-2" />
              Editar Perfil
            </Button>

            {user.idRole === 3 && (
              <Button
                variant="outline-light"
                className="me-2"
                onClick={handleAdminPanel}
              >
                <FontAwesomeIcon icon={faUserTie} />
                Panel de administrador
              </Button>
            )}
            {user.idRole === 2 && (
              <Button
                variant="outline-light"
                className="me-2"
                onClick={handleVeterinaryPanel}
              >
                Panel Veterinario
              </Button>
            )}
            <Button
              variant="outline-light"
              className="me-2"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
              Cerrar Sesion
            </Button>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
