import { createSlice } from '@reduxjs/toolkit';
import {
  getPrograms,
  getProgram,
  getSpecialityPrograms,
  getFacultyPrograms,
} from '@/store/actions/groups';

const initialState = {
  isLoading: false,
  programs: [],
  program: null,
};

export const programSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {
    resetPrograms: (state) => {
      state.programs = [];
      state.program = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPrograms.fulfilled, (state, action) => {
      state.programs = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getPrograms.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getPrograms.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProgram.fulfilled, (state, action) => {
      state.program = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProgram.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProgram.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSpecialityPrograms.fulfilled, (state, action) => {
      state.programs = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSpecialityPrograms.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSpecialityPrograms.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getFacultyPrograms.fulfilled, (state, action) => {
      state.programs = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getFacultyPrograms.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getFacultyPrograms.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { resetPrograms } = programSlice.actions;

export default programSlice.reducer;
