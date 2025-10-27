import { useEffect, useState } from "react";
import { useAuth } from "../../Services/authContext/AuthContext";
import { MaterialReactTable } from "material-react-table";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
import { Box, Button } from "@mui/material";
import {
  errorToast,
  successToast,
} from "../shared/notifications/notifications";
import FinishShiftModal from "../Modals/FinishShiftModal";
import { MRT_Localization_ES } from "material-react-table/locales/es";

const VeterinarianPanel = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [shiftToCancel, setShiftToCancel] = useState(0);
  const [enrollment, setEnrollment] = useState(0);
  const [action, setAction] = useState("");

  const handleConfirmCancel = (shift, enrollment, act, setter) => {
    setShiftToCancel(shift);
    setEnrollment(enrollment);
    setter(true);
    setAction(act);
  };

  const handleCancelShift = async () => {
    fetch(`http://localhost:3000/shifts/${shiftToCancel}/${enrollment}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`No se pudo ${action} el turno`);
        }

        return res.json();
      })
      .then((data) => {
        console.log(data.formatedShift);

        setShifts(data.formatedShift);
        setShowModal(false);
        setShowFinishModal(false);
        setShiftToCancel(null);
        successToast(`Turno ${action} exitosamente`);
      })
      .catch((err) => {
        errorToast(err);
      });
  };
  useEffect(() => {
    const fetchShifts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:3000/veterinarian/${user.id}/shifts`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Error al obtener los turnos");
        const data = await res.json();
        setShifts(data.shiftList || []);
        setEnrollment(data.veterinarian.enrollment);
      } catch (err) {
        setError("No se pudieron cargar los turnos");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchShifts();
  }, [token, user.id]);

  const columns = [
    {
      accessorKey: "dateTime",
      header: "Fecha",
      Cell: ({ cell }) => {
        const [year, month, day] = cell.getValue().split("-");
        return `${day}/${month}/${year}`;
      },
    },
    {
      header: "Mascota",
      accessorFn: (row) => row.pet?.name || "-",
    },
    {
      header: "Tipo de mascota",
      accessorFn: (row) => row.pet?.typePetData?.typePetName || "-",
    },
    {
      header: "Raza",
      accessorFn: (row) => row.pet?.breedData?.nameBreed || "-",
    },
    {
      header: "Cliente",
      accessorFn: (row) =>
        `${row.client?.firstName || ""} ${row.client?.lastName || ""}`,
    },
    {
      header: "Tipo de consulta",
      accessorKey: "typeConsult",
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
      header: "Descripción",
      accessorKey: "description",
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "0.5rem",
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                handleConfirmCancel(
                  shift.id,
                  enrollment,
                  "Cancelado",
                  setShowModal
                );
              }}
            >
              Cancelar Turno
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                handleConfirmCancel(
                  shift.id,
                  enrollment,
                  "Atendido",
                  setShowFinishModal
                );
              }}
            >
              Finalizar Turno
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Turnos asignados:</h2>
      {loading ? (
        <p>Cargando turnos...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : shifts.length === 0 ? (
        <p>No hay turnos asignados aún.</p>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={shifts}
          enableSorting
          enablePagination
          localization={MRT_Localization_ES}
          state={{ isLoading: loading }}
          muiTablePaperProps={{
            sx: { p: 2, boxShadow: 2, borderRadius: "10px" },
          }}
        />
      )}
      <FinishShiftModal
        show={showFinishModal}
        onClose={() => {
          setShowFinishModal(false);
        }}
        onConfirm={handleCancelShift}
      />
      <ConfirmDeleteModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        onConfirm={handleCancelShift}
      />
    </div>
  );
};

export default VeterinarianPanel;
