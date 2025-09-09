import React, { useState } from 'react'
import { userModel } from '../../data/userModel'
import { Col, Container, Row } from 'react-bootstrap'
import PetCard from '../PetCard/PetCard'
import UserNavbar from '../UserNavbar/UserNavbar'
import Footer from '../Footer/Footer'

function UserPanel() {

    const [user] = useState(userModel)

    return (
        <>
            <UserNavbar user={user} />
            <Container className='user-panel mt-3 mb-4'>
                <h3>{user.name}, tus mascotas:</h3>
                <Row>
                    {user.pets.map((pet, idx) => (
                        <Col key={idx} md={4}>
                            <PetCard pet={pet} />

                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </>


    )
}

export default UserPanel