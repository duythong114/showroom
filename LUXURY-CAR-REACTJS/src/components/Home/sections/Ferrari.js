import './Ferrari.scss'
import Slider from "react-slick";
import React, { useEffect } from 'react';
import { getFerrariCar } from '../../../slices/carSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const Ferrari = (props) => {
    const dispatch = useDispatch()
    const ferrariCarList = useSelector(state => state.car.ferrariCarList)
    const history = useHistory()
    const isLoadingFerrariCar = useSelector(state => state.car.isLoadingFerrariCar)

    useEffect(() => {
        dispatch(getFerrariCar())
        // eslint-disable-next-line
    }, [])

    const handleDetailCarPage = (data) => {
        history.push(`/car/detail?id=${data.id}`)
    }

    return (
        <div className='ferrari-section-container'>
            <div className='section-container container mt-5'>
                <div className='section-header'>
                    <span className='header-title'>FERRARI</span>
                    {/* <button className='header-btn'><span>SEE MORE</span></button> */}
                </div>

                {isLoadingFerrariCar ?
                    <LoadingSpinner />
                    :
                    <div className='section-body'>
                        <Slider {...props.settings}>
                            {ferrariCarList && ferrariCarList.length > 0 &&
                                ferrariCarList.map((item, index) => (
                                    <div className='img-container px-3' key={`bmw-${index}`}>
                                        <div
                                            onClick={() => handleDetailCarPage(item)}
                                            className='img-customize'
                                        >
                                            <div
                                                style={{ backgroundImage: `url(${item.image})` }}
                                                className='img-background'>
                                            </div>
                                            <div className='img-content'>{item.name}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>
                }
            </div>
        </div>
    )
}

export default Ferrari