import { Button, Modal } from "react-bootstrap";

const FinishShiftModal = ({ show, onClose, onConfirm }) => {
  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header>
          <Modal.Title>Confirmar Finalizacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>{<p>¿Estas seguro de finalizar el turno?</p>}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>

          <Button variant="success" onClick={onConfirm}>
            Si, Finalizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FinishShiftModal;
