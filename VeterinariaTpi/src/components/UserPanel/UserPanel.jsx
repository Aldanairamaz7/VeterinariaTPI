import React, { useState } from "react";
import { userModel } from "../../data/userModel";
import { Col, Container, Row } from "react-bootstrap";
import PetCard from "../PetCard/PetCard";
import UserNavbar from "../UserNavbar/UserNavbar";
import Footer from "../Footer/Footer";
import AddPets from "../AddPets/AddPets";

function UserPanel() {
  const [user] = useState(userModel);

  return (
    <div id="userPanel" className="w-100 h-100">
      <UserNavbar user={user} />
      <Container className="user-panel mt-3 mb-4">
        <h3>{user.name}, tus mascotas:</h3>
        <Row>
          {user.pets.map((pet, idx) => (
            <Col key={idx} md={4}>
              <PetCard pet={pet} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default UserPanel;
