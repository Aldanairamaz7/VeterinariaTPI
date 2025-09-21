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

  const [errors, setErrors] = useState({
    firstNameError: 0,
    lastNameError: 0,
    dniError: 0,
    emailError: 0,
    passwordError: 0,
  });

  const regexName = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  const regexDni = /^\d*$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{7,20}$/;

  const valNames = (name, errorSel) => {
    if (name.length < 3 || name.length > 50) {
      setErrors((prevErrors) => ({ ...prevErrors, [errorSel]: 1 }));
      return false;
    } else if (!regexName.test(name.trim())) {
      setErrors((prevErrors) => ({ ...prevErrors, [errorSel]: 2 }));
      return false;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [errorSel]: 0 }));
  };

  const handleKeyDown = (e) => {
    if (["e", "E", "+", "-"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
    valNames(event.target.value, "firstNameError");
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
    valNames(event.target.value, "lastNameError");
  };

  const handleChangeDni = (event) => {
    setDni(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, dniError: 0 }));
    if (event.target.value < 10000000 || event.target.value > 99999999) {
      setErrors((prevErrors) => ({ ...prevErrors, dniError: 1 }));
      return false;
    }
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, emailError: 0 }));
    if (!event.target.value.length) {
      setErrors((prevErrors) => ({ ...prevErrors, emailError: 1 }));
      return;
    } else if (!emailRegex.test(event.target.value.trim())) {
      setErrors((prevErrors) => ({ ...prevErrors, emailError: 2 }));
      return;
    }
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, passwordError: 0 }));
    if (!event.target.value.length) {
      setErrors((prevErrors) => ({ ...prevErrors, passwordError: 1 }));
      return;
    } else if (!regexPassword.test(event.target.value)) {
      setErrors((prevErrors) => ({ ...prevErrors, passwordError: 2 }));
      return;
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();

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
      .then((data) => console.log(data))
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
                    required
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
                    required
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
                    required
                  />
                  <p className="text-danger">
                    {errors.dniError === 1
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
                    required
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
                    required
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
