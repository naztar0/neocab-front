import { createSlice } from '@reduxjs/toolkit';
import {
  getSpecialities,
  getSpeciality,
  getFacultySpecialities,
} from '@/store/actions/groups';

const initialState = {
  isLoading: false,
  specialities: [],
  speciality: null,
};

export const specialitySlice = createSlice({
  name: 'speciality',
  initialState,
  reducers: {
    resetSpecialities: (state) => {
      state.specialities = [];
      state.speciality = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSpecialities.fulfilled, (state, action) => {
      state.specialities = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSpecialities.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSpecialities.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSpeciality.fulfilled, (state, action) => {
      state.speciality = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSpeciality.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSpeciality.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getFacultySpecialities.fulfilled, (state, action) => {
      state.specialities = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getFacultySpecialities.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getFacultySpecialities.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { resetSpecialities } = specialitySlice.actions;

export default specialitySlice.reducer;
