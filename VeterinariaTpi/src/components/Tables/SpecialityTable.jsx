import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Typography } from "@mui/material";
import "../Tables/PetTable.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import ConfirmDeleteModal from "../confirmDeleteModal/ConfirmDeleteModal";
import {
  errorToast,
  successToast,
} from "../shared/notifications/notifications";
import { useAuth } from "../../Services/authContext/AuthContext";
import { MRT_Localization_ES } from "material-react-table/locales/es";

const SpecialityTable = ({ data, setData }) => {
  const { token } = useAuth();
  const [specialityIdDelete, setSpecialityIdDelete] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleEditSpeciality = (id) => {
    navigate(`/editspeciality/${id}`);
  };

  const handleConfirmDelete = (id) => {
    setSpecialityIdDelete(id);
    setShowModal(!showModal);
  };

  const handleDeleteSpeciality = () => {
    fetch(
      `http://localhost:3000/adminpanel/specialities/${specialityIdDelete}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.specialities);
        successToast(data.message);
        setShowModal(!showModal);
      })
      .catch((err) => {
        errorToast(err.message);
        console.log(err);
      });
  };

  const columns = [
    {
      accessorKey: "specialityName",
      header: "Nombre",
    },
    {
      id: "actions",
      header: "Acciones",
      Cell: ({ row }) => {
        const speciality = row.original;
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
                handleConfirmDelete(speciality.idSpeciality);
              }}
            >
              Eliminar especialidad
            </Button>

            <Button
              variant="outlined"
              color="info"
              size="sm"
              onClick={() => {
                handleEditSpeciality(speciality.idSpeciality);
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
          onConfirm={handleDeleteSpeciality}
          petName={
            data.find((s) => s.idSpeciality === specialityIdDelete)
              ?.specialityName
          }
        />
      </div>
    </div>
  );
};

export default SpecialityTable;
