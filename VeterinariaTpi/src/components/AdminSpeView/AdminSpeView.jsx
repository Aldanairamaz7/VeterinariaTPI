import { useEffect, useState } from "react";
import SpecialityTable from "../Tables/SpecialityTable";
import { useAuth } from "../../Services/authContext/AuthContext";

const AdminSpeView = () => {
  const [specialities, setSpecialities] = useState([]);
  const { token } = useAuth();
  useEffect(() => {
    fetch("http://localhost:3000/adminpanel/specialities", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setSpecialities(data.specialities))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <SpecialityTable data={specialities} setData={setSpecialities} />
    </>
  );
};

export default AdminSpeView;
