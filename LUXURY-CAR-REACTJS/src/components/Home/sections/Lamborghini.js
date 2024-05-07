import './Lamborghini.scss'
import Slider from "react-slick";
import React, { useEffect } from 'react';
import { getLamborghiniCar } from '../../../slices/carSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';

const Lamborghini = (props) => {
    const lamborghiniCarList = useSelector(state => state.car.lamborghiniCarList)
    const dispatch = useDispatch()
    const history = useHistory()
    const isLoadingLamborghiniCar = useSelector(state => state.car.isLoadingLamborghiniCar)

    useEffect(() => {
        dispatch(getLamborghiniCar())
        // eslint-disable-next-line
    }, [])

    const handleDetailCarPage = (data) => {
        history.push(`/car/detail?id=${data.id}`)
    }

    return (
        <div className='lamborghini-section-container'>
            <div className='section-container container mt-5'>
                <div className='section-header'>
                    <span className='header-title'>LAMBORGHINI</span>
                    {/* <button className='header-btn'><span>SEE MORE</span></button> */}
                </div>
                {isLoadingLamborghiniCar ?
                    <LoadingSpinner />
                    :
                    <div className='section-body'>
                        <Slider {...props.settings}>
                            {lamborghiniCarList && lamborghiniCarList.length > 0 &&
                                lamborghiniCarList.map((item, index) => (
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

export default Lamborghini