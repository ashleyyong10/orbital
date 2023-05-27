import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moduleService from "./moduleService";

const initialState = {
  modules: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new module
export const createModule = createAsyncThunk(
  "modules/create",
  async (moduleData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await moduleService.createModule(moduleData, token);
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

// Get user modules
export const getModules = createAsyncThunk(
  "modules/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await moduleService.getModules(token);
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

// Delete user module
export const deleteModule = createAsyncThunk(
  "modules/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await moduleService.deleteModule(id, token);
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

export const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createModule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createModule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.modules.push(action.payload);
      })
      .addCase(createModule.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getModules.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getModules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.modules = action.payload;
      })
      .addCase(getModules.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteModule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteModule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.modules = state.modules.filter(
          (module) => module._id !== action.payload.id
        );
      })
      .addCase(deleteModule.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = moduleSlice.actions;
export default moduleSlice.reducer;
