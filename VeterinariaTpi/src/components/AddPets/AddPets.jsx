import { useState } from "react"
import { Button, Card, Col, Row, Form } from "react-bootstrap"

export const AddPets = () => {
    const [petName, setPetName] = useState("");
    const [petAge, setPetAge] = useState("");
    const [petBreed, setPetBreed] = useState("");

    const handleNameInput = (e) => {
        setPetName(e.target.value);
    } 

    const handleAgeInput = (e) => {
        setPetAge(e.target.value);
    }

    const handleBreedInput = (e) => {
        setPetBreed(e.target.value);
    }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
        <Card className="w-25">
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
                        <Col className="d-flex flex-column justify-content-end align-items-end">
                            <Button variant="primary" type="submit" className="mt-5">Agregar mascota</Button>
                        </Col>
                    </Row>
                </Form>
                <Button variant="primary" href="/userpanel">Regresar</Button>
            </Card.Body>
        </Card>
    
    </div>
  )
}

export default AddPets