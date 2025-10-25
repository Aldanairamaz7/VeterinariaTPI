import { useEffect, useState } from "react";
import { Card, Col, Form, Row, Button, FormLabel } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  validateAddPetName,
  validatePetAge,
  validateBreed,
  validateImageURL,
  validateTypePet,
  validateOtherType,
  validateOtherBreed,
} from "../shared/validations.js";
import {
  errorToast,
  successToast,
} from "../shared/notifications/notifications.js";
import ConfirmDeleteModal from "../confirmDeleteModal/ConfirmDeleteModal.jsx";
import { useAuth } from "../../Services/authContext/AuthContext.jsx";
import { useAdmin } from "../../Services/adminContext/AdminContext.jsx";

const EditPet = () => {
  const [petName, setPetName] = useState("");
  const [petAge, setPetAge] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petImg, setPetImg] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user, token, setUser, removePet } = useAuth();
  const { petId } = useParams();
  const [allTypePet, setAllTypePet] = useState([]);
  const [allBreed, setAllBreed] = useState([]);
  const [pet, setPet] = useState({
    id: 0,
    petName: "",
    petAge: 0,
    typePet: -1,
    otherTypePet: "",
    breed: -1,
    otherBreed: "",
    imageURL: "",
  });

  useEffect(() => {
    if (petId) {
      fetch(`http://localhost:3000/editpet/${petId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setPet({
            id: Number(petId),
            petName: data.pet.name,
            petAge: data.pet.age,
            typePet: Number(data.pet.typePet),
            breed: Number(data.pet.breed),
            imageURL: data.pet.imageURL,
          });
          setAllTypePet(data.allTypePet || []);
          setAllBreed(data.allBreed || []);
        })
        .catch((err) => {
          navigate("/unauthorized");
        });
    }
  }, [petId]);

  const handleNameInput = (e) => {
    const value = e.target.value;
    setPet((prev) => ({ ...prev, petName: value }));
  };

  const handleAgeInput = (e) => {
    const value = e.target.value;
    setPet((prev) => ({ ...prev, petAge: value }));
  };
  const handleTypePetSelect = (e) => {
    const value = Number(e.target.value);
    setPet((prev) => ({
      ...prev,
      typePet: value,
      otherTypePet: "",
      otherBreed: "",
    }));
    if (value === 0) setPet((prev) => ({ ...prev, breed: value }));
    else setPet((prev) => ({ ...prev, breed: -1 }));
  };

  const handleOtherTypePetInput = (e) => {
    const value = e.target.value;
    setPet((prev) => ({ ...prev, otherTypePet: value }));
  };

  const handleBreedSelect = (e) => {
    const value = Number(e.target.value);
    setPet((prev) => ({ ...prev, breed: value }));
  };
  const handleOtherBreedInput = (e) => {
    const value = e.target.value;
    setPet((prev) => ({ ...prev, otherBreed: value }));
  };

  const handlePetImg = (e) => {
    const value = e.target.value;
    setPet((prev) => ({ ...prev, imageURL: value }));
  };

  const handleDeletePet = async () => {
    try {
      removePet(petId);
      successToast("Mascota eliminada con exito.");
      setShowDeleteModal(false);
      navigate(-1);
    } catch (err) {
      console.log(err);
      errorToast("No se pudo eliminar la mascota");
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(pet);

    const formErrors = {
      petName: validateAddPetName(pet.petName),
      petAge: validatePetAge(pet.petAge),
      typePet: validateTypePet(pet.typePet),
      otherTypePet: validateOtherType(pet.otherTypePet, pet.typePet),
      breed: validateBreed(pet.breed),
      otherBreed: validateOtherBreed(pet.otherBreed, pet.breed),
    };

    setErrors(formErrors);

    const hasErrors = Object.values(formErrors).some((err) => err !== "");

    if (hasErrors) {
      errorToast("Hay alugunos campos incorrectos, revisalos.");
      return;
    }

    fetch(`http://localhost:3000/editpet/${petId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify({ pet }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Algo a salido mal");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        console.log(data);
        successToast(data.message);
        navigate(-1);
      })
      .catch((err) => console.log(err));
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
                      value={pet.petName}
                      isInvalid={!!errors.petName}
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
                      value={pet.petAge}
                      isInvalid={!!errors.petAge}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {errors.petAge}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-5">
                    <Form.Label>Especie:</Form.Label>
                    <Form.Select
                      type="text"
                      placeholder="Ingrese la raza"
                      onChange={handleTypePetSelect}
                      value={pet.typePet}
                      isInvalid={!!errors.typePet}
                    >
                      <option value={-1}>Seleccione una especie</option>
                      {allTypePet.map((el) => {
                        return (
                          <option key={el.idType} value={el.idType}>
                            {el.typePetName}
                          </option>
                        );
                      })}
                      <option value={0}>Otra</option>
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {errors.typePet}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {pet.typePet === 0 && (
                    <Form.Group className="mb-5">
                      <Form.Label>Otra especie:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la especie"
                        onChange={handleOtherTypePetInput}
                        value={pet.otherTypePet}
                        isInvalid={!!errors.otherTypePet}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.otherTypePet}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}

                  <Form.Group className="mb-5">
                    <Form.Label>Raza:</Form.Label>
                    <Form.Select
                      type="text"
                      placeholder="Ingrese la raza"
                      onChange={handleBreedSelect}
                      value={pet.breed}
                      isInvalid={!!errors.breed}
                    >
                      <option value={-1}>Seleccione una raza</option>
                      {allBreed
                        .filter((el) => el.idTypePet === pet.typePet)
                        .map((el) => {
                          return (
                            <option key={el.idBreed} value={el.idBreed}>
                              {el.nameBreed}
                            </option>
                          );
                        })}
                      <option value={0}>Otra</option>
                    </Form.Select>
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {errors.breed}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {pet.breed === 0 && (
                    <Form.Group className="mb-5">
                      <Form.Label>Otra raza:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ingrese la raza"
                        onChange={handleOtherBreedInput}
                        value={pet.otherBreed}
                        isInvalid={!!errors.otherBreed}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.otherBreed}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}

                  <Form.Group className="mb-5">
                    <Form.Label>Imagen: </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese una url"
                      onChange={handlePetImg}
                      value={pet.imageURL}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center align-items-center gap-3">
                  <Button
                    variant="danger"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    Eliminar mascota
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
      <ConfirmDeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeletePet}
        petName={petName}
      />
    </div>
  );
};

export default EditPet;
