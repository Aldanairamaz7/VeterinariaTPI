import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import {
  validateTypeConsult,
  validateDateShift,
  validateShiftDescription,
  validateSelectPet,
  validateVeterinarian,
} from "../shared/validations";
import {
  errorToast,
  successToast,
} from "../shared/notifications/notifications";
import { useAuth } from "../../Services/authContext/AuthContext";

const RequestShift = () => {
  const [typeRequest, setTypeRequest] = useState("");
  const [dateShift, setDateShift] = useState("");
  const [description, setDescription] = useState("");
  const [selectPet, setSelectPet] = useState(0);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { token, user } = useAuth();
  const pets = user.pets || [];
  const navigate = useNavigate();
  const { idPet } = useParams();
  const [specialities, setSpecialities] = useState([]);
  const [veterinarians, setVeterinarians] = useState([]);
  const [selectVet, setSelVet] = useState(0);

  useEffect(() => {
    setSelectPet(idPet);
    fetch("http://localhost:3000/requestshift", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setSpecialities(data.specialities);
        setVeterinarians(data.veterinarians);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSelectPet = (e) => {
    const value = Number(e.target.value);
    setSelectPet(value);
    setErrors({ ...errors, selectPet: validateSelectPet(value) });
  };

  const handleDateShift = (e) => {
    const value = e.target.value;
    setDateShift(value);
    setErrors({ ...errors, dateShift: validateDateShift(value) });
  };

  const handleTypeRequest = (e) => {
    const value = e.target.value;
    setTypeRequest(value);
    setErrors({ ...errors, typeRequest: validateTypeConsult(value) });
  };

  const handleDescription = (e) => {
    const value = e.target.value;
    setDescription(value);
    setErrors({ ...errors, description: validateShiftDescription(value) });
  };

  const handleSelectVeterinarian = (e) => {
    const value = Number(e.target.value);
    setSelVet(value);
    setErrors({ ...errors, selectVet: validateVeterinarian(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = {
      typeRequest: validateTypeConsult(typeRequest),
      dateShift: validateDateShift(dateShift),
      description: validateShiftDescription(description),
      selectPet: validateSelectPet(selectPet),
      selectVet: validateVeterinarian(selectVet),
    };

    setErrors(formErrors);

    const hasErrors = Object.values(formErrors).some((err) => err !== "");

    if (hasErrors) {
      errorToast("Hay algunos campos incorrectos, revisalos.");
      return;
    }

    setLoading(true);

    try {
      const selectedPet = pets.find((pet) => pet.name === selectPet);
      const petId = selectedPet ? selectedPet.id : null;

      const response = await fetch("http://localhost:3000/shift", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          userId: user.id,
          dateTime: dateShift,
          typeConsult: typeRequest,
          petId: selectPet,
          description: description,
          enrollment: selectVet,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        errorToast(data.message || "Error al crear el turno");
        return;
      }

      successToast("Turno creado exitosamente");
      navigate("/userpanel");
    } catch (err) {
      errorToast("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate("/userpanel");
  };

  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);
  const maxDateString = maxDate.toISOString().split("T")[0];

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <h1>Solicite un turno:</h1>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Seleccione su mascota:</Form.Label>
                    <Form.Select
                      aria-label="Seleccione su mascota"
                      onChange={handleSelectPet}
                      value={selectPet}
                      isInvalid={!!errors.selectPet}
                    >
                      <option value={0}>Seleccione una mascota</option>
                      {pets.map((pet) => {
                        return (
                          <option key={pet.id} value={pet.id}>
                            {pet.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.selectPet}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Tipo de consulta:</Form.Label>
                    <Form.Select
                      aria-label="Seleccione el tipo de consulta"
                      onChange={handleTypeRequest}
                      value={typeRequest}
                      isInvalid={!!errors.typeRequest}
                    >
                      <option key={0} value={0}>
                        Seleccionar el tipo de consulta
                      </option>
                      {specialities.map((spe) => {
                        return (
                          <option
                            key={spe.idSpeciality}
                            value={spe.specialityName}
                          >
                            {spe.specialityName}
                          </option>
                        );
                      })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.typeRequest}
                    </Form.Control.Feedback>
                  </Form.Group>
                  {typeRequest !== 0 && (
                    <Form.Group>
                      <Form.Label>Elegir veterinario:</Form.Label>
                      <Form.Select
                        aria-label="Seleccione el veterinario"
                        onChange={handleSelectVeterinarian}
                        value={selectVet}
                        isInvalid={!!errors.selectVeterinarian}
                      >
                        <option key={0} value={0}>
                          Seleccionar el veterinario
                        </option>
                        {veterinarians.map((vet) => {
                          return (
                            <option
                              key={vet.veterinarian.enrollment}
                              value={vet.veterinarian.enrollment}
                            >
                              {vet.veterinarian?.enrollment || "sin matricula"}{" "}
                              - {vet.firstName} {vet.lastName}
                            </option>
                          );
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.selectVeterinarian}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}

                  <Form.Group>
                    <Form.Label>Fecha del turno:</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={handleDateShift}
                      value={dateShift}
                      min={today}
                      max={maxDateString}
                      isInvalid={!!errors.dateShift}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dateShift}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Descripción:</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Ingrese una descripción sobre su consulta..."
                      onChange={handleDescription}
                      value={description}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col className="d-flex justify-content-center align-items-center gap-3">
                  <Button
                    variant="secondary"
                    onClick={handleBackClick}
                    className="mt-5"
                    disabled={loading}
                  >
                    Regresar
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="mt-5"
                    disabled={loading}
                  >
                    {loading ? "Enviando..." : "Enviar turno"}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default RequestShift;
