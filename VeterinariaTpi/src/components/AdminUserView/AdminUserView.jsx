import { useEffect, useState } from "react";
import { useAuth } from "../../Services/authContext/AuthContext";
import UserCard from "../UserCard/UserCard";
import UserTable from "../Tables/UserTable";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

const AdminUserView = () => {
  const [users, setUsers] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/adminpanel/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers([...data]);
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
      <div className="w-100 h-100 py-3">
        <UserTable data={users} setUsers={setUsers} />
      </div>
    </div>
  );
};

export default AdminUserView;
