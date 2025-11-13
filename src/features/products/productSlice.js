// (http://localhost:8000/api/products

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const getErrorMessage = (error) => {
  return (
    error?.response?.data?.message || error?.message || 'something went wrong'
  );
};
export const getAllProducts = createAsyncThunk(
  'products/getAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('api/products');
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// → getMyProducts
// (http://localhost:8000/api/products/my/products
export const getMyProducts = createAsyncThunk(
  'products/getMyProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/products/my/products');
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
// → getSingleProduct
// (http://localhost:8000/api/products/:id
// )

export const getSingleProduct = createAsyncThunk(
  'products/getSingleProduct',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
// → addProduct
// (http://localhost:8000/api/products/create
// )
export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/products/create', productData);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

// → updateProduct
// (http://localhost:8000/api/products/:id
// )
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/products/${id}`, productData);
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);
// → deleteProduct
// (http://localhost:8000/api/products/:id
// )
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/products/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const initialState = {
  products: [],
  product: null,
  isLoading: false,
  error: false,

};

const productSlice = createSlice({
        name:'Product',
        initialState , 
        reducers:{},
        extraReducers:(builder)=>{
                            builder
                        .addCase(getAllProducts.pending, (state) => {
                             state.isLoading = true;
                             state.error = null;
                           })
                           .addCase(getAllProducts.fulfilled, (state, action) => {
                             state.isLoading = false;
                             state.products.push(action.payload)
                           })
                           .addCase(getAllProducts.rejected, (state, action) => {
                             state.isLoading = false;
                             state.error = action.payload;
                           })

                             builder
                        .addCase(getMyProducts.pending, (state) => {
                             state.isLoading = true;
                             state.error = null;
                           })
                           .addCase(getMyProducts.fulfilled, (state, action) => {
                             state.isLoading = false;
                             state.products.push(action.payload)
                           })
                           .addCase(getMyProducts.rejected, (state, action) => {
                             state.isLoading = false;
                             state.error = action.payload;
                           })    
                             builder
                        .addCase(getSingleProduct.pending, (state) => {
                             state.isLoading = true;
                             state.error = null;
                           })
                           .addCase(getSingleProduct.fulfilled, (state, action) => {
                             state.isLoading = false;
                             state.product = action.payload
                           })
                           .addCase(getSingleProduct.rejected, (state, action) => {
                             state.isLoading = false;
                             state.error = action.payload;
                           })    
                        .addCase(addProduct.pending, (state) => {
                             state.isLoading = true;
                             state.error = null;
                           })
                           .addCase(addProduct.fulfilled, (state, action) => {
                             state.isLoading = false;
                             state.product = action.payload
                           })
                           .addCase(addProduct.rejected, (state, action) => {
                             state.isLoading = false;
                             state.error = action.payload;
                           })    
                        .addCase(updateProduct.pending, (state) => {
                             state.isLoading = true;
                             state.error = null;
                           })
                           .addCase(updateProduct.fulfilled, (state, action) => {
                             state.isLoading = false;
                             state.product = action.payload
                           })
                           .addCase(updateProduct.rejected, (state, action) => {
                             state.isLoading = false;
                             state.error = action.payload;
                           })    
                              


        }

})



