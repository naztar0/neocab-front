import { createSlice } from '@reduxjs/toolkit';
import {
  getSpecializations,
  getSpecialization,
  getDepartmentSpecializations,
  getProgramSpecializations,
  getSpecialitySpecializations,
  getFacultySpecializations,
} from '@/store/actions/groups';

const initialState = {
  isLoading: false,
  specializations: [],
  specialization: null,
};

export const specializationSlice = createSlice({
  name: 'specialization',
  initialState,
  reducers: {
    resetSpecializations: (state) => {
      state.specializations = [];
      state.specialization = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSpecializations.fulfilled, (state, action) => {
      state.specializations = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSpecializations.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSpecializations.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSpecialization.fulfilled, (state, action) => {
      state.specialization = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSpecialization.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSpecialization.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getDepartmentSpecializations.fulfilled, (state, action) => {
      state.specializations = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDepartmentSpecializations.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getDepartmentSpecializations.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProgramSpecializations.fulfilled, (state, action) => {
      state.specializations = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProgramSpecializations.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProgramSpecializations.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSpecialitySpecializations.fulfilled, (state, action) => {
      state.specializations = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSpecialitySpecializations.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSpecialitySpecializations.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getFacultySpecializations.fulfilled, (state, action) => {
      state.specializations = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getFacultySpecializations.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getFacultySpecializations.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { resetSpecializations } = specializationSlice.actions;

export default specializationSlice.reducer;
