import { createSlice } from '@reduxjs/toolkit';
import { getUserSyllabus } from '@/store/actions/users';

const initialState = {
  isLoading: true,
  syllabus: [],
};

export const syllabusSlice = createSlice({
  name: 'syllabus',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserSyllabus.fulfilled, (state, action) => {
      state.syllabus = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserSyllabus.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserSyllabus.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default syllabusSlice.reducer;
