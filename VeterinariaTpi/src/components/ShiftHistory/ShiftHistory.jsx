import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Button } from "@mui/material";
import { useAuth } from "../../Services/authContext/AuthContext";
import { useEffect, useState } from "react";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
import {
  errorToast,
  successToast,
} from "../shared/notifications/notifications";
import { MRT_Localization_ES } from "material-react-table/locales/es";

const ShiftHistory = () => {
  const { user, token } = useAuth();
  const [shift, setShift] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [shiftToCancel, setShiftToCancel] = useState(null);
  const [action, setAction] = useState("");

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
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo cancelar el turno");
        }

        return res.json();
      })
      .then((data) => {
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
        const [year, month, day] = cell.getValue().split("-");
        return `${day}/${month}/${year}`;
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
      accessorKey: "vetName",
      header: "Veterianrio",
    },
    {
      header: "Estado",
      accessorKey: "state",
      Cell: ({ cell }) => {
        const value = cell.getValue();
        const color =
          value === "Pendiente"
            ? "orange"
            : value === "Atendido"
            ? "#81C784"
            : value === "Cancelado"
            ? "red"
            : "grey";
        return <span style={{ color, fontWeight: "bold" }}>{value}</span>;
      },
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
              setAction("Cancelado");
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
