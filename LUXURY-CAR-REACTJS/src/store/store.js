import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../slices/userSlice'
import carReducer from '../slices/carSlice'
import bookingReducer from '../slices/bookingSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        car: carReducer,
        booking: bookingReducer,
    },
})