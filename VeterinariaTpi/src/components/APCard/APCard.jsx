import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const APCard = ({ typeCard, summaryFunc, pathFunc }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/adminpanel${pathFunc}`, { replace: true });
  };

  return (
    <>
      <Card className="w-25 h-50 mx-3 my-4">
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="d-flex justify-content-around">
            {typeCard}
          </Card.Title>
          <Card.Text>{summaryFunc}</Card.Text>
          <Button className="align-self-end" onClick={handleClick}>
            {typeCard}
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default APCard;
