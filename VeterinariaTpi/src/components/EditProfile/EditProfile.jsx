import { useState } from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router";
import { validateFirstName, validateLastName, validateDni, validateEmail, validatePassword } from "../shared/validations.js";
import { errorToast } from "../shared/notifications/notifications.js";


const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dni, setDni] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleChangeFirstName = (e) => {
        const value = e.target.value;
        setFirstName(value);
        setErrors({ ...errors,
            firstName: validateFirstName(value)
        });
    }

    const handleChangeLastName = (e) => {
        const value = e.target.value;
        setLastName(value);
        setErrors({ ...errors,
            lastName: validateLastName(value)
        });
    }

    const handleChangeDni = (e) => {
        const value = e.target.value;
        setDni(value);
        setErrors({ ...errors,
            dni: validateDni(value)
        });
    }

    const handleChangeEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        setErrors({ ...errors,
            email: validateEmail(value)
        });
    }

    const handleChangePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
        setErrors({ ...errors,
            password: validatePassword(value)
        });
    }

    const handleBackClick = () => {
        navigate("/userpanel")
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formErrors = {
            firstName: validateFirstName(firstName),
            lastName: validateLastName(lastName),
            dni: validateDni(dni),
            email: validateEmail(email),
            password: validatePassword(password)
        };

        setErrors(formErrors);

        const hasErrors = Object.values(formErrors).some(err => err !== "");

        if(hasErrors){
            errorToast("Hay algunos campos incorrectos, revisalos.")
            return;
        }

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
        <Card className="mt-1 mb-1">
            <Card.Body >
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-1">
                                <Form.Label>Primer nombre:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Ingrese su nombre"
                                    onChange={handleChangeFirstName}
                                    value={firstName}
                                    isInvalid={errors.firstName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-1">
                                <Form.Label>Apellido:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Ingrese su apellido"
                                    onChange={handleChangeLastName}
                                    value={lastName}
                                    isInvalid={errors.lastName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.lastName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-1">
                                <Form.Label>DNI:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Ingrese su DNI"
                                    onChange={handleChangeDni}
                                    value={dni}
                                    isInvalid={errors.dni}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.dni}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-1">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Ingrese el email"
                                    onChange={handleChangeEmail}
                                    value={email}
                                    isInvalid={errors.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-1">
                                <Form.Label>Contraseña:</Form.Label>
                                <Form.Control 
                                    type="password"
                                    placeholder="Ingrese su contraseña"
                                    onChange={handleChangePassword}
                                    value={password}
                                    isInvalid={errors.password}
                                />
                                <Form.Control.Feedback type="invalid" style={{ whiteSpace: "pre-line" }}>
                                    {errors.password}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center gap-3 mt-1">
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