import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store';
import { useAuthStore } from '../../hooks/zustand/auth';
import paymentApi from '../../user/service/APIPayment';
import { GetPaymentMethodResponse } from '../../user/type/Payment';




export interface PaymentMethodsState {
    paymentMethods: undefined | GetPaymentMethodResponse
    status: 'idle' | 'loading' | 'failed' | 'init'
    failureDescription: string
}



const initialState: PaymentMethodsState = {
    paymentMethods: undefined,
    status: 'init',
    failureDescription: ''
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getPaymentMethodsAsync = createAsyncThunk(
    'paymentMethods/getPaymentMethodsAsync',
    async (data, { rejectWithValue}) => {
        
        try {
            const response = await paymentApi.getPaymentMethod('1')
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    throw error
                }
                return rejectWithValue(error.response.data)
            } else {
                throw error
            }
        }
    }
)

const paymentMethodsSlice = createSlice({
    name: 'paymentMethods',
    initialState,
    reducers: {
        resetPaymentMethods: handleResetAction,
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(getPaymentMethodsAsync.pending, (state: PaymentMethodsState) => {
                return {
                    paymentMethods: undefined,
                    status: 'loading',
                    failureDescription: '',
                }
            })
            .addCase(getPaymentMethodsAsync.fulfilled, (state: PaymentMethodsState, action) => {
                return {
                    paymentMethods: action.payload,
                    status: 'idle',
                    failureDescription: ''
                }
            })
            .addCase(getPaymentMethodsAsync.rejected, (state: PaymentMethodsState, action) => {
                return {
                    paymentMethods: undefined,
                    status: 'failed',
                    failureDescription: JSON.stringify(action.payload as Object),
                }
            })
    },
})

function handleResetAction(state: PaymentMethodsState) {
    state.paymentMethods = undefined
    state.status = 'init'
    state.failureDescription = ''
}

export const { resetPaymentMethods } = paymentMethodsSlice.actions

export const selectPaymentMethods = (state: RootState) => state.paymentMethods.paymentMethods
export const selectStatus = (state: RootState) => state.paymentMethods.status
export const selectFailureDescription = (state: RootState) =>
    state.paymentMethods.failureDescription

export const paymentMethodsReducer = paymentMethodsSlice.reducer
