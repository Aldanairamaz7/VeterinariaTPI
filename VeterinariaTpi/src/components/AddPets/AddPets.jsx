import { useState } from "react"
import { Button, Card, Col, Row, Form } from "react-bootstrap"
import { useNavigate } from "react-router";

export const AddPets = () => {
    const [petName, setPetName] = useState("");
    const [petAge, setPetAge] = useState("");
    const [petBreed, setPetBreed] = useState("");

    const navigate = useNavigate();

    const handleNameInput = (e) => {
        setPetName(e.target.value);
    } 

    const handleAgeInput = (e) => {
        setPetAge(e.target.value);
    }

    const handleBreedInput = (e) => {
        setPetBreed(e.target.value);
    }

    const handleBackClick = () => {
        navigate("/userpanel");
    }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
        <Card>
            <Card.Body>
                <h2>Añade a tu mascota</h2>
                <Form>
                    <Row>
                        <Col>
                        <Form.Group className="mb-5">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre"
                                onChange={handleNameInput}
                                value={petName}
                            />
                        </Form.Group>
                        <Form.Group className="mb-5">
                            <Form.Label>Edad:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese su edad"
                                onChange={handleAgeInput}
                                value={petAge}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Raza:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese su raza:"
                                onChange={handleBreedInput}
                                value={petBreed}
                            />
                        </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center gap-3">
                            <Button variant="secondary" onClick={handleBackClick} className="mt-5">Regresar</Button>
                            <Button variant="primary" type="submit" className="mt-5">Agregar mascota</Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    
    </div>
  )
}

export default AddPets