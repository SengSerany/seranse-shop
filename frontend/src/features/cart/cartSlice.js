import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cartService from './cartService';

const initialState = {
  cart: null,
  productsInCart: null,
  cartError: false,
  cartSuccess: false,
  cartLoading: false,
  cartMessage: '',
};

export const getMyCart = createAsyncThunk('cart/get', async (_, thunkAPI) => {
  try {
    return await cartService.getCart();
  } catch (error) {
    const cartMessage =
      (error.response &&
        error.response.data &&
        error.response.data.cartMessage) ||
      error.cartMessage ||
      error.toString();
    return thunkAPI.rejectWithValue(cartMessage);
  }
});

export const changeInCart = createAsyncThunk(
  'cart/change',
  async (linkObj, thunkAPI) => {
    try {
      return await cartService.changeProduct(linkObj);
    } catch (error) {
      const cartMessage =
        (error.response &&
          error.response.data &&
          error.response.data.cartMessage) ||
        error.cartMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(cartMessage);
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cartError = false;
      state.cartSuccess = false;
      state.cartLoading = false;
      state.cartMessage = '';
    },
    validateCart: (state) => {
      state.productsInCart = [];
      state.cartError = false;
      state.cartSuccess = false;
      state.cartLoading = false;
      state.cartMessage = '';
    },
    logoutCartState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(getMyCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartError = false;
        state.cartSuccess = true;
        state.cart = action.payload.cart;
        state.productsInCart = action.payload.data ? action.payload.data : [];
      })
      .addCase(getMyCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = true;
        state.cartSuccess = true;
        state.cartMessage = action.payload;
      })
      .addCase(changeInCart.pending, (state) => {
        state.cartLoading = true;
      })
      .addCase(changeInCart.fulfilled, (state, action) => {
        state.cartLoading = false;
        state.cartError = false;
        if (action.payload.data.quantity === 0) {
          state.productsInCart = state.productsInCart.filter(
            (productInCart) => productInCart._id !== action.payload.data._id
          );
        } else if (action.payload.data.quantity > 0) {
          if (
            state.productsInCart.find(
              (productInCart) => productInCart._id === action.payload.data._id
            )
          ) {
            state.productsInCart = state.productsInCart.map((productInCart) => {
              if (productInCart._id === action.payload.data._id) {
                return action.payload.data;
              }
              return productInCart;
            });
          } else {
            state.productsInCart.push(action.payload.data);
          }
        }
      })
      .addCase(changeInCart.rejected, (state, action) => {
        state.cartLoading = false;
        state.cartError = true;
        state.cartSuccess = false;
        state.cartMessage = action.payload;
      });
  },
});

export const { validateCart, resetCartState, logoutCartState } =
  cartSlice.actions;

export default cartSlice.reducer;
