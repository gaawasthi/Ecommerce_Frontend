

//api/products/order/create
//api/products/order/all
//api/products/order//orders/:id
//api/products/order/orders/cancel/:id
//api/products/order//orders/cancel/:id
//api/products/order//orders/update/:id

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/order/create", orderData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Error"
      );
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/order/all");
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Error"
      );
    }
  }
);

export const getOrderById = createAsyncThunk(
  "order/getOrderById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/products/order/orders/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Error"
      );
    }
  }
);


export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/products/order/orders/cancel/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Error"
      );
    }
  }
);


export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `/api/products/order/orders/update/${id}`,
        updateData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Error"
      );
    }
  }
);



const initialState = {
  allOrders: [],
  count:0,
  orderDetails: null,
  createdOrder: null,
  isLoading: false,
  error: null,
  success: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetSuccess(state) {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
 
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.createdOrder = action.payload;
        state.success = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allOrders = action.payload.order
      })
      .addCase(getAllOrders.rejected, (state, action) => {
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
        state.success = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetSuccess } = orderSlice.actions;
export default orderSlice.reducer;
