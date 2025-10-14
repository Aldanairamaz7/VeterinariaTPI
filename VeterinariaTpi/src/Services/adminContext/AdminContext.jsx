import { createContext, useContext } from "react";

export const AdminContext = createContext({
  users: [],
  pets: [],
  setUsers: () => {},
  setPets: () => {},
});

export const useAdmin = () => useContext(AdminContext);
