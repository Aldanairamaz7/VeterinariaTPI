import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import PetCard from "../PetCard/PetCard";
import { Col, Container, Row } from "react-bootstrap";
import { useAdmin } from "../../Services/adminContext/AdminContext";
import { useAuth } from "../../Services/authContext/AuthContext";
import PetTable from "../Tables/PetTable";

const AdminUserPetView = () => {
  const { pets, setPets } = useAdmin();
  const { id } = useParams();
  const { user, token } = useAuth();
  console.log(id);

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

  return (
    <div>
      <PetTable data={pets} />
    </div>
  );
};

export default AdminUserPetView;
