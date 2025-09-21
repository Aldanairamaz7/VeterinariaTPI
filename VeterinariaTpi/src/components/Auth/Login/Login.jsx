import { useState } from "react";
import { Button, Form, Card, Row, Col, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router";
import "../Login/Login.css";
import { errorToast } from "../../shared/notifications/notifications";
import { useAuth } from "../../../Services/authContext/AuthContext";
import {
  regexEmail,
  regexPassword,
  validateLogin,
} from "../../shared/validations";

const Login = () => {
  const { userLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState({
    emailError: 0,
    passwordError: 0,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginErrors(() => ({ passwordError: false, emailError: 0 }));
    const valMail = validateLogin(
      email,
      setLoginErrors,
      "emailError",
      regexEmail
    );
    const valPass = validateLogin(
      password,
      setLoginErrors,
      "passwordError",
      regexPassword
    );
    if (!valMail || !valPass) {
      return false;
    }

    try {
      await userLogin(email, password);
      navigate("/userpanel");
    } catch (err) {
      errorToast(err);
    }
  };

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
    setLoginErrors((prevErrors) => ({ ...prevErrors, emailError: 0 }));
    validateLogin(event.target.value, setLoginErrors, "emailError", regexEmail);
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
    setLoginErrors((prevErrors) => ({ ...prevErrors, passwordError: 0 }));
    validateLogin(
      event.target.value,
      setLoginErrors,
      "passwordError",
      regexPassword
    );
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
      <Card id="cardForm" className="w-25">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
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
                    {loginErrors.passwordError === 1
                      ? "Ingrese una contraseña"
                      : "\u00A0"}
                    {loginErrors.passwordError === 2
                      ? "La contraseña debe tener minimo: una mayuscula y un numero"
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
