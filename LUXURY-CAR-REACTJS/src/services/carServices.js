// import axios from 'axios'
import axios from '../axios'

const getAllCarsService = (pagination) => {
    return axios.get(`/api/car/get-all-cars?page=${pagination.page}&limit=${pagination.limit}`)
}

const createNewCarService = (data) => {
    return axios.post('/api/car/create-new-car', {
        name: data.name,
        model: data.model,
        description: data.description,
        image: data.image
    })
}

const deleteCarService = (carId) => {
    return axios.delete('/api/car/delete-car', {
        data: {
            carId: carId
        }
    })
}

const updateCarService = (data) => {
    return axios.put('/api/car/update-car', {
        id: data.id,
        name: data.name,
        model: data.model,
        description: data.description,
        image: data.image
    })
}

const getBmwCarService = () => {
    return axios.get('/api/car/get-bmw-car')
}

const getFerrariCarService = () => {
    return axios.get('/api/car/get-ferrari-car')
}

const getLamborghiniCarService = () => {
    return axios.get('/api/car/get-lamborghini-car')
}

const getCarByIdService = (carId) => {
    return axios.get(`/api/car/get-one-car?carId=${carId}`)
}

export {
    getAllCarsService,
    createNewCarService,
    deleteCarService,
    updateCarService,
    getBmwCarService,
    getFerrariCarService,
    getLamborghiniCarService,
    getCarByIdService,
}