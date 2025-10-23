import { useEffect, useState } from "react";
import { Button, Card, Col, Row, Form, FormLabel } from "react-bootstrap";
import { useNavigate } from "react-router";
import {
  validateAddPetName,
  validatePetAge,
  validateBreed,
  validateTypePet,
  validateOtherType,
  validateOtherBreed,
} from "../shared/validations.js";
import { errorToast } from "../shared/notifications/notifications.js";
import { useAuth } from "../../Services/authContext/AuthContext.jsx";

export const AddPets = () => {
  const [petName, setPetName] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petImageURL, setPetImageURL] = useState("");
  const [errors, setErrors] = useState({});
  const [typePet, setTypePet] = useState([]);
  const [typePetSelect, setTypePetSelect] = useState(-1);
  const [otherType, setOtherType] = useState("");
  const [breed, setBreed] = useState([]);
  const [breedSelect, setBreedSelect] = useState(-1);
  const [otherBreed, setOtherBreed] = useState("");

  const { addPet, token } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/addpets", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTypePet(data.typePet || []);
        setBreed(data.breed || []);
      })
      .catch((err) => console.log(err));
  }, []);

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
  const handleTypePetsSelect = (e) => {
    const value = Number(e.target.value);
    setTypePetSelect(value);
    setErrors({ ...errors, typePet: validateTypePet(value) });
  };
  const handleOtherType = (e) => {
    const value = e.target.value;
    setOtherType(value);
    setErrors({ ...errors, otherType: validateOtherType(value) });
  };
  const handleBreed = (e) => {
    const value = Number(e.target.value);
    setBreedSelect(value);
    setErrors({...errors, breed: validateBreed(value)});
  };
  const handleOtherBreed = (e) => {
    const value = (e.target.value);
    setOtherBreed(value);
    setErrors({...errors, otherBreed: validateOtherBreed});
  }

  const handleBreedInput = (e) => {
    const value = e.target.value;
    setPetBreed(value);
    setErrors({
      ...errors,
      petBreed: validateBreed(value),
    });
  };

  const handleImageURLInput = (e) => {
    const value = e.target.value;
    setPetImageURL(value);
  };

  const handleBackClick = () => {
    navigate("/userpanel");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {
      petName: validateAddPetName(petName),
      petAge: validatePetAge(petAge),
      petBreed: validateBreed(petBreed),
    };

    setErrors(formErrors);

    const hasErrors = Object.values(formErrors).some((err) => err !== "");

    if (hasErrors) {
      errorToast("Hay algunos campos incorrectos, revisalos.");
      return;
    }

    const petData = {
      name: petName,
      age: parseInt(petAge),
      breed: petBreed,
      imageURL: petImageURL,
    };

    try {
      await addPet(petData);
      setPetName("");
      setPetAge("");
      setPetBreed("");
      setPetImageURL("");
      navigate("/userpanel");
    } catch (err) {
      errorToast(err.message || "No se pudo agregar mascota.");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Card className="mt-1 mb-1">
        <Card.Body>
          <h2>Añade a tu mascota</h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-5 mt-4">
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
                    placeholder="Ingrese su edad"
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
                  <Form.Label>Tipo de Mascota:</Form.Label>
                  <Form.Select
                    aria-label="Seleccione tipo de mascota"
                    onChange={handleTypePetsSelect}
                    value={typePetSelect}
                    isInvalid={errors.typePetSelect}
                  >
                    <option value={-1}>Seleccione la especie</option>
                    {typePet.map((el) => {
                      return (
                        <option key={el.idType} value={el.Type}>
                          {el.typePetName}
                        </option>
                      );
                    })}
                    <option value={0}>Otra</option>
                  </Form.Select>
                  <Form.Control.Feedback type=""> </Form.Control.Feedback>
                </Form.Group>
                {typePetSelect === 0 && (
                  <Form.Group className="mb-5">
                    <Form.Label> Especifique la especie:</Form.Label>
                    <Form.Control
                      type="text"
                      aria-label="especifique la especie"
                      onChange={handleOtherType}
                      value={otherType}
                      isInvalid={errors.otherType}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.petName}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
                <Form.Group className="mb-5">
                  <Form.Label>Raza: </Form.Label>
                  <Form.Select
                    aria-label="Seleccione raza"
                    onChange={handleBreed}
                    value={breedSelect}
                    isInvalid={errors.breedSelect}
                  >
                    <option value={-1}>Seleccione la raza</option>
                    {breed.map((el) => {
                      return (
                        <option key={el.idBreed} value={el.idBreed}>
                          {el.nameBreed}
                        </option>
                      )
                    })}
                    <option value={0}>Otra</option>
                  </Form.Select>
                  <Form.Control.Feedback type=""> </Form.Control.Feedback>
                </Form.Group>
                     {breedSelect === 0 && (
                  <Form.Group className="mb-5">
                    <Form.Label> Especifique la raza:</Form.Label>
                    <Form.Control
                      type="text"
                      aria-label="especifique la raza"
                      onChange={handleOtherBreed}
                      value={otherBreed}
                      isInvalid={errors.otherBreed}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.otherBreed}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
                <Form.Group>
                  <Form.Label>Imagen:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar URL.."
                    onChange={handleImageURLInput}
                    value={petImageURL}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center align-items-center gap-3">
                <Button
                  variant="secondary"
                  onClick={handleBackClick}
                  className="mt-5"
                >
                  Regresar
                </Button>
                <Button variant="primary" type="submit" className="mt-5">
                  Agregar mascota
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddPets;
