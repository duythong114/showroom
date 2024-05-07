import db from '../models/index';

const checkCarName = (carName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let car = await db.Car.findOne({
                where: { name: carName }
            })
            if (car) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

const paginationCarList = (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let offSet = (page - 1) * limit

            const { count, rows } = await db.Car.findAndCountAll({
                order: [
                    ['id', 'ASC'],
                ],
                raw: true,
                offset: offSet,
                limit: limit,
            });

            if (count && rows) {
                let totalPages = Math.ceil(count / limit)

                let data = {
                    totalCarPages: totalPages,
                    cars: rows
                }

                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: "fetch cars with pagination successfully",
                    data: data,
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

const createNewCar = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isCarNameExist = await checkCarName(data.name)

            if (!isCarNameExist) {
                await db.Car.create({
                    name: data.name,
                    model: data.model,
                    description: data.description,
                    image: data.image
                })
                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Create a new car successfully',
                    data: ""
                })
            } else {
                resolve({
                    status: 400,
                    errorCode: 4,
                    errorMessage: 'This carName is already existed',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const deleteCar = (carId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let car = await db.Car.findOne({
                where: { id: carId }
            })
            if (car) {
                car.destroy()

                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Delete a car successfully',
                    data: ""
                })
            } else {
                resolve({
                    status: 404,
                    errorCode: 3,
                    errorMessage: 'This car not found',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const updateCar = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    status: 400,
                    errorCode: 3,
                    errorMessage: 'Missing required parameter',
                    data: ""
                })
            }

            let newCar = await db.Car.findOne({
                where: { id: data.id }
            })

            if (newCar) {
                newCar.name = data.name
                newCar.model = data.model
                newCar.description = data.description
                newCar.image = data.image

                await newCar.save()

                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Update car successfully',
                    data: ""
                })
            } else {
                resolve({
                    status: 404,
                    errorCode: 4,
                    errorMessage: 'This car not found',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getCarById = (carId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let car = await db.Car.findOne({
                where: { id: carId },
                raw: true
            })
            if (car) {
                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Get car successfully',
                    data: car
                })
            } else {
                resolve({
                    status: 404,
                    errorCode: 3,
                    errorMessage: 'Car not found',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getBmwCar = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let cars = await db.Car.findAll({
                where: { model: "bmw" },
                order: [
                    ['id', 'ASC'],
                ],
                raw: true
            })
            if (cars.length > 0) {
                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: `Get all bmw cars successfully`,
                    data: cars
                })
            } else {
                resolve({
                    status: 404,
                    errorCode: 3,
                    errorMessage: `bmw car model not found`,
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getFerrariCar = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let cars = await db.Car.findAll({
                where: { model: "ferrari" },
                order: [
                    ['id', 'ASC'],
                ],
                raw: true
            })
            if (cars.length > 0) {
                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: `Get all ferrari cars successfully`,
                    data: cars
                })
            } else {
                resolve({
                    status: 404,
                    errorCode: 3,
                    errorMessage: `ferrari car model not found`,
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getLamborghiniCar = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let cars = await db.Car.findAll({
                where: { model: "lamborghini" },
                order: [
                    ['id', 'ASC'],
                ],
                raw: true
            })
            if (cars.length > 0) {
                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: `Get all lamborghini cars successfully`,
                    data: cars
                })
            } else {
                resolve({
                    status: 404,
                    errorCode: 3,
                    errorMessage: `lamborghini car model not found`,
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    paginationCarList: paginationCarList,
    createNewCar: createNewCar,
    deleteCar: deleteCar,
    updateCar: updateCar,
    getCarById: getCarById,
    getBmwCar: getBmwCar,
    getFerrariCar: getFerrariCar,
    getLamborghiniCar: getLamborghiniCar,
}