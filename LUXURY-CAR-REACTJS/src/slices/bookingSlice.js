import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    getProcessBookingService,
    createNewBookingService,
    deleteBookingService,
    updateBookingService,
    getBookingByIdService,
    cancelBookingService,
} from '../services/bookingServices'

export const getProcessBooking = createAsyncThunk(
    'booking/getProcessBooking',
    async (pagination) => {
        try {
            const response = await getProcessBookingService(pagination)
            return response
        } catch (error) {
            return error;
        }
    },
)

export const creatNewBooking = createAsyncThunk(
    'booking/creatNewBooking',
    async (data, { rejectWithValue }) => {
        try {
            const response = await createNewBookingService(data)
            return response
        } catch (error) {
            return rejectWithValue(error);
        }
    },
)

export const deleteBooking = createAsyncThunk(
    'booking/deleteBooking',
    async (bookingId) => {
        try {
            const response = await deleteBookingService(bookingId)
            return response
        } catch (error) {
            return error;
        }
    },
)

export const updateBooking = createAsyncThunk(
    'booking/updateBooking',
    async (data) => {
        try {
            const response = await updateBookingService(data)
            return response
        } catch (error) {
            return error;
        }
    },
)

export const getBookingById = createAsyncThunk(
    'booking/getBookingById',
    async (userId) => {
        try {
            const response = await getBookingByIdService(userId)
            return response
        } catch (error) {
            return error;
        }
    },
)

export const cancelBooking = createAsyncThunk(
    'booking/cancelBooking',
    async (bookingId) => {
        try {
            const response = await cancelBookingService(bookingId)
            return response
        } catch (error) {
            return error;
        }
    },
)

const initialState = {
    // common state
    isBookingError: null,

    // get all processing bookings with pagination
    isLoadingAllBookings: false,
    bookingList: [],
    totalBookingPages: 0,

    // create new booking
    isCreatingBooking: false,

    // delete booking
    isDeletingBooking: false,

    // update booking
    isUpdatingBooking: false,

    // get booking by id
    isLoadingBookingById: false,
    detailBooking: null,

    // cancel booking
    isCancelingBooking: false,
}

export const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // get all processing bookings
            .addCase(getProcessBooking.pending, (state, action) => {
                state.isLoadingAllBookings = true
            })
            .addCase(getProcessBooking.fulfilled, (state, action) => {
                state.isLoadingAllBookings = false
                state.bookingList = action.payload?.data?.bookings
                state.totalBookingPages = action.payload?.data?.totalBookingPages
            })
            .addCase(getProcessBooking.rejected, (state, action) => {
                state.isLoadingAllBookings = false
                state.isBookingError = action.payload.message
            })

            // create a new booking
            .addCase(creatNewBooking.pending, (state, action) => {
                state.isCreatingBooking = true
            })
            .addCase(creatNewBooking.fulfilled, (state, action) => {
                state.isCreatingBooking = false
            })
            .addCase(creatNewBooking.rejected, (state, action) => {
                state.isCreatingBooking = false
                state.isBookingError = action.payload.message
            })

            // delete booking
            .addCase(deleteBooking.pending, (state, action) => {
                state.isDeletingBooking = true
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.isDeletingBooking = false
            })
            .addCase(deleteBooking.rejected, (state, action) => {
                state.isDeletingBooking = false
                state.isBookingError = action.payload.message
            })

            // update booking
            .addCase(updateBooking.pending, (state, action) => {
                state.isUpdatingBooking = true
            })
            .addCase(updateBooking.fulfilled, (state, action) => {
                state.isUpdatingBooking = false
            })
            .addCase(updateBooking.rejected, (state, action) => {
                state.isUpdatingBooking = false
                state.isBookingError = action.payload.message
            })


            // get booking by userId
            .addCase(getBookingById.pending, (state, action) => {
                state.isLoadingBookingById = true
            })
            .addCase(getBookingById.fulfilled, (state, action) => {
                state.isLoadingBookingById = false
                state.detailBooking = action.payload?.data
            })
            .addCase(getBookingById.rejected, (state, action) => {
                state.isLoadingBookingById = false
                state.isBookingError = action.payload.message
            })

            // cancel booking
            .addCase(cancelBooking.pending, (state, action) => {
                state.isCancelingBooking = true
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.isCancelingBooking = false
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                state.isCancelingBooking = false
                state.isBookingError = action.payload.message
            })
    },
})

export default bookingSlice.reducer