import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import { creatNewCar } from '../../slices/carSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getAllCars } from '../../slices/carSlice'

const ModalCreateCar = (props) => {

    const page = props.page
    const limit = props.limit

    const [name, setName] = useState('')
    const [model, setModel] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const dispatch = useDispatch()

    const validateInput = () => {
        let isValid = true

        let arrInput = [name, model, description, image]
        let arrInputName = ['name', 'model', 'description', 'image']
        for (let i = 0; i < arrInput.length; i++) {
            if (!arrInput[i]) {
                isValid = false
                toast.error(`Missing parameter ${arrInputName[i]}`)
                return
            }
        }
        return isValid
    }

    const handleCreateNewCar = async () => {
        let isInputValid = validateInput()

        if (isInputValid) {
            let car = { name, model, description, image }
            let response = await dispatch(creatNewCar(car))

            if (response
                && response.payload
                && response.payload.response
                && response.payload.response.data
                && response.payload.response.data.errorCode !== 0
            ) {
                toast.error(response.payload.response.data.errorMessage)
            }

            if (response && response.payload && response.payload.errorCode === 0) {
                setName("")
                setModel("")
                setDescription("")
                setImage("")
                toast.success(response.payload.errorMessage)
                props.createCarClose()
                let pagination = { page, limit }
                dispatch(getAllCars(pagination))
            }
        }
    }

    return (
        <>
            <Modal size="lg" show={props.createCarShow} onHide={props.createCarClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new car</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-8">
                            <label htmlFor="carName">Car name</label>
                            <input
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                id='carName' type="text"
                                className="form-control"
                                placeholder="name" />
                        </div>
                        <div className="col-4">
                            <label htmlFor="model">Car model</label>
                            <select
                                value={model}
                                onChange={(event) => setModel(event.target.value)}
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
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                id='carDescription' type="text"
                                className="form-control"
                                placeholder="description" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="carImage">Car image url</label>
                            <input
                                value={image}
                                onChange={(event) => setImage(event.target.value)}
                                id='carImage' type="text"
                                className="form-control"
                                placeholder="enter image url" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.createCarClose}>
                        Close
                    </Button>
                    <Button variant="btn btn-primary" onClick={() => handleCreateNewCar()}>
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCreateCar;