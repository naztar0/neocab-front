import { createSlice } from '@reduxjs/toolkit';
import { getUserAcademicPerformance } from '@/store/actions/users';

const initialState = {
  data: null,
  isLoading: false,
};

export const academicPerformanceSlice = createSlice({
  name: 'academicPerformance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserAcademicPerformance.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserAcademicPerformance.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserAcademicPerformance.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default academicPerformanceSlice.reducer;
