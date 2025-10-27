import React, { useState } from 'react'
import { useAuth } from '../../Services/authContext/AuthContext'
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { Box, Button } from "@mui/material"
import { MRT_Localization_ES } from 'material-react-table/locales/es'
import { errorToast, successToast } from '../shared/notifications/notifications'
import ConfirmDeleteModal from '../Modals/ConfirmDeleteModal'


const BreedTable = ({ data, setData }) => {

    const { token } = useAuth()
    const [breedIdToDelete, setBreedIdToDelete] = useState(0)
    const [showModal, setShowModal] = useState(false)

    const handleConfirmDelete = (id) => {
        setBreedIdToDelete(id)
        setShowModal(!showModal)

    }

    const handleDeleteBreed = async () => {
        console.log(breedIdToDelete);

        try {
            const res = await fetch(
                `http://localhost:3000/adminpanel/breed/${breedIdToDelete}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            const resData = await res.json()

            if (!res.ok) {
                errorToast(resData.message)
                setShowModal(false)
                setBreedIdToDelete(0)
                return;
            }
            setData(resData.allBreeds)
            setShowModal(false);
            setBreedIdToDelete(0);
            successToast('Raza eliminada correctamente.')
        } catch (err) {
            console.log(err);


        }
    }

    const columns = [
        {
            accessorKey: 'nameBreed',
            header: 'Nombre de la raza'
        },
        {
            id: 'actions',
            header: 'Accion',
            Cell: ({ row }) => {
                const breed = row.original;

                return (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '0.5rem',
                            size: 50,
                        }}
                    >
                        <Button
                            variant='outlined'
                            color='error'
                            onClick={() => {
                                handleConfirmDelete(breed.idBreed)
                            }}
                        >
                            Eliminar Raza
                        </Button>

                    </Box >
                );
            },
        },
    ]

    const table = useMaterialReactTable({
        columns,
        data,
        muiTableBodyCellProps: {
            sx: {
                fontSize: '1.1rem'
            },
        },
        localization: MRT_Localization_ES,
    })

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="m-3 w-50">
                <MaterialReactTable table={table} />
                <ConfirmDeleteModal
                    show={showModal}
                    onClose={handleConfirmDelete}
                    onConfirm={handleDeleteBreed}
                    petName={
                        data.find((b) => b.idBreed === breedIdToDelete)
                            ?.breedName
                    }
                />
            </div>
        </div>
    )
}

export default BreedTable