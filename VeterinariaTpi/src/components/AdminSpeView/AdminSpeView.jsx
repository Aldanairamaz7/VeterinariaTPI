import { useEffect, useRef, useState } from "react";
import SpecialityTable from "../Tables/SpecialityTable";
import { useAuth } from "../../Services/authContext/AuthContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { successToast } from "../shared/notifications/notifications";

const AdminSpeView = () => {
  const [specialities, setSpecialities] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();
  const fetched= useRef(false);

  useEffect(() => {
    if(fetched.current) return;
    fetched.current = true;
  
  
    fetch("http://localhost:3000/adminpanel/specialities", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setSpecialities(data.specialities)
        successToast(data.message)
      })
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
        <SpecialityTable data={specialities} setData={setSpecialities} />
      </div>
    </div>
  );
};

export default AdminSpeView;
