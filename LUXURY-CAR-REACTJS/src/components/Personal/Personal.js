import React, { useState } from 'react';
import './Personal.scss';
import { useSelector } from 'react-redux';
import ModalUpdatePersonal from './ModalUpdatePersonal'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import ModalChangePassword from './ModalChangePassword';

const Personal = (props) => {
    const user = useSelector(state => state.user.user)

    // update modal
    const isUpdatingPersonal = useSelector(state => state.user.isUpdatingPersonal)
    const [showModalUpdate, setShowModalUpdate] = useState(false)

    // change password modal
    const [showModalChangePassword, setShowModalChangePassword] = useState(false)

    const handleEditBtn = () => {
        setShowModalUpdate(true)
    }

    const handleUpdatePersonalClose = () => {
        setShowModalUpdate(false)
    }

    const handleChangePasswordBtn = () => {
        setShowModalChangePassword(true)
    }

    const handleChangePasswordModalClose = () => {
        setShowModalChangePassword(false)
    }

    if (isUpdatingPersonal) {
        return (
            <LoadingSpinner />
        )
    } else {
        return (
            <div className='personal-container'>
                <div className='container'>
                    <div className='row'>
                        {user &&
                            <div className='personal-content col-12 col-md-8 col-lg-6'>
                                <div className='personal-title'>
                                    <h1>Personal Information</h1>
                                </div>

                                <div className='personal-info'>
                                    <p>ID: {user.id}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Fistname: {user.firstName}</p>
                                    <p>Lastname: {user.lastName}</p>
                                    <p>Address: {user.address}</p>
                                    <p>Phonenumber: {user.phoneNumber}</p>
                                    <p>Gender: {user.gender === 1 ? "Male" : "Female"}</p>
                                    <p>Group: {user?.Group?.name}</p>
                                    <p>Description: {user?.Group?.description}</p>

                                    <button
                                        onClick={() => handleEditBtn()}
                                        className='btn btn-primary'
                                    >
                                        Edit
                                    </button>
                                    <div className='mt-3 mb-3'></div>
                                    <button
                                        onClick={() => handleChangePasswordBtn()}
                                        className='btn btn-primary'
                                    >
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        }
                        <div className='col-6'></div>
                    </div>

                    <ModalUpdatePersonal
                        updateModalShow={showModalUpdate}
                        updateModalClose={handleUpdatePersonalClose}
                    />

                    <ModalChangePassword
                        passwordModalShow={showModalChangePassword}
                        passwordModalClose={handleChangePasswordModalClose}
                    />
                </div>
            </div>
        )
    }
}

export default Personal;