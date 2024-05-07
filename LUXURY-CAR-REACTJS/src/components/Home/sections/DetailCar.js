import './DetailCar.scss'
import React, { useEffect, useState } from 'react';
import { getCarById } from '../../../slices/carSlice'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import ModalCreateBooking from '../../Booking/ModalCreateBooking';
import LikeAndShareFacebook from '../../FacebookSDK/LikeAndShareFacebook'
import CommentFacebook from '../../FacebookSDK/CommentFacebook'

const DetailCar = (props) => {
    let queryParameter = props.location.search
    let carId = queryParameter.split("?id=")[1]

    const dataHref = window.location.href

    const dispatch = useDispatch()
    const isLoadingCarById = useSelector(state => state.car.isLoadingCarById)
    const detailCar = useSelector(state => state.car.detailCar)
    const isCreatingBooking = useSelector(state => state.booking.isCreatingBooking)

    // modal create booking 
    const [createModalShow, setCreateModalShow] = useState(false)

    useEffect(() => {
        dispatch(getCarById(carId))
        // eslint-disable-next-line
    }, [carId])

    const handleBookingBtn = () => {
        setCreateModalShow(true)
    }

    const handleCreateBookingClose = () => {
        setCreateModalShow(false)
    }

    if (isLoadingCarById || isCreatingBooking) {
        return (
            <LoadingSpinner />
        )
    } else {
        return (
            <div className='detail-car-container'>
                <div className='container'>
                    <h1 className='detail-car-title'>DETAIL CAR PAGE</h1>

                    {/* detail-car-content */}
                    {detailCar &&
                        <div className='detail-car row'>
                            <div className='img-car-container col-12 col-lg-5'>
                                <div
                                    style={{ backgroundImage: `url(${detailCar.image})` }}
                                    className='img-car'>
                                </div>
                            </div>

                            <div className='info-car-container col-12 col-lg-7'>
                                <div className='info-car'>
                                    <h2 className='car-name'>{detailCar.name}</h2>

                                    <LikeAndShareFacebook dataHref={dataHref} />

                                    <h3>Description:</h3>
                                    <p className='car-description'> {detailCar.description}</p>
                                    <button
                                        onClick={() => handleBookingBtn()}
                                        className='btn btn-primary'
                                    >Booking</button>
                                </div>
                            </div>

                            <CommentFacebook
                                dataHref={dataHref}
                            />
                        </div>
                    }

                    <ModalCreateBooking
                        createBookingShow={createModalShow}
                        createBookingClose={handleCreateBookingClose}
                    />
                </div>
            </div>
        )
    }
}

export default DetailCar;