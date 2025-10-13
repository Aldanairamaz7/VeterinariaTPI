import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import PetCard from "../PetCard/PetCard";
import { Col, Container, Row } from "react-bootstrap";
import { useAdmin } from "../../Services/adminContext/AdminContext";

const AdminUserPetView = () => {
  const { pets, setPets } = useAdmin();
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);

    setPets([...location.state.pets]);
  }, []);

  return (
    <div>
      <Container className="mt-3 mb-4">
        <Row>
          {pets.map((el) => (
            <Col key={el.id} md={4}>
              <PetCard pet={el} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AdminUserPetView;
