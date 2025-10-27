import { useEffect, useState } from "react";
import { useAuth } from "../../Services/authContext/AuthContext";
import { MaterialReactTable } from "material-react-table";
import ConfirmDeleteModal from "../confirmDeleteModal/ConfirmDeleteModal";
import { Box, Button } from "@mui/material";
import {
  errorToast,
  successToast,
} from "../shared/notifications/notifications";

const VeterinarianPanel = () => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [shiftToCancel, setShiftToCancel] = useState(0);
  const [enrollment, setEnrollment] = useState(0);

  const handleConfirmCancel = (shift, enrollment) => {
    console.log(shift, enrollment);

    setShiftToCancel(shift);
    setEnrollment(enrollment);
    setShowModal(true);
  };

  const handleCancelShift = async () => {
    fetch(`http://localhost:3000/shifts/${shiftToCancel}/${enrollment}`, {
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

        setShifts(data.formatedShift);
        setShowModal(false);
        setShiftToCancel(null);
        successToast("Turno cancelado exitosamente");
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
        console.error(err);
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
            : value === "Completado"
            ? "green"
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
                handleConfirmCancel(shift.id, shift.enrollment);
              }}
            >
              Cancelar Turno
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                handleConfirmCancel(shift.id, shift.enrollment);
                handleCancelShift();
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
          state={{ isLoading: loading }}
          muiTablePaperProps={{
            sx: { p: 2, boxShadow: 2, borderRadius: "10px" },
          }}
        />
      )}
      <ConfirmDeleteModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        onConfirm={handleCancelShift}
        petName={shiftToCancel?.petName}
      />
    </div>
  );
};

export default VeterinarianPanel;
