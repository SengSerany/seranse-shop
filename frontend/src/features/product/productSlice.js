import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
  products: null,
  productError: false,
  productSuccess: false,
  productLoading: false,
  productMessage: '',
};

export const indexProducts = createAsyncThunk(
  'product/index',
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      const productMessage =
        (error.response &&
          error.response.data &&
          error.response.data.productMessage) ||
        error.productMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(productMessage);
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/create',
  async (productData, thunkAPI) => {
    try {
      return await productService.createNewProducts(productData);
    } catch (error) {
      const productMessage =
        (error.response &&
          error.response.data &&
          error.response.data.productMessage) ||
        error.productMessage ||
        error.toString();
      return thunkAPI.rejectWithValue(productMessage);
    }
  }
);

// export const updateProduct = createAsyncThunk(
//   'product/update',
//   async (productData, thunkAPI) => {
//     try {
//       return await productService.updateProducts(productData);
//     } catch (error) {
//       const productMessage =
//         (error.response &&
//           error.response.data &&
//           error.response.data.productMessage) ||
//         error.productMessage ||
//         error.toString();
//       return thunkAPI.rejectWithValue(productMessage);
//     }
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   'product/delete',
//   async (productID, thunkAPI) => {
//     try {
//       return await productService.deleteProducts(productID);
//     } catch (error) {
//       const productMessage =
//         (error.response &&
//           error.response.data &&
//           error.response.data.productMessage) ||
//         error.productMessage ||
//         error.toString();
//       return thunkAPI.rejectWithValue(productMessage);
//     }
//   }
// );

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.productError = false;
      state.productSuccess = false;
      state.productLoading = false;
      state.productMessage = '';
    },
    logoutProductState: () => initialState,
  },
  extraReducers: (builder) =>
    builder
      .addCase(indexProducts.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(indexProducts.fulfilled, (state, action) => {
        state.products = action.payload.data ? action.payload.data : [];
        state.productLoading = false;
      })
      .addCase(indexProducts.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = true;
        state.productMessage = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productSuccess = true;
        console.log(action.payload);
        state.products.push(action.payload.data);
        state.productMessage = `Tu as crée le plat "${action.payload.data.productName}"`;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = true;
        state.productMessage = action.payload;
      }),
  //   .addCase(updateProduct.pending, (state) => {
  //     state.productLoading = true;
  //   })
  //   .addCase(updateProduct.fulfilled, (state, action) => {
  //     state.productLoading = false;
  //     state.productSuccess = true;
  //     state.products = state.products.map((product) => {
  //       if (product._id === action.payload.updatedProduct._id) {
  //         return action.payload.updatedProduct;
  //       } else {
  //         return product;
  //       }
  //     });
  //     state.productMessage = `Tu as modifié le plat "${action.payload.updatedProduct.name}"`;
  //   })
  //   .addCase(updateProduct.rejected, (state, action) => {
  //     state.productLoading = false;
  //     state.productError = true;
  //     state.productMessage = action.payload;
  //   })
  //   .addCase(deleteProduct.pending, (state) => {
  //     state.productLoading = true;
  //   })
  //   .addCase(deleteProduct.fulfilled, (state, action) => {
  //     state.productLoading = false;
  //     state.productSuccess = true;
  //     state.products = state.products.filter(
  //       (products) => products._id !== action.payload.id
  //     );
  //     state.productMessage = `Tu as supprimer le plat "${action.payload.name}"`;
  //   })
  //   .addCase(deleteProduct.rejected, (state, action) => {
  //     state.productLoading = false;
  //     state.productError = true;
  //     state.productMessage = action.payload;
  //   }),
});

export const { resetProductState, logoutProductState } = productSlice.actions;

export default productSlice.reducer;
