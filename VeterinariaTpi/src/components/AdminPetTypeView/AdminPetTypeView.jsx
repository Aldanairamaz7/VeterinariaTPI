import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../Services/authContext/AuthContext'
import { useNavigate } from 'react-router'
import { Button } from 'react-bootstrap'
import PetTypeTable from '../Tables/PetTypeTable'

function AdminPetTypeView() {

    const [types, setTypes] = useState([])
    const { token } = useAuth()
    const navigate = useNavigate()
    const fetched = useRef(false)

    useEffect(() => {
        if (fetched.curret) return;
        fetched.current = true

        fetch("http://localhost:3000/adminpanel/typePet", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                setTypes(data.allTypes)
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
                <PetTypeTable data={types} setData={setTypes} />
            </div>
        </div>
    )
}

export default AdminPetTypeView