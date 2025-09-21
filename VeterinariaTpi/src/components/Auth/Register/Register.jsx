import { useState } from "react";
import { Button, Form, Card, Row, Col, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router";
import "../Register/Register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
  };

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleChangeDni = (event) => {
    setDni(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    fetch('http://localhost:3000/register', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        dni,
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        navigate('/login')
      })
      .catch(err => console.log(err))

  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-5">
      <Card className="w-25">
        <Card.Body>
          <Form onSubmit={handleRegister}>
            <Row>
              <Col>
                <Form.Group className="mb-5">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar su/s nombre/s"
                    value={firstName}
                    onChange={handleChangeFirstName}
                  />
                </Form.Group>
                <Form.Group className="mb-5">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar su/s apellido/s"
                    value={lastName}
                    onChange={handleChangeLastName}
                  />
                </Form.Group>
                <Form.Group className="mb-5">
                  <Form.Label>Dni</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa su Dni"
                    value={dni}
                    onChange={handleChangeDni}
                  />
                </Form.Group>
                <Form.Group className="mb-5">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa su Mail"
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </Form.Group>
                <Form.Group className="mb-5">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresar Contraseña"
                    value={password}
                    onChange={handleChangePassword}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex flex-column justify-content-end align-items-end">
                <Button variant="primary" type="submit">
                  Registrarse
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Row>
        <p>
          ¿Ya tenes cuenta?{" "}
          <NavLink id="LogInLink" href="/login" style={{ display: "inline" }}>
            Inicia Sesion
          </NavLink>
        </p>
      </Row>
    </div>
  );
};

export default Register;