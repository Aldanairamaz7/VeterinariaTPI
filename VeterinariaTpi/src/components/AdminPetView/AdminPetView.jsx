import { useEffect, useState } from "react";
import PetTable from "../Tables/PetTable";
import { useAuth } from "../../Services/authContext/AuthContext";

const AdminPetView = () => {
  const [pets, setPets] = useState([]);
  const { token } = useAuth();
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
  return (
    <>
      <PetTable data={pets} adminPanel={true} />
    </>
  );
};

export default AdminPetView;
