import { Col, Container, Row } from 'react-bootstrap'
import PetCard from '../PetCard/PetCard'
import UserNavbar from '../UserNavbar/UserNavbar'
import { useAuth } from '../../Services/authContext/AuthContext'

function UserPanel() {

    const { user } = useAuth()

    if (!user) return <p>Cargando usuario...</p>

    const pets = user.pets || []

    return (
        <>
            <UserNavbar user={user} />
            <Container className='user-panel mt-3 mb-4'>
                <h3>{user.firstName}, tus mascotas:</h3>
                <Row>
                    {pets.length === 0 ? (
                        <p>No hay mascotas registradas</p>
                    ) : (
                        pets.map((pet) => (
                            <Col key={pet.id} md={4}>
                                <PetCard pet={pet} />
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </>


    )
}

export default UserPanel