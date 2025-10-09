import { Button, Card } from "react-bootstrap";
import ConfirmDeleteModal from "../confirmDeleteModal/ConfirmDeleteModal";
import { useState } from "react";
import { useAuth } from "../../Services/authContext/AuthContext";
import "../UserCard/UserCard.css";
import { useNavigate } from "react-router";

const UserCard = ({ firstname, lastname, dni, email, id, pets }) => {
  const [showModal, setShowModal] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  const handleConfirmDelete = () => {
    setShowModal(!showModal ? true : false);
  };

  const handleDeleteUser = () => {
    fetch("http://localhost:3000/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data.message))
      .catch((err) => console.log(err));
    setShowModal();
  };

  const handleGoUserPets = () => {
    navigate("/adminpanel/users/pets", {
      state: {
        pets,
      },
    });
  };
  return (
    <>
      <Card className="d-flex flex-row m-3">
        <Card.Body>
          <Card.Title>
            {firstname} {lastname}
          </Card.Title>
          <Card.Subtitle style={{ lineHeight: "1.8" }}>
            DNI: {dni}
            <br />
            Email: {email}
          </Card.Subtitle>
        </Card.Body>
        <div className="d-flex flex-row align-items-center">
          <Button variant="success" onClick={handleGoUserPets}>
            Ver Mascotas
          </Button>
          <Button>Modificar usuario</Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Elimitar usuario
          </Button>
        </div>
      </Card>

      <ConfirmDeleteModal
        show={showModal}
        onClose={handleConfirmDelete}
        onConfirm={handleDeleteUser}
        petName={firstname}
      />
    </>
  );
};

export default UserCard;
