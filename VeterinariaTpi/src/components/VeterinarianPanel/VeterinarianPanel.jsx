import { useEffect, useState } from "react";
import { useAuth } from "../../Services/authContext/AuthContext";
import { MaterialReactTable } from "material-react-table";


const VeterinarianPanel = () => {

  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')
  const { token, user } = useAuth()

  useEffect(() => {
    const fetchShifts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:3000/veterinarian/${user.id}/shifts`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener los turnos");
        const data = await res.json();
        setShifts(data.shiftList || []);
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
        const date = new Date(cell.getValue());
        const options = {
          timeZone: "America/Argentina/Buenos_Aires",
        };
        return date.toLocaleDateString("es-AR", options);
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
      accessorFn: (row) => `${row.client?.firstName || ""} ${row.client?.lastName || ""}`,
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
              : "gray";
        return <span style={{ color, fontWeight: "bold" }}>{value}</span>;
      },
    },
    {
      header: "Descripción",
      accessorKey: "description",
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
          muiTablePaperProps={{ sx: { p: 2, boxShadow: 2, borderRadius: "10px" } }}
        />
      )}
    </div>
  );
};

export default VeterinarianPanel;
