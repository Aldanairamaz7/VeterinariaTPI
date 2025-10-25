import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Button } from "@mui/material";
import { useAuth } from "../../Services/authContext/AuthContext";
import { useEffect, useState } from "react";
import ConfirmDeleteModal from "../confirmDeleteModal/ConfirmDeleteModal";
import {
  errorToast,
  successToast,
} from "../shared/notifications/notifications";
import { useNavigate } from "react-router";
import { MRT_Localization_ES } from "material-react-table/locales/es";

const ShiftHistory = () => {
  const { user, token } = useAuth();
  const [shift, setShift] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [shiftToCancel, setShiftToCancel] = useState(null);

  const handleConfirmCancel = (shift) => {
    setShiftToCancel(shift);
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3000/${user.id}/misturnos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos recibidos:", data);
        if (Array.isArray(data)) {
          setShift(data);
        } else {
          setShift([]);
        }
      })
      .catch((err) => {
        console.error("Error al obtener turnos", err);
      });
  }, [user]);

  const handleDeleteShift = () => {
    fetch(`http://localhost:3000/shifts/${shiftToCancel.id}/${user.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo cancelar el turno");
        }

        return res.json();
      })
      .then((data) => {
        console.log(data);

        setShift(data.formatedShift);
        setShowModal(false);
        successToast("Turno cancelado exitosamente");
      })
      .catch((err) => {
        errorToast(err);
      });
  };

  const columns = [
    {
      accessorKey: "name",
      header: "Mascota",
    },
    {
      accessorKey: "breed",
      header: "Raza",
    },
    {
      accessorKey: "dateTime",
      header: "Fecha",
      Cell: ({ cell }) => {
        const date = new Date(cell.getValue());
        const options = {
          timeZone: "America/Argentina/Buenos_Aires",
        };
        return date.toLocaleDateString("es-AR", options);
      },
    },
    {
      accessorKey: "typeConsult",
      header: "Tipo de Consulta",
    },
    {
      accessorKey: "description",
      header: "Descripción",
    },
    {
      accessorKey: "state",
      header: "Estado",
    },
    {
      id: "actions",
      header: "Acciones",
      Cell: ({ row }) => {
        const shift = row.original;

        if (shift.state === "Cancelado" || shift.state === "Atendido") {
          return null;
        }

        return (
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              handleConfirmCancel(shift);
            }}
          >
            Cancelar Turno
          </Button>
        );
      },
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: shift,
    enableColumnResizing: true,
    enableGlobalFilter: true,
    enablePagination: true,
    enableSorting: true,
    localization: MRT_Localization_ES,
  });

  return (
    <div className="m-3">
      <h3>Historial de Turnos</h3>
      <MaterialReactTable table={table} />
      <ConfirmDeleteModal
        show={showModal}
        onClose={handleConfirmCancel}
        onConfirm={handleDeleteShift}
        petName={shiftToCancel?.petName}
      />
    </div>
  );
};

export default ShiftHistory;
