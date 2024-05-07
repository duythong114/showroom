import db from '../models/index';
import { sendBookingEmail } from './sendEmailServices'

const checkBooking = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.Booking.findOne({
                where: {
                    userId: userId,
                    status: 'processing'
                }
            })
            if (booking) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

const paginationBookingList = (page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let offSet = (page - 1) * limit

            const { count, rows } = await db.Booking.findAndCountAll({
                where: { status: 'processing' },
                order: [
                    ['id', 'ASC'],
                ],
                attributes: ['id', 'status', 'time'],
                include: [
                    {
                        model: db.User,
                        attributes: ['firstName', 'lastName'],
                    },
                    {
                        model: db.Car,
                        attributes: ['name'],
                    }
                ],
                nest: true,
                raw: true,
                offset: offSet,
                limit: limit,
            });

            if (count && rows) {
                let totalPages = Math.ceil(count / limit)

                let data = {
                    totalBookingPages: totalPages,
                    bookings: rows
                }

                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: "get all processing bookings successfully",
                    data: data,
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}

const createNewBooking = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isBookingExist = await checkBooking(data.userId)

            if (!isBookingExist) {
                let dataEmail = {
                    time: data.time,
                    email: data?.email,
                    firstName: data?.firstName,
                    carName: data?.carName
                }
                await sendBookingEmail(dataEmail)

                await db.Booking.create({
                    status: 'processing',
                    time: data.time,
                    carId: data.carId,
                    userId: data.userId
                })
                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'booking successfully, check your email address',
                    data: ""
                })
            } else {
                resolve({
                    status: 400,
                    errorCode: 4,
                    errorMessage: 'Your booking already exists in booking page',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const deleteBooking = (bookingId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.Booking.findOne({
                where: { id: bookingId }
            })
            if (booking) {
                booking.destroy()

                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Delete a booking successfully',
                    data: ""
                })
            } else {
                resolve({
                    status: 404,
                    errorCode: 3,
                    errorMessage: 'This booking not found',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const updateBooking = (data) => {
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

            let newBooking = await db.Booking.findOne({
                where: { id: data.id }
            })

            if (newBooking) {
                newBooking.status = data.status
                newBooking.time = data.time

                await newBooking.save()

                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Update booking successfully',
                    data: ""
                })
            } else {
                resolve({
                    status: 404,
                    errorCode: 4,
                    errorMessage: 'This booking not found',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const getBookingByUserId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.Booking.findOne({
                where: {
                    userId: userId,
                    status: 'processing',
                },
                attributes: ['id', 'status', 'time'],
                include: [
                    {
                        model: db.User,
                        attributes: ['firstName', 'lastName'],
                    },
                    {
                        model: db.Car,
                        attributes: ['name'],
                    }
                ],
                nest: true,
                raw: true,
            })
            if (booking) {
                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Get booking successfully',
                    data: booking
                })
            } else {
                resolve({
                    status: 200,
                    errorCode: 3,
                    errorMessage: 'Booking not found',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

const cancelBooking = (bookingId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.Booking.findOne({
                where: { id: bookingId }
            })

            if (booking) {
                booking.status = 'cancel'

                await booking.save()

                resolve({
                    status: 200,
                    errorCode: 0,
                    errorMessage: 'Cancel booking successfully',
                    data: ""
                })
            } else {
                resolve({
                    status: 404,
                    errorCode: 3,
                    errorMessage: 'This booking not found',
                    data: ""
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    paginationBookingList: paginationBookingList,
    createNewBooking: createNewBooking,
    deleteBooking: deleteBooking,
    updateBooking: updateBooking,
    getBookingByUserId: getBookingByUserId,
    cancelBooking: cancelBooking,
}