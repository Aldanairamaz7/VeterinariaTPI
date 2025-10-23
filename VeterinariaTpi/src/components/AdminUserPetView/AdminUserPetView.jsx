import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Button } from "react-bootstrap";
import { useAdmin } from "../../Services/adminContext/AdminContext";
import { useAuth } from "../../Services/authContext/AuthContext";
import PetTable from "../Tables/PetTable";

const AdminUserPetView = () => {
  const { pets, setPets } = useAdmin();
  const { id } = useParams();
  const [owner, setOwner] = useState(null)
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/adminpanel/users/${id}/pets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPets([...data.pets])
        setOwner(data.user || null)
      })
      .catch((err) => console.log(err));
  }, []);

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <div className="m-3">
        <Button variant="secondary" className="m-1" onClick={handleBack}>
          Regresar
        </Button>
        {owner ? (
          <h1>Mascotas de: {owner.firstName} {owner.lastName}</h1>
        ) : (
          <h1>Cargando datos del usuario...</h1>
        )}
      </div>
      <div>
        <PetTable data={pets} />
      </div>
    </div>
  );
};

export default AdminUserPetView;
