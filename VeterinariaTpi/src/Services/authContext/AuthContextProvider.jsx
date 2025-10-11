import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userLogin = async (email, password) => {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    localStorage.setItem("vetCare-token", data.token);
    setToken(data.token);
    console.log(data.user);
    await fetchUser();
  };

  const userLogout = () => {
    localStorage.removeItem("vetCare-token"), setToken(null);
    setUser(null);
  };

  const fetchUser = async () => {
    const storedToken = localStorage.getItem("vetCare-token");
    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);
    try {
      const res = await fetch("http://localhost:3000/user/me", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
      } else {
        userLogout();
      }
    } catch (error) {
      console.error(error);
      userLogout();
    } finally {
      setLoading(false);
    }
  };

  const addPet = async (petData) => {
    try {
      const res = await fetch("http://localhost:3000/addpet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(petData),
      });
      const pet = await res.json();
      if (!res.ok) throw new Error(pet.message);

      setUser((prev) => ({
        ...prev,
        pets: [...(prev.pets || []), pet],
      }));
    } catch (err) {
      console.log("Error al agregar mascota", err.message);
    }
  };

  const removePet = async (petId) => {
    try {
      const res = await fetch(`http://localhost:3000/pets/${petId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("No se pudo eliminar la mascota");

      setUser((prev) => ({
        ...prev,
        pets: prev.pets.filter((pet) => pet.id !== petId),
      }));
    } catch (err) {
      console.log("Error al eliminar mascota", err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        setUser,
        userLogin,
        userLogout,
        fetchUser,
        addPet,
        removePet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
