import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Button } from "react-bootstrap";
import { useAdmin } from "../../Services/adminContext/AdminContext";
import { useAuth } from "../../Services/authContext/AuthContext";
import PetTable from "../Tables/PetTable";

const AdminUserPetView = () => {
  const { pets, setPets } = useAdmin();
  const { id } = useParams();
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
      .then((data) => setPets([...data.pets]))
      .catch((err) => console.log(err));
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
        <PetTable data={pets} />
      </div>
    </div>
  );
};

export default AdminUserPetView;
