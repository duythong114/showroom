import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { changePassword } from '../../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ModalChangePassword = (props) => {
    const userState = useSelector(state => state.user.user)

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const dispatch = useDispatch()

    const handleChangePassword = async () => {
        let userId = userState?.id
        let data = { userId, password, newPassword }
        let response = await dispatch(changePassword(data))

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
                    <Modal.Title>Change Your Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-12">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                id='password' type="password"
                                className="form-control"
                                placeholder="Enter your password" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="newPassword">New password</label>
                            <input
                                value={newPassword}
                                onChange={(event) => setNewPassword(event.target.value)}
                                id='newPassword' type="password"
                                className="form-control"
                                placeholder="Enter your new password" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.passwordModalClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-primary" onClick={() => handleChangePassword()}>
                        Change
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalChangePassword;