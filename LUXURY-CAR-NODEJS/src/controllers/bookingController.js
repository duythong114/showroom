import bookingServices from '../services/bookingServices'

const handleGetProcessBookings = async (req, res) => {
    try {
        let { page, limit } = req.query

        if (page && limit) {
            let paginationBookings = await bookingServices.paginationBookingList(+page, +limit)
            return res.status(paginationBookings.status).json({
                errorCode: paginationBookings.errorCode,
                errorMessage: paginationBookings.errorMessage,
                data: paginationBookings.data
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

const handleCreateNewBooking = async (req, res) => {
    try {
        let data = {
            time: req.body.time,
            carId: req.body.carId,
            userId: req.body.userId,
            email: req.body.email,
            firstName: req.body.firstName,
            carName: req.body.carName,
        }

        if (data) {
            let arrInput = [data.time, data.carId, data.userId, data.email, data.firstName, data.carName]
            let arrInputName = ['time', 'carId', 'userId', 'email', 'firstName', 'carName']
            for (let i = 0; i < arrInput.length; i++) {
                if (!arrInput[i]) {
                    return res.status(400).json({
                        errorCode: 3,
                        errorMessage: `Missing parameter ${arrInputName[i]}`,
                        data: ""
                    })
                }
            }

            let response = await bookingServices.createNewBooking(data)
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

const handleDeleteBooking = async (req, res) => {
    try {
        let bookingId = req.body.bookingId

        if (bookingId) {
            let response = await bookingServices.deleteBooking(bookingId)
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

const handleUpdateBooking = async (req, res) => {
    try {
        let data = {
            id: req.body.id,
            status: req.body.status,
            time: req.body.time,
        }

        if (data) {
            let response = await bookingServices.updateBooking(data)
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

const handleGetBookingByUserId = async (req, res) => {
    try {
        let userId = req.query.userId

        if (userId) {
            let booking = await bookingServices.getBookingByUserId(userId)
            return res.status(booking.status).json({
                errorCode: booking.errorCode,
                errorMessage: booking.errorMessage,
                data: booking.data
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

const handleCancelBooking = async (req, res) => {
    try {
        let bookingId = req.body.bookingId

        if (bookingId) {
            let response = await bookingServices.cancelBooking(bookingId)
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

module.exports = {
    handleGetProcessBookings: handleGetProcessBookings,
    handleCreateNewBooking: handleCreateNewBooking,
    handleDeleteBooking: handleDeleteBooking,
    handleUpdateBooking: handleUpdateBooking,
    handleGetBookingByUserId: handleGetBookingByUserId,
    handleCancelBooking: handleCancelBooking,
}
