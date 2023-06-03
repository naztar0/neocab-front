import { createSlice } from '@reduxjs/toolkit';
import { setUserCover } from '@/store/actions/users';

const initialState = {
  isLoading: false,
};

export const coverSlice = createSlice({
  name: 'cover',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUserCover.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(setUserCover.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(setUserCover.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default coverSlice.reducer;
