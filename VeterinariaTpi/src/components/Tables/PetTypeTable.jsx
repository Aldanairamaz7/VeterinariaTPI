import React, { useState } from "react";
import { useAuth } from "../../Services/authContext/AuthContext";
import {
  errorToast,
  successToast,
} from "../shared/notifications/notifications";
import { Box, Button } from "@mui/material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
import { useNavigate } from "react-router";

const PetTypeTable = ({ data, setData }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [typeIdToDelete, setTypeIdToDelete] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleConfirmDelete = (id) => {
    setTypeIdToDelete(id);
    setShowModal(!showModal);
  };

  const handleDeletePetType = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/adminpanel/typePet/${typeIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const resData = await res.json();

      if (!res.ok) {
        errorToast(resData.message);
        setShowModal(false);
        setTypeIdToDelete(0);
        return;
      }
      setData(resData.allTypes);
      setShowModal(false),
        setTypeIdToDelete(0),
        successToast("Tipo de mascota eliminado correctamente");
    } catch (err) {
      errorToast(err.message);
    }
  };

  const columns = [
    {
      accessorKey: "typePetName",
      header: "Tipo de mascota:",
    },
    {
      id: "actions",
      header: "Accion",
      Cell: ({ row }) => {
        const typePet = row.original;

        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
              size: 50,
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                handleConfirmDelete(typePet.idType);
              }}
            >
              Eliminar Tipo de Mascota
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                navigate(`/edittype/${typePet.idType}`);
              }}
            >
              Editar
            </Button>
          </Box>
        );
      },
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    muiTableBodyCellProps: {
      sx: {
        fontSize: "1.1rem",
      },
    },
    localization: MRT_Localization_ES,
  });

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="m-3 w-50">
        <MaterialReactTable table={table} />
        <ConfirmDeleteModal
          show={showModal}
          onClose={handleConfirmDelete}
          onConfirm={handleDeletePetType}
          petName={data.find((p) => p.idType === typeIdToDelete)?.typePetName}
        />
      </div>
    </div>
  );
};

export default PetTypeTable;
