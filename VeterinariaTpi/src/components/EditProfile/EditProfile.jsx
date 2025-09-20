import { useState } from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router";


const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dni, setDni] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleChangeLastName = (e) => {
        setLastName(e.target.value);
    }

    const handleChangeDni = (e) => {
        setDni(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleBackClick = () => {
        navigate("/userpanel")
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:3000/editProfile', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                firstName,
                lastName,
                dni,
                email,
                password
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
        <Card>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-5">
                                <Form.Label>Primer nombre:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Ingrese su nombre"
                                    onChange={handleChangeFirstName}
                                    value={firstName}
                                />
                            </Form.Group>
                            <Form.Group className="mb-5">
                                <Form.Label>Apellido:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Ingrese su apellido"
                                    onChange={handleChangeLastName}
                                    value={lastName}
                                />
                            </Form.Group>
                            <Form.Group className="mb-5">
                                <Form.Label>DNI:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Ingrese su DNI"
                                    onChange={handleChangeDni}
                                    value={dni}
                                />
                            </Form.Group>
                            <Form.Group className="mb-5">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Ingrese el email"
                                    onChange={handleChangeEmail}
                                    value={email}
                                />
                            </Form.Group>
                            <Form.Group className="mb-5">
                                <Form.Label>Contraseña:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Ingrese su contraseña"
                                    onChange={handleChangePassword}
                                    value={password}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center gap-3">
                            <Button variant="secondary" onClick={handleBackClick}>Regresar</Button>
                            <Button variant="primary" type="submit">Confirmar</Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    </div>
  )
}

export default EditProfile