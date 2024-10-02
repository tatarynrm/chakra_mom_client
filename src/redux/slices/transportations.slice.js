import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

// Async thunk to fetch transportations
export const fetchTransportations = createAsyncThunk(
  "transportations/fetchTransportations",
  async (params) => {
    console.log('PARAMS', params);

    try {
      const response = await api.get(`/transportation/list?page=${params.page}`);
      console.log('DATA', response.data.data); // Logging the response data
      console.log('RESPONSE', response.data); // Logging the response data

      return response.data; // Return the actual data
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error to handle it in the slice
    }
  }
);

const initialState = {
  transportations: [],
  loading: false, // Use loading instead of status
  error: null, // Initialize error state
};

// Transportation slice
const transportationSlice = createSlice({
  name: "transportations",
  initialState,
  reducers: {
    addTransportation: (state, action) => {
      const updatedTransportation = action.payload; // Ваш новий об'єкт
      console.log('STATE TRANSPORTATION DATA', state.transportations.data);


      state.transportations.data = [...state.transportations.data, action.payload]
      state.loading = false; // Встановити loading в false після оновлення
    },
    updateTransportation: (state, action) => {
      const updatedTransportation = action.payload; // Ваш новий об'єкт
console.log('updatedTransportation',updatedTransportation);


      // Знайти індекс транспортного засобу, який потрібно оновити
      const index = state.transportations.data.findIndex(item => item.id == updatedTransportation.id);

      if (index !== -1) {
        // Оновити транспортний засіб у масиві
        state.transportations.data[index] = updatedTransportation;
      }

      state.loading = false; // Встановити loading в false після оновлення
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTransportations.pending, (state) => {
        state.loading = true; // Set loading to true when fetching
        state.error = null; // Clear previous errors
      })
      .addCase(fetchTransportations.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when fulfilled
        state.transportations = action.payload; // Store the fetched data
      })
      .addCase(fetchTransportations.rejected, (state, action) => {
        state.loading = false; // Set loading to false when rejected
        state.error = action.error.message; // Store the error message
      });
  },
});

// Export the reducer
export const transportationReducer = transportationSlice.reducer;

// Export actions
export const { updateTransportation, addTransportation } = transportationSlice.actions;