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
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <NavbarToggle aria-controls="navbar-nav" className="mb-3 mt-1" />
        <NavbarCollapse
          id="navbar-nav"
          className="jstify-content-end mb-1 mt-1"
        >
          <Nav className="ms-auto">
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
            {user.isAdmin && (
              <Button
                variant="outline-light"
                className="me-2"
                onClick={handleAdminPanel}
              >
                Admin
              </Button>
            )}
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}

export default UserNavbar;
