import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import PetCard from "../PetCard/PetCard";
import { Col, Container, Row } from "react-bootstrap";

const AdminUserPetView = () => {
  const [pets, setPets] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setPets(location.state.pets);
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
