import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Typography } from "@mui/material";
import ConfirmDeleteModal from "../confirmDeleteModal/ConfirmDeleteModal";
import { useState } from "react";
import { useAuth } from "../../Services/authContext/AuthContext";
import "../UserCard/UserCard.css";
import { useNavigate } from "react-router";

const Table = ({ data }) => {
  const id = data.id;
  const columns = [
    {
      accessorKey: "firstName",
      header: "Nombre",
    },
    {
      accessorKey: "lastName",
      header: "Apellido",
    },
    {
      accessorKey: "dni",
      header: "Dni",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "actions",
      header: "Acciones",
      Cell: ({ row }) => {
        const user = row.original;
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: "0.5rem",
            }}
          >
            <Button variant="outlined" onClick={handleGoUserPets}>
              Ver Mascotas
            </Button>
            <Button onClick={handleModifyUser}>Modificar usuario</Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Elimitar usuario
            </Button>
          </Box>
        );
      },
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();
  const handleConfirmDelete = () => {
    setShowModal(!showModal ? true : false);
  };

  const handleDeleteUser = () => {
    fetch("http://localhost:3000/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data.message))
      .catch((err) => console.log(err));
    setShowModal();
  };

  const handleGoUserPets = () => {
    navigate(`/adminpanel/users/${id}/pets`);
  };

  const handleModifyUser = () => {
    console.log("isAdmin:", data.isAdmin, typeof data.isAdmin);
    console.log(
      "isVeterinarian:",
      data.isVeterinarian,
      typeof data.isVeterinarian
    );

    navigate(`/editarperfil/${id}`);
  };
  const table = useMaterialReactTable({ columns, data });
  return (
    <>
      <MaterialReactTable table={table} />
      <ConfirmDeleteModal
        show={showModal}
        onClose={handleConfirmDelete}
        onConfirm={handleDeleteUser}
        petName={data.firstname}
      />
    </>
  );
};

export default Table;
