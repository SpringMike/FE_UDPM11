import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import axios from 'axios'
import paymentApi from '../../user/service/APIPayment';
import { GetListBankResponse } from '../../user/type/Payment';


export interface ListBankState {
  listBank: undefined | GetListBankResponse
  status: 'idle' | 'loading' | 'failed' | 'init'
  failureDescription: string
}


const initialState: ListBankState = {
  listBank: undefined,
  status: 'init',
  failureDescription: ''
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getListBankAsync = createAsyncThunk(
  'listBank/getListBankAsync',
  async (data, { rejectWithValue }) => {
    try {
      const response = await paymentApi.getListBank()
      return response
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

const listBankSlice = createSlice({
  name: 'listBank',
  initialState,
  reducers: {
    resetListBank: handleResetAction,
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getListBankAsync.pending, (state: ListBankState) => {
        return {
          listBank: undefined,
          status: 'loading',
          failureDescription: '',
        }
      })
      .addCase(getListBankAsync.fulfilled, (state: ListBankState, action) => {
        return {
          listBank: action.payload,
          status: 'idle',
          failureDescription: ''
        }
      })
      .addCase(getListBankAsync.rejected, (state: ListBankState, action) => {
        return {
          listBank: undefined,
          status: 'failed',
          failureDescription: JSON.stringify(action.payload as Object),
        }
      })
  },
})

function handleResetAction(state: ListBankState) {
  state.listBank = undefined
  state.status = 'init'
  state.failureDescription = ''
}

export const { resetListBank } = listBankSlice.actions

export const selectListBank = (state: RootState) => state.listBank.listBank
export const selectStatus = (state: RootState) => state.listBank.status
export const selectFailureDescription = (state: RootState) =>
  state.listBank.failureDescription

export const listBankReducer = listBankSlice.reducer