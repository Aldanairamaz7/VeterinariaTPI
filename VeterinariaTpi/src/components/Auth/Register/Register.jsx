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

  const handleGoLogin = () => {
    navigate("/login");
  };

  const handleChangeFirstName = (event) => {
    setFirstName(event.target.value);
  };

  const handleChangeLastName = (event) => {
    setLastName(event.target.value);
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
                  <Form.Label>*Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar su/s nombre/s"
                    value={firstName}
                    onChange={handleChangeFirstName}
                  />
                  <p>
                    {errors.firstNameError === 0 && (
                      <>
                        -Debe tener entre [3-50] caracteres
                        <br />
                        -No debe contener caracteres especiales y/o numeros
                      </>
                    )}
                    {errors.firstNameError === 1 && (
                      <span className="text-danger">
                        -Este campo es obligatorio
                      </span>
                    )}
                    {errors.firstNameError === 2 && (
                      <span className="text-danger">
                        -Ingrese entre [3-50] caracteres
                      </span>
                    )}
                    {errors.firstNameError === 3 && (
                      <span className="text-danger">
                        -El/los nombre/s no debe/n contener caracteres
                        especiales o numeros
                      </span>
                    )}
                  </p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>*Apellido</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar su/s apellido/s"
                    value={lastName}
                    onChange={handleChangeLastName}
                  />
                  <p>
                    {errors.lastNameError === 0 && (
                      <>
                        -Debe tener entre [3-50] caracteres
                        <br />
                        -No debe contener caracteres especiales y/o numeros
                      </>
                    )}
                    {errors.lastNameError === 1 && (
                      <span className="text-danger">
                        -Este campo es obligatorio
                      </span>
                    )}
                    {errors.lastNameError === 2 && (
                      <span className="text-danger">
                        -Ingrese entre [3-50] caracteres
                      </span>
                    )}
                    {errors.lastNameError === 3 && (
                      <span className="text-danger">
                        -El/los apellido/s no debe/n contener caracteres
                        especiales o numeros
                      </span>
                    )}
                  </p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>*Dni</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingresa su Dni"
                    value={dni}
                    onChange={handleChangeDni}
                    onKeyDown={handleKeyDown}
                    min="0"
                  />
                  <p>
                    {errors.dniError === 1 && (
                      <span className="text-danger">
                        -Este campo es obligatorio
                      </span>
                    )}
                    {errors.dniError === 2 && (
                      <span className="text-danger">
                        -Su DNI debe contener 8 caracteres
                      </span>
                    )}
                    {errors.dniError === 3 && (
                      <span className="text-danger">
                        -Su DNI no puede ser negativo
                      </span>
                    )}
                    {errors.dniError === 0 && (
                      <>
                        -Su dni debe contener 8 <br />
                        -Su dni no puede ser negativo
                      </>
                    )}
                  </p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>*Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingresa su Mail"
                    value={email}
                    onChange={handleChangeEmail}
                  />
                  <p>
                    {errors.emailError === 1 && (
                      <span className="text-danger">
                        -Este campo es obligatorio
                      </span>
                    )}
                    {errors.emailError === 2 && (
                      <span className="text-danger">
                        -El email ingresado no es valido
                      </span>
                    )}
                    {errors.emailError === 0 && (
                      <>-Su email debe contener el dominio [@ y .com]</>
                    )}
                  </p>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>*Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresar Contraseña"
                    value={password}
                    onChange={handleChangePassword}
                  />
                  <p>
                    {errors.passwordError === 0 && (
                      <>
                        -Su contrasea debe tener entre [7-20] caracteres
                        <br />
                        -Su contraseña debe tener una mayuscula y una letra
                      </>
                    )}
                    {errors.passwordError === 1 && (
                      <span className="text-danger">
                        -Este campo es obligatorio
                      </span>
                    )}
                    {errors.passwordError === 2 && (
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
          <p id="LogInLink" onClick={handleGoLogin}>
            Inicia Sesion
          </p>
        </p>
      </Row>
    </div>
  );
};

export default Register;
