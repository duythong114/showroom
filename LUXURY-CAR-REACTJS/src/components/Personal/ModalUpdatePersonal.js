import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import _ from 'lodash';
import { updatePersonal } from '../../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ModalUpdatePersonal = (props) => {
    const userState = useSelector(state => state.user.user)

    const defaultState = {
        id: userState?.id,
        firstName: userState?.firstName,
        lastName: userState?.lastName,
        address: userState?.address,
        phoneNumber: userState?.phoneNumber,
        gender: userState?.gender,
        // groupId: '',
    }

    const [user, setUser] = useState(defaultState)
    const dispatch = useDispatch()

    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(user)
        _userData[name] = value
        setUser(_userData)
    }

    const handleUpdatePersonal = async () => {
        let response = await dispatch(updatePersonal(user))

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
            props.updateModalClose()
        }
    }

    return (
        <>
            <Modal show={props.updateModalShow} onHide={props.updateModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Personal Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-6">
                            <label htmlFor="inputFirstName">First name</label>
                            <input
                                value={user.firstName}
                                onChange={(event) => handleOnchangeInput(event.target.value, "firstName")}
                                id='inputFirstName' type="text"
                                className="form-control"
                                placeholder="First name" />
                        </div>
                        <div className="col-6">
                            <label htmlFor="inputLastName">Last name</label>
                            <input
                                value={user.lastName}
                                onChange={(event) => handleOnchangeInput(event.target.value, "lastName")}
                                id='inputLastName' type="text"
                                className="form-control"
                                placeholder="Last name" />
                        </div>

                        <div className="col-12">
                            <label htmlFor="inputAddress">Address</label>
                            <input
                                value={user.address}
                                onChange={(event) => handleOnchangeInput(event.target.value, "address")}
                                id='inputAddress' type="text"
                                className="form-control"
                                placeholder="1234 Main St" />
                        </div>

                        <div className="col-6">
                            <label htmlFor="inputPhoneNumber">Phone number</label>
                            <input
                                value={user.phoneNumber}
                                onChange={(event) => handleOnchangeInput(event.target.value, "phoneNumber")}
                                id='inputPhoneNumber' type="text"
                                className="form-control"
                            />
                        </div>
                        <div className="col-6">
                            <label htmlFor="inputGender">Gender</label>
                            <select
                                value={user.gender}
                                onChange={(event) => handleOnchangeInput(event.target.value, "gender")}
                                id='inputGender'
                                className="form-select"
                            >
                                <option hidden></option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>
                        </div>
                        {/* <div className="col-4">
                            <label htmlFor="inputGroupId">Group</label>
                            <select
                                value={user.groupId}
                                onChange={(event) => handleOnchangeInput(event.target.value, "groupId")}
                                id='inputGroupId'
                                className="form-select"
                            >
                                <option hidden></option>
                                <option value="1">Worker</option>
                                <option value="2">Customer</option>
                                <option value="3">Manager</option>
                            </select>
                        </div> */}
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.updateModalClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-primary" onClick={() => handleUpdatePersonal()}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUpdatePersonal;