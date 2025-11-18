import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/order/create', orderData);
      return data.order;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error');
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'order/getUserOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/order/orders');
      return data.orders;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error');
    }
  }
);

export const getAdminOrders = createAsyncThunk(
  'order/getAdminOrders',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/order/admin/all');
      return data.order;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error');
    }
  }
);

export const getOrderById = createAsyncThunk(
  'order/getOrderById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/order/user/single/${id}`);
      return data.order;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error');
    }
  }
);

export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/order/user/cancel/${id}`);
      return data.updatedOrder;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error');
    }
  }
);

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/order/seller/update/${id}`,
        updateData
      );
      return data.order;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'Error');
    }
  }
);

const initialState = {
  userOrders: [],
  adminOrders: [],
  orderDetails: null,
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createdOrder = action.payload;
        localStorage.setItem('lastOrder', JSON.stringify(action.payload));
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getAdminOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.adminOrders = action.payload;
      })
      .addCase(getAdminOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(cancelOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
