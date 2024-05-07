import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalCancelBooking = (props) => {

    return (
        <>
            <Modal show={props.cancelBookingShow} onHide={props.cancelBookingClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm cancel booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to cancel this booking?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.cancelBookingClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-danger" onClick={props.handleCancelBooking}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCancelBooking;