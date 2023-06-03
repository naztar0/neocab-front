import { createSlice } from '@reduxjs/toolkit';
import {
  getFaculties,
  getFaculty,
} from '@/store/actions/groups';

const initialState = {
  isLoading: false,
  faculties: [],
  faculty: null,
};

export const facultySlice = createSlice({
  name: 'faculty',
  initialState,
  reducers: {
    resetFaculties: (state) => {
      state.faculties = [];
      state.faculty = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFaculties.fulfilled, (state, action) => {
      state.faculties = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getFaculties.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getFaculties.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getFaculty.fulfilled, (state, action) => {
      state.faculty = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getFaculty.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getFaculty.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { resetFaculties } = facultySlice.actions;

export default facultySlice.reducer;
