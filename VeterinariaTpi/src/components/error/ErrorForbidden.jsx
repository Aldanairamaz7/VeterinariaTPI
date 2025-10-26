import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import forbiddenImg from '../../assets/403forbidden.jpg'
import notPass from '../../assets/notPass.jpg'
import { useState } from "react";
import './errorForbidden.css'

const ErrorForbidden = () => {
  const navigate = useNavigate();
  const [showG, setShowG] = useState(false)

  const toggleG = () => setShowG(prev => !prev)

  const goBack = () => {
    navigate("/");
  };
  return (
    <div className="forbidden-container">
      <Card className='forbidden-card'>
        <Card.Img
          variant="top"
          src={showG ? notPass : forbiddenImg}
          alt="Error 403 - Acceso denegado"
          onClick={toggleG}
          className={`forbidden-img ${showG ? 'gandalf' : ''}`}
        />
        <Card.Body>
          <Card.Title as="h2" className="mb-3">
            {showG
              ? 'You shall not pass!'
              : 'Acceso Denegado'}
          </Card.Title>
          <Card.Text className="forbidden-text">
            {showG
              ? ''
              : 'No posees los permisos para acceder.'
            }
          </Card.Text>
          <Button variant="primary" className="forbidden-button" onClick={goBack}>
            Volver al inicio
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ErrorForbidden;
