
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

function ErrorUnauthorized() {
    const navigate = useNavigate()

    const goBack = () => {
        navigate('/')
    }
    return (
        <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
            <h1>No podes entrar, gil.</h1>
            <Button className='w-25 mt-4' onClick={goBack}>Ir al inicio</Button>
        </div>
    )
}

export default ErrorUnauthorized