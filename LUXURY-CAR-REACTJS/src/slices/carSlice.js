import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
    getAllCarsService,
    createNewCarService,
    deleteCarService,
    updateCarService,
    getBmwCarService,
    getFerrariCarService,
    getLamborghiniCarService,
    getCarByIdService,
} from '../services/carServices'

export const getAllCars = createAsyncThunk(
    'car/getAllCars',
    async (pagination) => {
        try {
            const response = await getAllCarsService(pagination)
            return response
        } catch (error) {
            return error;
        }
    },
)

export const creatNewCar = createAsyncThunk(
    'car/creatNewCar',
    async (data, { rejectWithValue }) => {
        try {
            const response = await createNewCarService(data)
            return response
        } catch (error) {
            return rejectWithValue(error);
        }
    },
)

export const deleteCar = createAsyncThunk(
    'car/deleteCar',
    async (carId) => {
        try {
            const response = await deleteCarService(carId)
            return response
        } catch (error) {
            return error;
        }
    },
)

export const updateCar = createAsyncThunk(
    'car/updateCar',
    async (data) => {
        try {
            const response = await updateCarService(data)
            return response
        } catch (error) {
            return error;
        }
    },
)

export const getBmwCar = createAsyncThunk(
    'car/getBmwCar',
    async () => {
        try {
            const response = await getBmwCarService()
            return response
        } catch (error) {
            return error;
        }
    },
)

export const getFerrariCar = createAsyncThunk(
    'car/getFerrariCar',
    async () => {
        try {
            const response = await getFerrariCarService()
            return response
        } catch (error) {
            return error;
        }
    },
)

export const getLamborghiniCar = createAsyncThunk(
    'car/getLamborghiniCar',
    async () => {
        try {
            const response = await getLamborghiniCarService()
            return response
        } catch (error) {
            return error;
        }
    },
)

export const getCarById = createAsyncThunk(
    'car/getCarById',
    async (carId) => {
        try {
            const response = await getCarByIdService(carId)
            return response
        } catch (error) {
            return error;
        }
    },
)

const initialState = {
    // common state
    isCarError: null,

    // get all cars with pagination
    isLoadingAllCars: false,
    carList: [],
    totalCarPages: 0,

    // create new car
    isCreatingCar: false,

    // delete car
    isDeletingCar: false,

    // update car
    isUpdatingCar: false,

    // get bmw car
    isLoadingBmwCar: false,
    bmwCarList: [],

    // get ferrari car
    isLoadingFerrariCar: false,
    ferrariCarList: [],

    // get lamborghini car
    isLoadingLamborghiniCar: false,
    lamborghiniCarList: [],

    // get car by id
    isLoadingCarById: false,
    detailCar: null,
}

export const carSlice = createSlice({
    name: 'car',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // get all cars
            .addCase(getAllCars.pending, (state, action) => {
                state.isLoadingAllCars = true
            })
            .addCase(getAllCars.fulfilled, (state, action) => {
                state.isLoadingAllCars = false
                state.carList = action.payload?.data?.cars
                state.totalCarPages = action.payload?.data?.totalCarPages
            })
            .addCase(getAllCars.rejected, (state, action) => {
                state.isLoadingAllCars = false
                state.isCarError = action.payload.message
            })

            // create a new car
            .addCase(creatNewCar.pending, (state, action) => {
                state.isCreatingCar = true
            })
            .addCase(creatNewCar.fulfilled, (state, action) => {
                state.isCreatingCar = false
            })
            .addCase(creatNewCar.rejected, (state, action) => {
                state.isCreatingCar = false
                state.isCarError = action.payload.message
            })

            // delete car
            .addCase(deleteCar.pending, (state, action) => {
                state.isDeletingCar = true
            })
            .addCase(deleteCar.fulfilled, (state, action) => {
                state.isDeletingCar = false
            })
            .addCase(deleteCar.rejected, (state, action) => {
                state.isDeletingCar = false
                state.isCarError = action.payload.message
            })

            // update car
            .addCase(updateCar.pending, (state, action) => {
                state.isUpdatingCar = true
            })
            .addCase(updateCar.fulfilled, (state, action) => {
                state.isUpdatingCar = false
            })
            .addCase(updateCar.rejected, (state, action) => {
                state.isUpdatingCar = false
                state.isCarError = action.payload.message
            })

            // get bmw car
            .addCase(getBmwCar.pending, (state, action) => {
                state.isLoadingBmwCar = true
            })
            .addCase(getBmwCar.fulfilled, (state, action) => {
                state.isLoadingBmwCar = false
                state.bmwCarList = action.payload?.data
            })
            .addCase(getBmwCar.rejected, (state, action) => {
                state.isLoadingBmwCar = false
                state.isCarError = action.payload.message
            })

            // get ferrari car
            .addCase(getFerrariCar.pending, (state, action) => {
                state.isLoadingFerrariCar = true
            })
            .addCase(getFerrariCar.fulfilled, (state, action) => {
                state.isLoadingFerrariCar = false
                state.ferrariCarList = action.payload?.data
            })
            .addCase(getFerrariCar.rejected, (state, action) => {
                state.isLoadingFerrariCar = false
                state.isCarError = action.payload.message
            })

            // get lamborghini car
            .addCase(getLamborghiniCar.pending, (state, action) => {
                state.isLoadingLamborghiniCar = true
            })
            .addCase(getLamborghiniCar.fulfilled, (state, action) => {
                state.isLoadingLamborghiniCar = false
                state.lamborghiniCarList = action.payload?.data
            })
            .addCase(getLamborghiniCar.rejected, (state, action) => {
                state.isLoadingLamborghiniCar = false
                state.isCarError = action.payload.message
            })

            // get car by id
            .addCase(getCarById.pending, (state, action) => {
                state.isLoadingCarById = true
            })
            .addCase(getCarById.fulfilled, (state, action) => {
                state.isLoadingCarById = false
                state.detailCar = action.payload?.data
            })
            .addCase(getCarById.rejected, (state, action) => {
                state.isLoadingCarById = false
                state.isCarError = action.payload.message
            })
    },
})

export default carSlice.reducer