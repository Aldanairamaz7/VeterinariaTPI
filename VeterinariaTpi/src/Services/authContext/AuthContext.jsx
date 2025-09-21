import { createContext, useContext } from "react";

export const AuthContext = createContext({
  token: null,
  user: null,
  userLogin: () => {},
  userLogout: () => {},
  fetchUser: () => {},
  addPet: () => {},
  removePet: () => {},
});

export const useAuth = () => useContext(AuthContext);
