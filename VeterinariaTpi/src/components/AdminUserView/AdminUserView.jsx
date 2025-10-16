import { useEffect, useState } from "react";
import { useAuth } from "../../Services/authContext/AuthContext";
import UserCard from "../UserCard/UserCard";
import Table from "./Table";

const AdminUserView = () => {
  const [users, setUsers] = useState([]);
  const { token } = useAuth();

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

  return (
    <div className="w-100 h-100 py-3">
      {users.map((el) => (
        <UserCard
          key={el.id}
          firstname={el.firstName}
          lastname={el.lastName}
          dni={el.dni}
          email={el.email}
          password={el.password}
          id={el.id}
          pets={el.pets}
          isAdmin={!!el.isAdmin}
          isVeterinarian={!!el.isVeterinarian}
        />
      ))}
      <Table data={users} />
    </div>
  );
};

export default AdminUserView;
