import { Button, Modal } from 'react-bootstrap'

const ConfirmDeleteModal = ({ show, onClose, onConfirm, petName }) => {
  return (
    <>
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header>
                <Modal.Title>Confirmar eliminacion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    ¿Estás seguro de que querés eliminar a {petName}?
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant='danger' onClick={onConfirm}>
                    Si, eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default ConfirmDeleteModal