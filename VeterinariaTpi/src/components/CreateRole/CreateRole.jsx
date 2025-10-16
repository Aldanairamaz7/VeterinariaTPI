import { useState } from "react";
import { Card, Col, Form, Row, Button } from "react-bootstrap";

const CreateRole = () => {
  const [rol, setRol] = useState("");

  const handleChangeValue = (e) => {
    setRol(e.target.value);
  };

  const handleSendRol = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/createrole", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        rol,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const handleDeleteRol = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/createrole", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Form onSubmit={handleSendRol}>
        <Form.Group>
          <Form.Label>Nombre Rol</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese nombre del rol"
            value={rol}
            onChange={handleChangeValue}
          />
        </Form.Group>
        <Button type="submit">envir rol</Button>
        <Button onClick={handleDeleteRol}>borrar rol</Button>
      </Form>
    </div>
  );
};

export default CreateRole;
