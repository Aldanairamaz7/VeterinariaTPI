import { useState } from "react"
import { Button, Card, Col, Row, Form } from "react-bootstrap"
import { useNavigate } from "react-router";
import {validateAddPetName, validatePetAge, validateBreed} from "../shared/validations.js"
import { errorToast } from "../shared/notifications/notifications.js";

export const AddPets = () => {
    const [petName, setPetName] = useState("");
    const [petAge, setPetAge] = useState("");
    const [petBreed, setPetBreed] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleNameInput = (e) => {
        const value = e.target.value;
        setPetName(value);
        setErrors({ ...errors,
            petName: validateAddPetName(value)
        });
    } 

    const handleAgeInput = (e) => {
        const value = e.target.value;
        setPetAge(value);
        setErrors({ ...errors,
            petAge: validatePetAge(value)
        });
    }

    const handleBreedInput = (e) => {
        const value = e.target.value;
        setPetBreed(value);
        setErrors({ ...errors,
            petBreed: validateBreed(value)
        });
    }

    const handleBackClick = () => {
        navigate("/userpanel");
    }

    const handleSubmit = (e) => {
            e.preventDefault()
    
            const formErrors = {
                petName: validateAddPetName(petName),
                petAge: validatePetAge(petAge),
                petBreed: validateBreed(petBreed)
            };
    
            setErrors(formErrors);
    
            const hasErrors = Object.values(formErrors).some(err => err !== "");
    
            if(hasErrors){
                errorToast("Hay algunos campos incorrectos, revisalos.")
                return;
            }
    
            fetch('http://localhost:3000/addpet', {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    petName,
                    petAge,
                    petBreed
                })
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
        <Card className="mt-1 mb-1">
            <Card.Body>
                <h2>Añade a tu mascota</h2>
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
                                placeholder="Ingrese su edad"
                                onChange={handleAgeInput}
                                value={petAge}
                                isInvalid={errors.petAge}
                            />
                            <Form.Control.Feedback type="invalid" style={{ whiteSpace: "pre-line" }}>
                                {errors.petAge}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Raza:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese su raza:"
                                onChange={handleBreedInput}
                                value={petBreed}
                                isInvalid={errors.petBreed}
                            />
                            <Form.Control.Feedback type="invalid" style={{ whiteSpace: "pre-line" }}>
                                {errors.petBreed}
                            </Form.Control.Feedback>
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