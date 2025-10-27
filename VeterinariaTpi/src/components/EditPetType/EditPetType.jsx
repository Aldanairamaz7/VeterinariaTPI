import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../Services/authContext/AuthContext";
import {
  errorToast,
  successToast,
} from "../shared/notifications/notifications";
import { validateEditOther, validateOtherType } from "../shared/validations";

const EditTypePet = () => {
  const { idType } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [typePet, setTypePet] = useState({
    idType: 0,
    typePetName: "",
  });
  const [errorState, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/edittype/${idType}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setTypePet({
          idType: data.typePet.idType,
          typePetName: data.typePet.typePetName,
        });
      })
      .catch((err) => {
        errorToast(err.message);
      });
  }, []);

  const handleChangeInput = (e) => {
    setTypePet((prev) => ({ ...prev, typePetName: e.target.value }));
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateEditOther(typePet.typePetName);
    setError(error);

    if (error === "") {
      fetch(`http://localhost:3000/edittype/${idType}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ typePet }),
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
                <Form.Label>Nombre de la especialidad:</Form.Label>
                <Form.Control
                  value={typePet.typePetName}
                  type="text"
                  placeholder="especie"
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

export default EditTypePet;
