import { useState } from "react";
import { Button, Form, Card, Row, Col, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router";
import "../Login/Login.css";
import { errorToast } from "../../shared/notifications/notifications";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    fetch("http://localhost:3000/login", {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password
      })
    })

      .then(res => res.json().then(data => {
        if (!res.ok) {
          errorToast(data.message)
          return;
        }

        localStorage.setItem("vetCare-token", data)
        navigate('/userpanel')
      }))
      .catch(err => console.log(err))
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Card className="w-25">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-5">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresar Mail"
                    onChange={handleEmailInput}
                    value={email}
                  />
                </Form.Group>
                <Form.Group className="mb-5">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresar Contraseña"
                    onChange={handlePasswordInput}
                    value={password}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex flex-column justify-content-end align-items-end">
                <Button variant="primary" type="submit">
                  Iniciar Sesion
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Row>
        <p>
          ¿No tenes cuenta?{" "}
          <NavLink
            id="RegisterLink"
            href="/register"
            style={{ display: "inline" }}
          >
            Registrate
          </NavLink>
        </p>
      </Row>
    </div>
  );
};
export default Login;
