import { useState } from "react";
import { Button, Form, Card, Row, Col, NavLink } from "react-bootstrap";
import { useNavigate } from "react-router";
import "../Register/Register.css";
import {
  validateRegisterNames,
  validateRegisterDni,
  regexEmail,
  regexPassword,
  regexNames,
  validateLogin,
} from "../../shared/validations";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    firstNameError: 0,
    lastNameError: 0,
    dniError: 0,
    emailError: 0,
    passwordError: 0,
  });

  const handleKeyDown = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
    validateRegisterNames(
      event.target.value,
      setErrors,
      "firstNameError",
      regexNames
    );
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
    validateRegisterNames(
      event.target.value,
      setErrors,
      "lastNameError",
      regexNames
    );
  };

  const handleChangeDni = (event) => {
    setDni(event.target.value);
    validateRegisterDni(event.target.value, setErrors, "dniError");
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    validateLogin(event.target.value, setErrors, "emailError", regexEmail);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    validateLogin(
      event.target.value,
      setErrors,
      "passwordError",
      regexPassword
    );
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const valFirstName = validateRegisterNames(
      firstName,
      setErrors,
      "firstNameError",
      regexNames
    );
    const valLastName = validateRegisterNames(
      lastName,
      setErrors,
      "lastNameError",
      regexNames
    );
    const valDni = validateRegisterDni(dni, setErrors, "dniError");
    const valEmail = validateLogin(email, setErrors, "emailError", regexEmail);
    const valPassword = validateLogin(
      password,
      setErrors,
      "passwordError",
      regexPassword
    );

    if (!valFirstName || !valLastName || !valDni || !valEmail || !valPassword) {
      return false;
    }

    fetch("http://localhost:3000/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        dni,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-5">
      <Card className="w-25">
        <Card.Body>
          <Form onSubmit={handleRegister}>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar su/s nombre/s"
                    value={firstName}
                    onChange={handleChangeFirstName}
                  />
                  <p className="text-danger">
                    {errors.firstNameError === 1
                      ? "Ingrese entre [3-50] caracteres"
                      : "\u00A0"}
                    {errors.firstNameError === 2
                      ? "Nombre/s ingresado/s invalido/s"
                      : "\u00A0"}
                  </p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar su/s apellido/s"
                    value={lastName}
                    onChange={handleChangeLastName}
                  />
                  <p className="text-danger">
                    {errors.lastNameError === 1
                      ? "Ingrese entre [3-50] caracteres"
                      : "\u00A0"}
                    {errors.lastNameError === 2
                      ? "Apellido/s ingresado/s invalido/s"
                      : "\u00A0"}
                  </p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Dni</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingresa su Dni"
                    value={dni}
                    onChange={handleChangeDni}
                    onKeyDown={handleKeyDown}
                  />
                  <p className="text-danger">
                    {errors.dniError === 1 ? "Ingrese un DNI" : "\u00A0"}
                    {errors.dniError === 2
                      ? "Su DNI debe contener 8 caracteres"
                      : "\u00A0"}
                  </p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa su Mail"
                    value={email}
                    onChange={handleChangeEmail}
                  />
                  <p className="text-danger">
                    {errors.emailError === 1 ? "Ingrese un Email" : "\u00A0"}
                    {errors.emailError === 2
                      ? "Email ingresado invalido"
                      : "\u00A0"}
                  </p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresar Contraseña"
                    value={password}
                    onChange={handleChangePassword}
                  />
                  <p className="text-danger">
                    {errors.passwordError === 1
                      ? "Ingrese una contraseña"
                      : "\u00A0"}
                    {errors.passwordError === 2
                      ? "La contraseña debe tener minimo: una mayuscula y un numero"
                      : "\u00A0"}
                  </p>
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
