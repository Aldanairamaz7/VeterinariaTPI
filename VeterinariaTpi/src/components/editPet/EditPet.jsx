import { useState } from "react";
import { Card, Col, Form, Row, Button, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router";

const EditPet = () => {
  const [petName, setPetName] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petBreed, setPetBreed] = useState("");

  const navigate = useNavigate();

  const handleNameInput = (e) => {
    setPetName(e.target.value);
  };

  const handleAgeInput = (e) => {
    setPetAge(e.target.value);
  };

  const handleBreedInput = (e) => {
    setPetBreed(e.target.value);
  };

  const handleBackClick = () => {
    navigate("/userpanel");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/editPets", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        name,
        age,
        breed,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Card>
        <Card.Body>
          <h2>Editar mascota</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FormGroup className="mb-5">
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre"
                    onChange={handleNameInput}
                    value={petName}
                  />
                </FormGroup>
                <FormGroup className="mb-5">
                  <Form.Label>Edad:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese la edad"
                    onChange={handleAgeInput}
                    value={petAge}
                  />
                </FormGroup>
                <FormGroup className="mb-5">
                  <Form.Label>Raza:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese la raza"
                    onChange={handleBreedInput}
                    value={petBreed}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center align-items-center gap-3">
                <Button variant="secondary" onClick={handleBackClick}>
                  Regresar
                </Button>
                <Button variant="primary" type="submit">
                  Confirmar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditPet;
