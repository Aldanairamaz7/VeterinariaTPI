import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button, Typography } from "@mui/material";
import "../Tables/PetTable.css";
import { useNavigate } from "react-router";

const PetTable = ({ data, adminPanel = false }) => {
  const navigate = useNavigate();

  const handleEditPet = (id) => {
    navigate(`/editpet/${id}`);
  };
  const imageDefaul =
    "https://thumbs.dreamstime.com/b/icono-amistoso-del-animal-dom%C3%A9stico-verde-vector-147853354.jpg";

  const columns = [
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "age",
      header: "Edad",
    },
    {
      accessorKey: "breed",
      header: "Raza",
    },
    ...(adminPanel
      ? [
          {
            id: "user",
            header: "Dueño",
            Cell: ({ row }) => {
              const pet = row.original;
              return <p>{pet.user.firstName + " " + pet.user.lastName}</p>;
            },
          },
          {
            id: "dni",
            header: "Dni dueño",
            Cell: ({ row }) => {
              const pet = row.original;
              return <p>{pet.user.dni}</p>;
            },
          },
        ]
      : []),

    {
      id: "imageURL",
      header: "Foto",
      Cell: ({ row }) => {
        const pet = row.original;
        return (
          <Box className="pet-table-image-container">
            <img
              src={pet.imageURL ? pet.imageURL : imageDefaul}
              className="pet-table-image"
            />
          </Box>
        );
      },
    },
    {
      id: "actions",
      header: "Acciones",
      Cell: ({ row }) => {
        const pet = row.original;
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
              color="info"
              size="sm"
              onClick={() => {
                handleEditPet(pet.id);
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
        fontSize: "1.1rem", // o '16px', '18px', etc.
      },
    },
  });
  return (
    <div className="m-3">
      <MaterialReactTable table={table} />
    </div>
  );
};

export default PetTable;
