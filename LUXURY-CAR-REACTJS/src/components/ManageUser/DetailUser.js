import React, { useEffect } from 'react';
import './DetailUser.scss';
import { getUserById } from '../../slices/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const DetailUser = (props) => {

    let queryParameter = props.location.search
    let userId = queryParameter.split("?id=")[1]

    const isLoadingUserById = useSelector(state => state.user.isLoadingUserById)
    const detailUser = useSelector(state => state.user.detailUser)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserById(userId))
        // eslint-disable-next-line
    }, [userId])

    const handleCombackBtn = () => {
        history.push("/user")
    }

    if (isLoadingUserById) {
        return (
            <LoadingSpinner />
        )
    } else {
        return (
            <div className='detail-user-container'>
                <div className='container'>
                    <div className='row'>
                        {detailUser &&
                            <div className='detail-content col-12 col-md-8 col-lg-6'>
                                <div className='detail-title'>
                                    <h1>Detail User Information</h1>
                                </div>
                                <div className='detail-info'>
                                    <p>ID: {detailUser.id}</p>
                                    <p>Email: {detailUser.email}</p>
                                    <p>Fistname: {detailUser.firstName}</p>
                                    <p>Lastname: {detailUser.lastName}</p>
                                    <p>Address: {detailUser.address}</p>
                                    <p>Phonenumber: {detailUser.phoneNumber}</p>
                                    <p>Gender: {detailUser.gender === 1 ? "Male" : "Female"}</p>
                                    <p>Group: {detailUser.Group.name}</p>
                                    <p>Description: {detailUser.Group.description}</p>
                                    <button
                                        className='btn btn-warning'
                                        onClick={() => handleCombackBtn()}
                                    >
                                        COME BACK
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailUser;