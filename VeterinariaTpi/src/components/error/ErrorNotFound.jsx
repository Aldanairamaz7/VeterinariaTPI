import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import nf404 from '../../assets/not_found.jpg'
import './errorNotFound.css'

function ErrorNotFound() {
    const navigate = useNavigate()

    const goBack = () => {
        navigate('/')
    }
    return (
        <div className='notfound-container'>
            <Card className='notfound-card'>
                <Card.Img
                    variant="top"
                    src={nf404}
                    alt="Error 404 - Página no encontrada"

                />
                <Card.Body>
                    <Card.Title as="h2" className="notfound-title">Página no encontrada</Card.Title>
                    <Card.Text className="notfound-text">
                        Lo sentimos, la página que estas buscando, no existe.
                    </Card.Text>
                    <Button variant="primary" className="notfound-button" onClick={goBack}>
                        Volver al inicio
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ErrorNotFound