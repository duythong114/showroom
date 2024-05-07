import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { updateBooking } from '../../slices/bookingSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProcessBooking } from '../../slices/bookingSlice'

const ModalUpdateBooking = (props) => {
    const dataUpdateModal = props.dataUpdateModal
    const page = props.page
    const limit = props.limit

    const [status, setStatus] = useState('')
    const [time, setTime] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        if (dataUpdateModal) {
            setStatus(dataUpdateModal?.status)
            setTime(dataUpdateModal?.time)
        }
        // eslint-disable-next-line
    }, [dataUpdateModal])

    const handleUpdateBooking = async () => {
        let id = dataUpdateModal?.id
        let data = { id, status, time }
        let response = await dispatch(updateBooking(data))

        if (response
            && response.payload
            && response.payload.response
            && response.payload.response.data
            && response.payload.response.data.errorCode !== 0
        ) {
            toast.error(response.payload.response.data.errorMessage)
        }

        if (response && response.payload && response.payload.errorCode === 0) {
            toast.success(response.payload.errorMessage)
            props.updateBookingClose()
            let pagination = { page, limit }
            dispatch(getProcessBooking(pagination))
        }
    }

    return (
        <>
            <Modal size="lg" show={props.updateBookingShow} onHide={props.updateBookingClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update a booking: ID {dataUpdateModal?.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-6">
                            <label htmlFor="status">status</label>
                            <select
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                                id='status'
                                className="form-select"
                            >
                                <option hidden></option>
                                <option value="processing">processing</option>
                                <option value="completed">completed</option>
                                <option value="cancel">cancel</option>
                            </select>
                        </div>
                        <div className="col-6">
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
                    <Button variant="secondary" onClick={props.updateBookingClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-primary" onClick={() => handleUpdateBooking()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUpdateBooking;