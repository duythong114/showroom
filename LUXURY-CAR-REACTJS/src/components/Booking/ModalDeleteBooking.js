import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalDeleteBooking = (props) => {

    return (
        <>
            <Modal show={props.deleteBookingShow} onHide={props.deleteBookingClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm delete booking: ID {props.dataDeleteModal?.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this booking?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.deleteBookingClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-danger" onClick={props.handleDeleteBooking}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteBooking;