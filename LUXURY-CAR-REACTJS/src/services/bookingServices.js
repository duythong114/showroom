// import axios from 'axios'
import axios from '../axios'

const getProcessBookingService = (pagination) => {
    return axios.get(`/api/booking/get-process-bookings?page=${pagination.page}&limit=${pagination.limit}`)
}

const createNewBookingService = (data) => {
    return axios.post('/api/booking/create-new-booking', {
        time: data.time,
        carId: data.carId,
        userId: data.userId,
        firstName: data.firstName,
        email: data.email,
        carName: data.carName,
    })
}

const deleteBookingService = (bookingId) => {
    return axios.delete('/api/booking/delete-booking', {
        data: {
            bookingId: bookingId
        }
    })
}

const updateBookingService = (data) => {
    return axios.put('/api/booking/update-booking', {
        id: data.id,
        status: data.status,
        time: data.time,
    })
}

const getBookingByIdService = (userId) => {
    return axios.get(`/api/booking/get-one-booking?userId=${userId}`)
}

const cancelBookingService = (bookingId) => {
    return axios.put('/api/booking/cancel-booking', {
        bookingId: bookingId,
    })
}

export {
    getProcessBookingService,
    createNewBookingService,
    deleteBookingService,
    updateBookingService,
    getBookingByIdService,
    cancelBookingService,
}