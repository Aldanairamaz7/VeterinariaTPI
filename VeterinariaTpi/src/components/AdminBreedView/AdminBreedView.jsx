import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../Services/authContext/AuthContext'
import { useNavigate } from 'react-router'
import { successToast } from '../shared/notifications/notifications'
import { Button } from 'react-bootstrap'
import BreedTable from '../Tables/BreedTable'

function AdminBreedView() {

    const [breeds, setBreeds] = useState([])
    const { token } = useAuth()
    const navigate = useNavigate()
    const fetched = useRef(false)

    useEffect(() => {
        if (fetched.current) return;
        fetched.current = true;

        fetch("http://localhost:3000/adminpanel/breed", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setBreeds(data.allBreeds)
                successToast(data.message)
            })
            .catch((err) => console.log(err))

    }, [])

    const handleBack = () => {
        navigate(-1)
    }


    return (
        <div>
            <div className="m-3">
                <Button variant="secondary" onClick={handleBack}>
                    Regresar
                </Button>
            </div>
            <div>
                <BreedTable data={breeds} setData={setBreeds} />
            </div>
        </div>
    )
}

export default AdminBreedView