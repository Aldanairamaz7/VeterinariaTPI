import { useState } from "react";
import { Card, Col, Form, Row, Button, FormGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { validateAddPetName, validatePetAge, validateBreed } from "../shared/validations.js";


const EditPet = () => {
  const [petName, setPetName] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petImg, setPetImg] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleNameInput = (e) => {
    const value = e.target.value;
    setPetName(value);
    setErrors({
      ...errors,
      petName: validateAddPetName(value),
    });
  };


  const handleAgeInput = (e) => {
    const value = e.target.value;
    setPetAge(value);
    setErrors({
      ...errors,
      petAge: validatePetAge(value),
    });
  };

  const handleBreedInput = (e) => {
    const value = e.target.value;
    setPetBreed(value);
    setErrors({
      ...errors,
      petBreed: validateBreed(value),
    });
  };

  const handlePetImg = (e) => {
    const value = e.target.value
    setPetImg(value)
  }

  const handleBackClick = () => {
    navigate("/userpanel");
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    /* fetch("http://localhost:3000/editPets", {
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
      
      Esto lo vamos a manejar desde authContext
      */
  };


  return (
    <div>
      <div className="d-flex justify-content-start ms-3 mt-3">
        <Button variant="secondary" onClick={handleBackClick} className="m-2">
          Regresar
        </Button>
      </div>
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
                      onInvalid={errors.petName}
                    />
                  </FormGroup>
                  <Form.Control.Feedback type="invalid">
                    {errors.petName}
                  </Form.Control.Feedback>
                  <FormGroup className="mb-5">
                    <Form.Label>Edad:</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Ingrese la edad"
                      onChange={handleAgeInput}
                      value={petAge}
                      onInvalid={errors.petAge}
                    />
                  <Form.Control.Feedback type="invalid" style={{ whiteSpace: "pre-line" }}>
                    {errors.petAge}
                  </Form.Control.Feedback>
                  </FormGroup>
                  <FormGroup className="mb-5">
                    <Form.Label>Raza:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la raza"
                      onChange={handleBreedInput}
                      value={petBreed}
                      onInvalid={errors.petBreed}
                    />
                  </FormGroup>
                  <Form.Control.Feedback type="invalid" style={{ whiteSpace: "pre-line" }}> 
                  {errors.petBreed}
                  </Form.Control.Feedback>
                  <FormGroup className="mb-5"> 
                    <Form.Label>Imagen: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese una url"
                      onChange={handlePetImg}
                      value={petImg}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center align-items-center gap-3">
                  <Button variant="primary" type="submit">
                    Confirmar
                  </Button>
                  <Button variant="danger">
                    Eliminar mascota
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default EditPet;
