import { useState } from "react";
import { AdminContext } from "./AdminContext";

export const AdminContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);

  return (
    <AdminContext.Provider
      value={{
        users,
        pets,
        setPets,
        setUsers,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
