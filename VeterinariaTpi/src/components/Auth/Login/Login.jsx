import { useState } from "react";
import { Button, Form, Card, Row, Col, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router";
import "../Login/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({
    emailError: 0,
    passwordError: false,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleValErrors = (event) => {
    event.preventDefault();
    setLoginErrors(() => ({ passwordError: false, emailError: 0 }));

    if (!email.length) {
      setLoginErrors((prevErrors) => ({ ...prevErrors, emailError: 1 }));
    } else if (!emailRegex.test(email.trim())) {
      setLoginErrors((prevErrors) => ({ ...prevErrors, emailError: 2 }));
    }
    if (!password.length) {
      setLoginErrors((prevErrors) => ({ ...prevErrors, passwordError: true }));
    }
    if (loginErrors.passwordError || loginErrors.emailError > 0) {
      return;
    }
  };

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
    if (!event.target.value.length) {
      setLoginErrors((prevErrors) => ({ ...prevErrors, emailError: 1 }));
      return;
    } else if (!emailRegex.test(event.target.value.trim())) {
      setLoginErrors((prevErrors) => ({ ...prevErrors, emailError: 2 }));
      return;
    }
    setLoginErrors((prevErrors) => ({ ...prevErrors, emailError: 0 }));
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
    if (!event.target.value) {
      setLoginErrors((prevErrors) => ({ ...prevErrors, passwordError: true }));
      return;
    }
    setLoginErrors((prevErrors) => ({ ...prevErrors, passwordError: false }));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Card className="w-25">
        <Card.Body>
          <Form onSubmit={handleValErrors}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar Mail"
                    onChange={handleEmailInput}
                    value={email}
                    className="mb-2"
                  />
                  <p className="text-danger">
                    {loginErrors.emailError == 1
                      ? "Ingrese un Email"
                      : "\u00A0"}
                    {loginErrors.emailError == 2
                      ? "Email ingresado invalido"
                      : "\u00A0"}
                  </p>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresar Contraseña"
                    onChange={handlePasswordInput}
                    value={password}
                    className="mb-2"
                  />
                  <p className="text-danger">
                    {loginErrors.passwordError == true
                      ? "Ingrese una contraseña"
                      : "\u00A0"}
                  </p>
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
