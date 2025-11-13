import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getErrorMessage = (error) => {
  return error?.response?.data?.message || error?.message || 'something went wrong';
};

export const getTotalRevenue = createAsyncThunk(
  'admin/getTotalRevenue',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('api/dashboard/admin/total');
      return res.data.totalRevenue;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const lastWeek = createAsyncThunk(
  'admin/lastWeek',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('api/dashboard/admin/week');
      return res.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const topCustomers = createAsyncThunk(
  'admin/topCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('api/dashboard/admin/customer/top');
      return res.data.topCustomers;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const topProducts = createAsyncThunk(
  'admin/topProducts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('api/dashboard/admin/product/top');
      return res.data.topProducts;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

export const topSellers = createAsyncThunk(
  'admin/topSellers',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('api/dashboard/admin/seller/top');
      return res.data.topSellers;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    revenue: 0,
    weekData: {},
    customersData: [],
    productsData: [],
    sellersData: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalRevenue.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTotalRevenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.revenue = action.payload;
      })
      .addCase(getTotalRevenue.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
    builder  
      .addCase(lastWeek.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(lastWeek.fulfilled, (state, action) => {
        state.isLoading = false;
        state.weekData = action.payload;
      })
      .addCase(lastWeek.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
     builder  
      .addCase(topCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(topCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.customersData = action.payload;
      })
      .addCase(topCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      builder  
      .addCase(topProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(topProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsData = action.payload;
      })
      .addCase(topProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      builder
      .addCase(topSellers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(topSellers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sellersData = action.payload;
      })
      .addCase(topSellers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
