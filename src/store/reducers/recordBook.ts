import { createSlice } from '@reduxjs/toolkit';
import { getUserRecordBook } from '@/store/actions/users';

const initialState = {
  isLoading: true,
  recordBook: [],
};

export const recordBookSlice = createSlice({
  name: 'recordBook',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserRecordBook.fulfilled, (state, action) => {
      state.recordBook = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserRecordBook.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserRecordBook.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default recordBookSlice.reducer;
