import express from 'express';
import userController from '../controllers/userController';
import checkAccessToken from '../middlewares/checkAccessToken';
import checkAuthorization from '../middlewares/checkAuthorization';
import carController from '../controllers/carController'
import bookingController from '../controllers/bookingController';

const router = express.Router();

const apiRouter = (app) => {
    // middlewares
    router.all('*', checkAccessToken, checkAuthorization,)

    // user api
    router.get('/user/get-user-refresh', userController.handleGetUserRefresh)
    router.post('/user/login-user', userController.handleLoginUser)
    router.get('/user/logout-user', userController.handleLogoutUser)
    router.post('/user/register', userController.handleRegisterUser)
    router.get('/user/get-all-users', userController.handleGetAllUsers)
    router.get('/user/get-one-user', userController.handleGetUserById)
    router.post('/user/create-user', userController.handleCreateUser)
    router.delete('/user/delete-user', userController.handleDeleteUser)
    router.put('/user/update-user', userController.handleUpdateUser)
    router.put('/user/update-personal-user', userController.handleUpdatePersonalUser)
    router.put('/user/change-password', userController.handleChangePassword)
    router.put('/user/forgot-password', userController.handleForgotPassword)

    // car api
    router.get('/car/get-all-cars', carController.handleGetAllCars)
    router.post('/car/create-new-car', carController.handleCreateNewCar)
    router.delete('/car/delete-car', carController.handleDeleteCar)
    router.put('/car/update-car', carController.handleUpdateCar)
    router.get('/car/get-one-car', carController.handleGetCarById)
    router.get('/car/get-bmw-car', carController.handleGetBmwCar)
    router.get('/car/get-ferrari-car', carController.handleGetFerrariCar)
    router.get('/car/get-lamborghini-car', carController.handleGetLamborghiniCar)

    // booking api
    router.get('/booking/get-process-bookings', bookingController.handleGetProcessBookings)
    router.post('/booking/create-new-booking', bookingController.handleCreateNewBooking)
    router.delete('/booking/delete-booking', bookingController.handleDeleteBooking)
    router.put('/booking/update-booking', bookingController.handleUpdateBooking)
    router.get('/booking/get-one-booking', bookingController.handleGetBookingByUserId)
    router.put('/booking/cancel-booking', bookingController.handleCancelBooking)

    return app.use('/api', router)
}

export default apiRouter;