import { useState } from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router";

const RequestShift = () => {
    const [userName, setUserName] = useState("");
    const [petName, setPetName] = useState("");
    const [typeRequest, setTypeRequest] = useState("");
    const [dateShift, setDateShift] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleUserName = (e) => {
        setUserName(e.target.value);
    }

    const handlePetName = (e) => {
        setPet(e.target.value);
    }

    const handleTypeRequest = (e) => {
        setTypeRequest(e.target.value);
    }

    const handleDateShift = (e) => {
        setDateShift(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
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
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Mascota:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese el nombre de la mascota"
                                        onChange={handlePetName}
                                        value={petName}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Tipo de consulta:</Form.Label>
                                    <Form.Select
                                        aria-label="Seleccione el tipo de consulta"
                                        onChange={handleTypeRequest}
                                        value={typeRequest}
                                    >
                                        <option value="">Seleccione una opcion</option>
                                        <option value="query">Consulta</option>
                                        <option value="check">Control</option>
                                        <option value="surgery">Cirugia</option>
                                        <option value="stylist">Estilista</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Fecha del turno:</Form.Label>
                                    <Form.Control 
                                        type="date"
                                        onChange={handleDateShift}
                                        value={dateShift}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Descripcion:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Ingrese una descripcion sobre su consulta..."
                                        onChange={handleDescription}
                                        value={description}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex justify-content-center align-items-center gap-3">
                                <Button variant="secondary" onClick={handleBackClick} className="mt-5">Regresar</Button>
                                <Button variant="primary" type="submit" className="mt-5">Enviar turno</Button>
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