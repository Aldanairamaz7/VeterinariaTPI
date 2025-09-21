
import { Button, Card, CardBody, CardImg, CardSubtitle, CardTitle } from 'react-bootstrap'
import '../PetCard/petCard.css'
import { useNavigate } from 'react-router'

function PetCard({ pet }) {

    const navigate = useNavigate();

    const handleRequestShiftClick = () => {
        navigate("/solicitarturno");
    }

    const handleEditPet = () => {
        navigate("/editarmascota")
    }

    return (
        <Card className='pet-card'>
            <CardImg
                variant='top'
                src={pet.imageURL}
                className='pet-image'
            />
            <CardBody>
                <CardTitle>{pet.name}</CardTitle>
                <div className='pet-info-hidden'>
                    <CardSubtitle className='mb-2 text-muted'>{pet.breed}</CardSubtitle>
                    <CardSubtitle className='mb-2 text-muted'>{pet.age} años</CardSubtitle>
                    <div className="card-buttons">
                        <Button variant="primary" size="sm" className="me-2" onClick={handleRequestShiftClick}>
                            Solicitar Turno
                        </Button>
                        <Button variant="secondary" size="sm" onClick={handleEditPet}>
                            Editar
                        </Button>
                    </div>
                </div>
            </CardBody>

        </Card>
    )
}

export default PetCard