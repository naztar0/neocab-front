import { createSlice } from '@reduxjs/toolkit';
import { getUserRating } from '@/store/actions/users';

const initialState = {
  isLoading: true,
  rating: [],
};

export const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserRating.fulfilled, (state, action) => {
      state.rating = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserRating.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserRating.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default ratingSlice.reducer;
