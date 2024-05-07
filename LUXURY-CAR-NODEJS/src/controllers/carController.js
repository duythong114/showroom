import carServices from '../services/carServices'

const handleGetAllCars = async (req, res) => {
    try {
        let { page, limit } = req.query

        if (page && limit) {
            let paginationCars = await carServices.paginationCarList(+page, +limit)
            return res.status(paginationCars.status).json({
                errorCode: paginationCars.errorCode,
                errorMessage: paginationCars.errorMessage,
                data: paginationCars.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing required parameters",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

const handleCreateNewCar = async (req, res) => {
    try {
        let data = {
            name: req.body.name,
            model: req.body.model,
            description: req.body.description,
            image: req.body.image,
        }

        if (data) {
            let arrInput = [data.name, data.model, data.description, data.image]
            let arrInputName = ['name', 'model', 'description', 'image']
            for (let i = 0; i < arrInput.length; i++) {
                if (!arrInput[i]) {
                    return res.status(400).json({
                        errorCode: 3,
                        errorMessage: `Missing parameter ${arrInputName[i]}`,
                        data: ""
                    })
                }
            }

            let response = await carServices.createNewCar(data)
            return res.status(response.status).json({
                errorCode: response.errorCode,
                errorMessage: response.errorMessage,
                data: response.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing required parameter",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

const handleDeleteCar = async (req, res) => {
    try {
        let carId = req.body.carId

        if (carId) {
            let response = await carServices.deleteCar(carId)
            return res.status(response.status).json({
                errorCode: response.errorCode,
                errorMessage: response.errorMessage,
                data: response.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing required parameter",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

const handleUpdateCar = async (req, res) => {
    try {
        let data = {
            id: req.body.id,
            name: req.body.name,
            model: req.body.model,
            description: req.body.description,
            image: req.body.image,
        }

        if (data) {
            let response = await carServices.updateCar(data)
            return res.status(response.status).json({
                errorCode: response.errorCode,
                errorMessage: response.errorMessage,
                data: response.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing required parameter",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

const handleGetCarById = async (req, res) => {
    try {
        let carId = req.query.carId

        if (carId) {
            let car = await carServices.getCarById(carId)
            return res.status(car.status).json({
                errorCode: car.errorCode,
                errorMessage: car.errorMessage,
                data: car.data
            })
        } else {
            return res.status(400).json({
                errorCode: 2,
                errorMessage: "Missing required parameter",
                data: ""
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

const handleGetBmwCar = async (req, res) => {
    try {
        let cars = await carServices.getBmwCar()
        return res.status(cars.status).json({
            errorCode: cars.errorCode,
            errorMessage: cars.errorMessage,
            data: cars.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

const handleGetFerrariCar = async (req, res) => {
    try {
        let cars = await carServices.getFerrariCar()
        return res.status(cars.status).json({
            errorCode: cars.errorCode,
            errorMessage: cars.errorMessage,
            data: cars.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

const handleGetLamborghiniCar = async (req, res) => {
    try {
        let cars = await carServices.getLamborghiniCar()
        return res.status(cars.status).json({
            errorCode: cars.errorCode,
            errorMessage: cars.errorMessage,
            data: cars.data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errorCode: 1,
            errorMessage: 'Error from server',
        })
    }
}

module.exports = {
    handleGetAllCars: handleGetAllCars,
    handleCreateNewCar: handleCreateNewCar,
    handleDeleteCar: handleDeleteCar,
    handleUpdateCar: handleUpdateCar,
    handleGetCarById: handleGetCarById,
    handleGetBmwCar: handleGetBmwCar,
    handleGetFerrariCar: handleGetFerrariCar,
    handleGetLamborghiniCar: handleGetLamborghiniCar,
}
