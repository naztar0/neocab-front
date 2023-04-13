import { createSlice } from '@reduxjs/toolkit';
import { getUserNotifications, postNotificationRead } from '@/store/actions/notifications';

const initialState = {
  notifications: [],
  isLoading: false,
  dataSwitch: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserNotifications.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserNotifications.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(postNotificationRead.fulfilled, (state) => {
      state.dataSwitch = !state.dataSwitch;
      state.isLoading = false;
    });
    builder.addCase(postNotificationRead.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postNotificationRead.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default notificationSlice.reducer;
