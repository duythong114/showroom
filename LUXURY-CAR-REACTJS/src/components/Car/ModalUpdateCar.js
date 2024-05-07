import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import { updateCar } from '../../slices/carSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllCars } from '../../slices/carSlice'
import _ from 'lodash';

const ModalUpdateCar = (props) => {
    const dataUpdateModal = props.dataUpdateModal
    const page = props.page
    const limit = props.limit

    const defaultState = {
        name: '',
        model: '',
        description: '',
        image: '',
    }

    const [car, setCar] = useState(defaultState)
    const dispatch = useDispatch()

    useEffect(() => {
        if (dataUpdateModal) {
            setCar(dataUpdateModal)
        }
        // eslint-disable-next-line
    }, [dataUpdateModal])

    const handleOnchangeInput = (value, name) => {
        let _copyCar = _.cloneDeep(car)
        _copyCar[name] = value
        setCar(_copyCar)
    }

    const handleUpdateCar = async () => {
        let response = await dispatch(updateCar(car))

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
            props.updateCarClose()
            let pagination = { page, limit }
            dispatch(getAllCars(pagination))
        }
    }

    return (
        <>
            <Modal size="lg" show={props.updateCarShow} onHide={props.updateCarClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update a car: {dataUpdateModal?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-8">
                            <label htmlFor="carName">Car name</label>
                            <input
                                value={car.name}
                                onChange={(event) => handleOnchangeInput(event.target.value, "name")}
                                id='carName' type="text"
                                className="form-control"
                                placeholder="name" />
                        </div>
                        <div className="col-4">
                            <label htmlFor="model">Car model</label>
                            <select
                                value={car.model}
                                onChange={(event) => handleOnchangeInput(event.target.value, "model")}
                                id='model'
                                className="form-select"
                            >
                                <option hidden></option>
                                <option value="bmw">bmw</option>
                                <option value="ferrari">ferrari</option>
                                <option value="lamborghini">lamborghini</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label htmlFor="carDescription">Car description</label>
                            <textarea
                                style={{ height: '300px' }}
                                value={car.description}
                                onChange={(event) => handleOnchangeInput(event.target.value, "description")}
                                id='carDescription' type="text"
                                className="form-control"
                                placeholder="description" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="carImage">Car image url</label>
                            <input
                                value={car.image}
                                onChange={(event) => handleOnchangeInput(event.target.value, "image")}
                                id='carImage' type="text"
                                className="form-control"
                                placeholder="enter image url" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.updateCarClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-primary" onClick={() => handleUpdateCar()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUpdateCar;