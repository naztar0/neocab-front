import { createSlice } from '@reduxjs/toolkit';
import { getUserContract } from '@/store/actions/users';

const initialState = {
  isLoading: true,
  contract: null,
};

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserContract.fulfilled, (state, action) => {
      state.contract = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserContract.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserContract.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default contractSlice.reducer;
