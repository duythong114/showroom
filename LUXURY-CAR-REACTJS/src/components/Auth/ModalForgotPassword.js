import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { forgotPassword } from '../../slices/userSlice'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ModalForgotPassword = (props) => {
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const handleSendNewPassword = async () => {
        let response = await dispatch(forgotPassword(email))

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
            props.passwordModalClose()
        }
    }

    return (
        <>
            <Modal show={props.passwordModalShow} onHide={props.passwordModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Send new password to your email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                id='email' type="email"
                                className="form-control"
                                placeholder="Enter your email" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.passwordModalClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-primary" onClick={() => handleSendNewPassword()}>
                        Send
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalForgotPassword;