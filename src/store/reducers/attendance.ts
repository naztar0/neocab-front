import { createSlice } from '@reduxjs/toolkit';
import { getUserAttendance, setUserAttendance } from '@/store/actions/users';
import { getGroupAttendance } from '@/store/actions/groups';

const initialState = {
  dataSwitch: false,
  attendance: null,
  isLoading: false,
};

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    resetAttendance: (state) => {
      state.attendance = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAttendance.fulfilled, (state, action) => {
      state.attendance = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserAttendance.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserAttendance.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getGroupAttendance.fulfilled, (state, action) => {
      state.attendance = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getGroupAttendance.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getGroupAttendance.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(setUserAttendance.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(setUserAttendance.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(setUserAttendance.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { resetAttendance } = attendanceSlice.actions;

export default attendanceSlice.reducer;
