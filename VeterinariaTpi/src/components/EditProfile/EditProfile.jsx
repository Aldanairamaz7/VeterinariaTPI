import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router";
import {
  validateFirstName,
  validateLastName,
  validateDni,
  validateEmail,
  validatePassword,
} from "../shared/validations.js";
import {
  errorToast,
  successToast,
} from "../shared/notifications/notifications.js";
import { useAuth } from "../../Services/authContext/AuthContext.jsx";

const EditProfile = () => {
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    email: "",
    password: "",
    idRole: 1,
  });
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  const { user, token, setUser } = useAuth();
  const { userId } = useParams();
  const adminPerm = user.idRole === 3 ? true : false;

  useEffect(() => {
    fetch(`http://localhost:3000/editprofile/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserData({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          dni: data.user.dni,
          email: data.user.email,
          password: "",
          idRole: data.user.idRole,
        });
        setRoles(data.roles);
      })
      .catch((err) => {
        console.log(err);
        navigate("/unauthorized");
      });
  }, []);

  const handleChangeFirstName = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, firstName: value });
    setErrors({ ...errors, firstName: validateFirstName(value) });
  };

  const handleChangeLastName = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, lastName: value });
    setErrors({ ...errors, lastName: validateLastName(value) });
  };

  const handleChangeDni = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, dni: value });
    setErrors({ ...errors, dni: validateDni(value) });
  };

  const handleChangeEmail = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, email: value });
    setErrors({ ...errors, email: validateEmail(value) });
  };

  const handleChangePassword = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, password: value });
    setErrors({ ...errors, password: validatePassword(value) });
  };

  const handleChangeIdRole = (e) => {
    const value = e.target.value;
    setUserData({ ...userData, idRole: value });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = {
      firstName: validateFirstName(userData.firstName),
      lastName: validateLastName(userData.lastName),
      dni: validateDni(userData.dni),
      email: validateEmail(userData.email),
      password: validatePassword(userData.password),
    };

    setErrors(formErrors);

    const hasErrors = Object.values(formErrors).some((err) => err !== "");

    if (hasErrors) {
      console.log(formErrors);

      errorToast("Hay algunos campos incorrectos, revisalos.");
      return;
    }

    fetch(`http://localhost:3000/editprofile/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify({
        userData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!adminPerm) {
          setUser(data.user);
        }
        console.log(data), successToast(data.message);
      })
      .catch((err) => console.log(err));

    navigate(-1);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <Card className="mt-1 mb-1">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-1">
                  <Form.Label>Primer nombre *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre"
                    onChange={handleChangeFirstName}
                    value={userData.firstName}
                    isInvalid={errors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-1">
                  <Form.Label>Apellido *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su apellido"
                    onChange={handleChangeLastName}
                    value={userData.lastName}
                    isInvalid={errors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-1">
                  <Form.Label>DNI *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su DNI"
                    onChange={handleChangeDni}
                    value={userData.dni}
                    isInvalid={errors.dni}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dni}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-1">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el email"
                    onChange={handleChangeEmail}
                    value={userData.email}
                    isInvalid={errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                {!adminPerm ? (
                  <Form.Group className="mb-1">
                    <Form.Label>Contraseña *</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingrese su contraseña"
                      onChange={handleChangePassword}
                      value={userData.password}
                      isInvalid={errors.password}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                ) : (
                  <>
                    <Form.Group>
                      <Form.Label>Rol del usuario</Form.Label>
                      <Form.Select
                        key={roles.idRole}
                        value={userData.idRole}
                        onChange={handleChangeIdRole}
                      >
                        {roles.map((el) => (
                          <option value={el.idRole}>{el.roleSumary}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </>
                )}
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center align-items-center gap-3 mt-1">
                <Button variant="secondary" onClick={handleBackClick}>
                  Regresar
                </Button>
                <Button variant="primary" type="submit">
                  Confirmar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditProfile;
