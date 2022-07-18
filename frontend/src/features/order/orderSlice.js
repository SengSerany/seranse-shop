import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderService';

const initialState = {
  orders: null,
  adresses: null,
  orderSuccess: false,
  orderError: false,
  orderLoading: false,
  orderMessage: '',
};

export const getIndexOrders = createAsyncThunk(
  'order/all',
  async (_, thunkAPI) => {
    try {
      return await orderService.getAllorders();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createNewOrders = createAsyncThunk(
  'order/create',
  async (formDataOrder, thunkAPI) => {
    try {
      return await orderService.createOrder(formDataOrder);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  'order/update',
  async (orderInfos, thunkAPI) => {
    try {
      return await orderService.updateOrder(orderInfos);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderState: (state) => {
      state.orderSuccess = false;
      state.orderError = false;
      state.orderLoading = false;
      state.orderMessage = '';
    },
    logoutOrderState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIndexOrders.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(getIndexOrders.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderError = false;
        state.orders = action.payload.orders;
        state.adresses = action.payload.adresses;
      })
      .addCase(getIndexOrders.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = true;
        state.orderSuccess = true;
        state.orderMessage = action.payload;
      })
      .addCase(createNewOrders.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(createNewOrders.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderError = false;
        state.orderSuccess = true;
        console.log(action.payload);
        state.orders.push(action.payload.order);
        const usedAdress = state.adresses.find(
          (adress) => adress._id === action.payload.adress._id
        );
        if (!usedAdress) {
          state.adresses.push(action.payload.adress);
        }
        state.orderMessage = 'Commande validé avec succès';
      })
      .addCase(createNewOrders.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = true;
        state.orderSuccess = true;
        state.orderMessage = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.orderLoading = false;
        state.orderError = false;
        state.orderSuccess = true;
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id
        );
        const newOrders = [...state.orders];
        newOrders[index].state = action.payload.state;
        state.orders = newOrders;
        state.orderMessage = 'Commande modifiée avec succès';
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.orderLoading = false;
        state.orderError = true;
        state.orderSuccess = true;
        state.orderMessage = action.payload;
      });
  },
});

export const { resetOrderState, logoutOrderState } = orderSlice.actions;

export default orderSlice.reducer;
