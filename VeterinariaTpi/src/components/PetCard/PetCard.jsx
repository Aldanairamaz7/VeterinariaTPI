import React from 'react'
import { Button, Card, CardBody, CardImg, CardSubtitle, CardTitle } from 'react-bootstrap'
import '../PetCard/petCard.css'

function PetCard({ pet }) {
    return (
        <Card className='pet-card'>
            <CardImg
                variant='top'
                src={pet.urlImage}
                className='pet-image'
            />
            <CardBody>
                <CardTitle>{pet.name}</CardTitle>
                <div className='pet-info-hidden'>
                    <CardSubtitle className='mb-2 text-muted'>{pet.type}</CardSubtitle>
                    <CardSubtitle className='mb-2 text-muted'>{pet.age} años</CardSubtitle>
                    <CardSubtitle className='mb-2 text-muted'>{pet.gender}</CardSubtitle>
                    <div className="card-buttons">
                        <Button variant="primary" size="sm" className="me-2">
                            Solicitar Turno
                        </Button>
                        <Button variant="secondary" size="sm">
                            Editar
                        </Button>
                    </div>
                </div>
            </CardBody>

        </Card>
    )
}

export default PetCard