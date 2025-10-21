import { useNavigate } from "react-router";
import APCard from "../APCard/APCard";
import AdminFunction from "./AdminFunction.js";
import { Button } from "react-bootstrap";


const AdminPanel = () => {
  const navigate = useNavigate();
  

  const handleBack = () => {
    navigate(-1)
  }
  return (
    <div>
      <div className="m-3">
        <Button variant="secondary" onClick={handleBack}>
          Regresar
        </Button>
      </div>
      <div className="w-100 h-50 d-flex flex-wrap justify-content-around align-items-center">
        {AdminFunction.map((el) => (
          <APCard
            typeCard={el.typeFunc}
            summaryFunc={el.summaryFunc}
            pathFunc={el.pathFunc}
            key={el.typeCard}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
