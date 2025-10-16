import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Typography } from "@mui/material";
import ConfirmDeleteModal from "../confirmDeleteModal/ConfirmDeleteModal";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../Services/authContext/AuthContext";

const UserTable = ({ data, setUsers }) => {
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
      accessorFn: (row) => row.roles?.roleSumary ?? "Sin rol",
      id: "role",
      header: "Rol",
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
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                handleGoUserPets(user.id);
              }}
            >
              Ver Mascotas
            </Button>
            <Button
              variant="outlined"
              color="info"
              onClick={() => {
                handleModifyUser(user.id);
              }}
            >
              Modificar usuario
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                handleConfirmDelete(user.id);
              }}
            >
              Elimitar usuario
            </Button>
          </Box>
        );
      },
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [idUserDelete, setIdUserDelete] = useState(0);
  const { token } = useAuth();
  const navigate = useNavigate();
  const handleConfirmDelete = (id) => {
    setIdUserDelete(id);
    setShowModal(!showModal);
  };

  const handleDeleteUser = () => {
    fetch("http://localhost:3000/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ idUserDelete }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setUsers(data.allUsers);
        setIdUserDelete(null);
      })
      .catch((err) => console.log(err));
    setShowModal(!showModal);
  };

  const handleGoUserPets = (id) => {
    navigate(`/adminpanel/users/${id}/pets`);
  };

  const handleModifyUser = (id) => {
    navigate(`/editarperfil/${id}`);
  };
  const table = useMaterialReactTable({ columns, data });
  return (
    <div className="m-3">
      <MaterialReactTable table={table} />
      <ConfirmDeleteModal
        show={showModal}
        onClose={handleConfirmDelete}
        onConfirm={handleDeleteUser}
        petName={data.find((u) => u.id === idUserDelete)?.firstName}
      />
    </div>
  );
};

export default UserTable;
