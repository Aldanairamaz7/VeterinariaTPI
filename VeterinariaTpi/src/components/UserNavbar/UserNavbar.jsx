import { faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
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

function UserNavbar() {
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
    navigate("/panelveterinario");
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
            {user.idRole === 1 && (
                <Button
                  variant="outline-light"
                  className="me-2"
                  onClick={handleShiftHistory}
                >
                  Mis turnos
                </Button>
              )}
            <Button
              variant="outline-light"
              className="me-2"
              onClick={handleAddPetClick}
            >
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

            <Button
              variant="outline-light"
              className="me-2"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
              Cerrar Sesion
            </Button>
            {user.idRole === 3 && (
              <Button
                variant="outline-light"
                className="me-2"
                onClick={handleAdminPanel}
              >
                Admin
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
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}

export default UserNavbar;
