import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { creatNewBooking } from '../../slices/bookingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ModalCreateBooking = (props) => {

    const [time, setTime] = useState('')
    const user = useSelector(state => state.user.user)
    const detailCar = useSelector(state => state.car.detailCar)

    const dispatch = useDispatch()

    const handleCreateNewBooking = async () => {
        let userId = user?.id
        let firstName = user?.firstName
        let email = user?.email
        let carName = detailCar?.name
        let carId = detailCar?.id
        let data = { time, carId, userId, email, carName, firstName }
        let response = await dispatch(creatNewBooking(data))

        if (response
            && response.payload
            && response.payload.response
            && response.payload.response.data
            && response.payload.response.data.errorCode !== 0
        ) {
            toast.error(response.payload.response.data.errorMessage)
        }

        if (response && response.payload && response.payload.errorCode === 0) {
            setTime('')
            toast.success(response.payload.errorMessage)
            props.createBookingClose()
        }
    }

    return (
        <>
            <Modal size="lg" show={props.createBookingShow} onHide={props.createBookingClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Booking to see car: {detailCar?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label htmlFor="time">Select time</label>
                            <select
                                value={time}
                                onChange={(event) => setTime(event.target.value)}
                                id='time'
                                className="form-select"
                            >
                                <option hidden></option>
                                <option value="08:00">08:00</option>
                                <option value="09:00">09:00</option>
                                <option value="10:00">10:00</option>
                                <option value="11:00">11:00</option>
                                <hr />
                                <option value="13:00">13:00</option>
                                <option value="14:00">14:00</option>
                                <option value="15:00">15:00</option>
                                <option value="16:00">16:00</option>
                            </select>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.createBookingClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-primary" onClick={() => handleCreateNewBooking()}>
                        Booking
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCreateBooking;