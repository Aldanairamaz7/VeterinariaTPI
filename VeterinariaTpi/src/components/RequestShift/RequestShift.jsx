import { useState } from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router";
import { validateTypeConsult, validateDateShift, validateShiftDescription, validateSelectPet } from "../shared/validations";
import { errorToast, successToast } from "../shared/notifications/notifications";
import { useAuth } from "../../Services/authContext/AuthContext";

const RequestShift = () => {

    const [typeRequest, setTypeRequest] = useState("");
    const [dateShift, setDateShift] = useState("");
    const [description, setDescription] = useState("");
    const [selectPet, setSelectPet] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { token, user } = useAuth();
    const pets = user.pets || [];
    const navigate = useNavigate();

    const handleSelectPet = (e) => {
        const value = e.target.value;
        setSelectPet(value);
        setErrors({ ...errors, selectPet: validateSelectPet(value) })
    }

    const handleDateShift = (e) => {
        const value = (e.target.value);
        setDateShift(value);
        setErrors({ ...errors, dateShift: validateDateShift(value) })
    }

    const handleTypeRequest = (e) => {
        const value = e.target.value;
        setTypeRequest(value);
        setErrors({ ...errors, typeRequest: validateTypeConsult(value) })
    }

    const handleDescription = (e) => {
        const value = e.target.value;
        setDescription(value);
        setErrors({ ...errors, description: validateShiftDescription(value) })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = {
            typeRequest: validateTypeConsult(typeRequest),
            dateShift: validateDateShift(dateShift),
            description: validateShiftDescription(description),
            selectPet: validateSelectPet(selectPet)
        }

        setErrors(formErrors);
        console.log("Errores:", formErrors);

        const hasErrors = Object.values(formErrors).some((err) => err !== "")


        if (hasErrors) {
            errorToast("Hay algunos campos incorrectos, revisalos.")
            return;
        }

        setLoading(true);

        try {
            const selectedPet = pets.find(pet => pet.name === selectPet);
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
                    petId: petId,
                    description: description,
                    enrollment: user.name
                })
            });

            const data = await response.json();

            if (!response.ok) {
                errorToast(data.message || "Error al crear el turno");
                return;
            }

            successToast("Turno creado exitosamente");
            navigate("/userpanel");
        } catch (err) {
            console.log(err);
            errorToast("Error al conectar con el servidor");
        } finally {
            setLoading(false);
        }
    }

    const handleBackClick = () => {
        navigate("/userpanel");
    }

    const today = new Date().toISOString().split('T')[0];

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
                                            <option value="">Seleccione una mascota</option>
                                            {pets.map((pet) => {
                                                return <option key={pet.id} value={pet.name}>{pet.name}</option>
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
                                            <option value="">Seleccione una opción</option>
                                            <option value="consulta">Consulta</option>
                                            <option value="control">Control</option>
                                            <option value="cirujia">Cirugía</option>
                                            <option value="estilista">Estilista</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.typeRequest}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Fecha del turno:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            onChange={handleDateShift}
                                            value={dateShift}
                                            min={today}
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
    )
}

export default RequestShift