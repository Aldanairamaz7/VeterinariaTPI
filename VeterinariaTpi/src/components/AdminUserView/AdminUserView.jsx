import { useEffect, useState } from "react";
import { useAuth } from "../../Services/authContext/AuthContext";

const AdminUserView = () => {
  const [users, setUsers] = useState();
  const { token } = useAuth();

  useEffect(() => {
    fetch("http://localhost:3000/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return <div className="w-100 h-100"></div>;
};

export default AdminUserView;
