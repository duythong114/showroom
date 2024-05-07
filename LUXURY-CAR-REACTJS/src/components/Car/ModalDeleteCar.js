import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDeleteCar = (props) => {

    return (
        <>
            <Modal show={props.deleteCarShow} onHide={props.deleteCarClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete car</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this car: {props.dataDeleteModal?.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.deleteCarClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-danger" onClick={props.handleDeleteCar}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteCar;