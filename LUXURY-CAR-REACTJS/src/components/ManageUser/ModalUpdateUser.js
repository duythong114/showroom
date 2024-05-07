import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { updateUser } from '../../slices/userSlice'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchAllUsers } from '../../slices/userSlice';

const ModalUpdateUser = (props) => {
    const defaultState = {
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        gender: '',
        // groupId: '',
    }

    const dataModalUpdate = props.dataModalUpdate
    const page = props.page
    const limit = props.limit

    const [user, setUser] = useState(defaultState)
    const dispatch = useDispatch()

    useEffect(() => {
        if (dataModalUpdate) {
            setUser(dataModalUpdate)
        }
        // eslint-disable-next-line
    }, [dataModalUpdate])

    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(user)
        _userData[name] = value
        setUser(_userData)
    }

    const handleUpdateUser = async () => {
        let response = await dispatch(updateUser(user))

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
            props.handleUpdateClose()
            let pagination = { page, limit }
            dispatch(fetchAllUsers(pagination))
        }
    }

    return (
        <>
            <Modal show={props.updateShow} onHide={props.handleUpdateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User: {dataModalUpdate.email}</Modal.Title>
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
                    <Button variant="secondary" onClick={props.handleUpdateClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-primary" onClick={() => handleUpdateUser()}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUpdateUser;