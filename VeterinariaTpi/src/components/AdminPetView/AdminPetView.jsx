import { useEffect, useState } from "react";
import PetTable from "../Tables/PetTable";
import { useAuth } from "../../Services/authContext/AuthContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const AdminPetView = () => {
  const [pets, setPets] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/adminpanel/pets", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setPets(data.pets);
      });
  }, []);

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
      <div>
      <PetTable data={pets} adminPanel={true} />
      </div>
    </div>
  );
};

export default AdminPetView;
