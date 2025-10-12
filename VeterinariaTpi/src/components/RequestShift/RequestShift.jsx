import { useState } from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router";
import { validateFirstName, validateAddPetName, validateTypeConsult, validateDateShift, validateShiftDescription } from "../shared/validations";
import { errorToast } from "../shared/notifications/notifications";

const RequestShift = () => {
    const [userName, setUserName] = useState("");
    const [petName, setPetName] = useState("");
    const [typeRequest, setTypeRequest] = useState("");
    const [dateShift, setDateShift] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleUserName = (e) => {
        const value = e.target.value;
        setUserName(value);
        setErrors({...errors, userName: validateFirstName(value)})
    }

    const handlePetName = (e) => {
        const value = e.target.value;
        setPetName(value);
        setErrors({...errors, petName: validateAddPetName(value)})
    }

    const handleTypeRequest = (e) => {
        const value = e.target.value;
        setTypeRequest(value);
        setErrors({...errors, typeRequest: validateTypeConsult(value)})
    }

    const handleDateShift = (e) => {
        const value = e.target.value;
        setDateShift(value);
        setErrors({...errors, dateShift: validateDateShift(value)})
    }

    const handleDescription = (e) => {
        const value = e.target.value;
        setDescription(value);
        setErrors({...errors, description: validateShiftDescription(value)})
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = {
            userName: validateFirstName(userName),
            petName: validateAddPetName(petName),
            typeRequest: validateTypeConsult(typeRequest),
            dateShift: validateDateShift(dateShift),
            description: validateShiftDescription(description)
        }

        setErrors(formErrors);

        const hasErrors = Object.values(formErrors).some((err) => err !== "")

        if(hasErrors){
            errorToast("Hay algunos campos incorrectos, revisalos.")
            return;
        }

        navigate("/userpanel")
    }

    const handleBackClick = () => {
        navigate("/userpanel");
    }

    return (
    <>
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Card>
                <Card.Body>
                    <Form>
                        <h2>Solicite un turno:</h2>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Nombre:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese su nombre"
                                        onChange={handleUserName}
                                        value={userName}
                                        isInvalid={errors.userName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.userName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Mascota:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el nombre de la mascota"
                                        onChange={handlePetName}
                                        value={petName}
                                        isInvalid={errors.petName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.petName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Tipo de consulta:</Form.Label>
                                    <Form.Select
                                        aria-label="Seleccione el tipo de consulta"
                                        onChange={handleTypeRequest}
                                        value={typeRequest}
                                        isInvalid={errors.typeRequest}
                                    >
                                        <option value="">Seleccione una opcion</option>
                                        <option value="query">Consulta</option>
                                        <option value="check">Control</option>
                                        <option value="surgery">Cirugia</option>
                                        <option value="stylist">Estilista</option>
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
                                        isInvalid={errors.dateShift}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.dateShift}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Descripcion:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Ingrese una descripcion sobre su consulta..."
                                        onChange={handleDescription}
                                        value={description}
                                        isInvalid={errors.description}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.description}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center align-items-center gap-3">
                                <Button variant="secondary" onClick={handleBackClick} className="mt-5">Regresar</Button>
                                <Button variant="primary" type="submit" onClick={handleSubmit} className="mt-5">Enviar turno</Button>
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