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

  const handleGoRegister = () => {
    navigate("/register");
  };

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
  };

  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
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
                    isInvalid={loginErrors.emailError > 0}
                    className="mb-2"
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ whiteSpace: "pre-line" }}
                  ></Form.Control.Feedback>
                  <p>
                    {loginErrors.emailError === 1 && (
                      <span className="text-danger">
                        -Este campo es obligatorio
                      </span>
                    )}
                    {loginErrors.emailError === 2 && (
                      <span className="text-danger">
                        -El email ingresado no es valido
                      </span>
                    )}
                  </p>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresar Contraseña"
                    onChange={handlePasswordInput}
                    value={password}
                    isInvalid={loginErrors.passwordError > 0}
                    className="mb-2"
                  />
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ whiteSpace: "pre-line" }}
                  ></Form.Control.Feedback>
                  <p>
                    {loginErrors.passwordError === 1 && (
                      <span className="text-danger">
                        -Este campo es obligatorio
                      </span>
                    )}
                    {loginErrors.passwordError === 2 && (
                      <span className="text-danger">
                        -Su contraseña no es valida
                      </span>
                    )}
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
        <div>
          ¿No tenes cuenta?{" "}
          <p id="RegisterLink" onClick={handleGoRegister}>
            Registrate
          </p>
        </div>
      </Row>
    </div>
  );
};
export default Login;
