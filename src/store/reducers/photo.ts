import { createSlice } from '@reduxjs/toolkit';
import { syncUserPhoto } from '@/store/actions/users';

const initialState = {
  isLoading: false,
};

export const photoSlice = createSlice({
  name: 'photo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(syncUserPhoto.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(syncUserPhoto.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(syncUserPhoto.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default photoSlice.reducer;
