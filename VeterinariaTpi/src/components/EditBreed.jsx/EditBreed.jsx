import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../Services/authContext/AuthContext";
import {
  errorToast,
  successToast,
} from "../shared/notifications/notifications";
import { validateEditOther, validateOtherType } from "../shared/validations";

const EditBreed = () => {
  const { idBreed } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [breed, setBreed] = useState({
    idBreed: 0,
    nameBreed: "",
    idTypePet: 0,
  });
  const [errorState, setError] = useState("");
  useEffect(() => {
    fetch(`http://localhost:3000/editbreed/${idBreed}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBreed({
          idBreed: data.breed.idBreed,
          nameBreed: data.breed.nameBreed,
          idTypePet: data.breed.idTypePet,
        });
      })
      .catch((err) => {
        errorToast(err.message);
      });
  }, []);

  const handleChangeInput = (e) => {
    setBreed((prev) => ({ ...prev, nameBreed: e.target.value }));
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateEditOther(breed.nameBreed);
    setError(error);

    if (error === "") {
      fetch(`http://localhost:3000/editbreed/${idBreed}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ breed }),
        method: "PUT",
      })
        .then(async (res) => {
          if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || "Ocurrio algo mal");
          }
          return res.json();
        })
        .then((data) => {
          successToast(data.message);
          navigate(-1);
        })
        .catch((err) => {
          errorToast(err.message);
        });
    }
  };
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <Card style={{ width: "25%", height: "30%" }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-2">
              <Form.Group>
                <Form.Label>Nombre de la raza:</Form.Label>
                <Form.Control
                  value={breed.nameBreed}
                  type="text"
                  placeholder="raza"
                  onChange={handleChangeInput}
                  isInvalid={!!errorState}
                />
                <Form.Control.Feedback type="invalid">
                  {errorState}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Col className="d-flex justify-content-between">
                <Button variant="secondary" onClick={handleBackClick}>
                  Regresar
                </Button>
                <Button variant="primary" type="submit" className="h-100">
                  Enviar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditBreed;
