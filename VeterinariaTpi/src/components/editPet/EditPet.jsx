import { useEffect, useState } from "react";
import { Card, Col, Form, Row, Button, FormGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import {
  validateAddPetName,
  validatePetAge,
  validateBreed,
} from "../shared/validations.js";
import {
  errorToast,
  successToast,
} from "../shared/notifications/notifications.js";
import { useAuth } from "../../Services/authContext/AuthContext.jsx";

const EditPet = () => {
  const [petName, setPetName] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petImg, setPetImg] = useState("");
  const [errors, setErrors] = useState({});

  const { petId } = useParams();
  const idMascota = parseInt(petId);

  const { user, token, setUser } = useAuth();

  useEffect(() => {
    if (user && Array.isArray(user.pets)) {
      console.log(user);
      const pet = user.pets.find((pett) => pett.id == idMascota);
      console.log(pet);

      if (pet) {
        setPetName(pet.name || "");
        setPetAge(pet.age || "");
        setPetBreed(pet.breed || "");
        setPetImg(pet.imageURL || "");
      }
    }
  }, [user, petId]);

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
    const value = e.target.value;
    setPetImg(value);
  };

  const handleBackClick = () => {
    navigate("/userpanel");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = {
      petName: validateAddPetName(petName),
      petAge: validatePetAge(petAge),
      petBreed: validateBreed(petBreed),
    };

    setErrors(formErrors);

    const hasErrors = Object.values(formErrors).some((err) => err !== "");

    if (hasErrors) {
      errorToast("Hay alugunos campos incorrectos, revisalos.");
      return;
    }

    fetch("http://localhost:3000/editPets", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify({
        id: idMascota,
        name: petName,
        age: petAge,
        breed: petBreed,
        imageURL: petImg,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user);
        console.log(data);
        successToast(data.message);
        
      })
      .catch((err) => console.log(err));
    debugger;
  };

  return (
    <div>
      <div className="d-flex justify-content-start ms-3 mt-3">
        <Button variant="secondary" onClick={handleBackClick} className="m-2">
          Regresar
        </Button>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center mb-2">
        <Card>
          <Card.Body>
            <h2>Editar mascota</h2>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-5">
                    <Form.Label>Nombre:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      onChange={handleNameInput}
                      value={petName}
                      isInvalid={errors.petName}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.petName}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-5">
                    <Form.Label>Edad:</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Ingrese la edad"
                      onChange={handleAgeInput}
                      value={petAge}
                      isInvalid={errors.petAge}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {errors.petAge}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-5">
                    <Form.Label>Raza:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese la raza"
                      onChange={handleBreedInput}
                      value={petBreed}
                      isInvalid={errors.petBreed}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {errors.petBreed}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-5">
                    <Form.Label>Imagen: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese una url"
                      onChange={handlePetImg}
                      value={petImg}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center align-items-center gap-3">
                  <Button variant="primary" type="submit">
                    Confirmar
                  </Button>
                  <Button variant="danger">Eliminar mascota</Button>
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
