import { createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import {
  getUserAzureSchedule,
  getGroupSchedules,
  getGroupSubjects,
  addGroupSchedule,
  addScheduleSubject,
  editSchedule,
  editScheduleSubject,
  removeSchedule,
  removeScheduleSubject,
} from '@/store/actions/schedules';
import { CalendarWeekDays } from '@/constants/settings';
import { ScheduleType } from '@/constants/schedule';

const initialState = {
  isLoading: true,
  dataSwitch: false,
  azureSchedule: [],
  groupSchedule: [],
  groupSubjects: [],
  calendarStartHour: Number(cookies.get('calendarStartHour')) || 7,
  calendarEndHour: Number(cookies.get('calendarEndHour')) || 20,
  calendarWeekDays: Number(cookies.get('calendarWeekDays')) || CalendarWeekDays.toSaturday,
  scheduleType: Number(cookies.get('scheduleType')) || ScheduleType.azure,
  currentMonth: (new Date()).toJSON(),
  week: null,
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setGroupSchedule: (state, action) => {
      state.groupSchedule = action.payload;
    },
    setCalendarStartHour: (state, action) => {
      state.calendarStartHour = action.payload;
    },
    setCalendarEndHour: (state, action) => {
      state.calendarEndHour = action.payload;
    },
    setCalendarWeekDays: (state, action) => {
      state.calendarWeekDays = action.payload;
    },
    setScheduleType: (state, action) => {
      state.scheduleType = action.payload;
    },
    setCurrentMonth: (state, action) => {
      state.currentMonth = action.payload;
    },
    setWeek: (state, action) => {
      state.week = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAzureSchedule.fulfilled, (state, action) => {
      state.azureSchedule = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserAzureSchedule.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserAzureSchedule.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getGroupSchedules.fulfilled, (state, action) => {
      state.groupSchedule = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getGroupSchedules.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getGroupSchedules.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getGroupSubjects.fulfilled, (state, action) => {
      state.groupSubjects = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getGroupSubjects.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getGroupSubjects.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addGroupSchedule.fulfilled, (state) => {
      state.dataSwitch = !state.dataSwitch;
      state.isLoading = false;
    });
    builder.addCase(addGroupSchedule.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addGroupSchedule.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(addScheduleSubject.fulfilled, (state) => {
      state.dataSwitch = !state.dataSwitch;
      state.isLoading = false;
    });
    builder.addCase(addScheduleSubject.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addScheduleSubject.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(editSchedule.fulfilled, (state) => {
      state.dataSwitch = !state.dataSwitch;
      state.isLoading = false;
    });
    builder.addCase(editSchedule.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editSchedule.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(editScheduleSubject.fulfilled, (state) => {
      state.dataSwitch = !state.dataSwitch;
      state.isLoading = false;
    });
    builder.addCase(editScheduleSubject.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(editScheduleSubject.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(removeSchedule.fulfilled, (state) => {
      state.dataSwitch = !state.dataSwitch;
      state.isLoading = false;
    });
    builder.addCase(removeSchedule.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(removeSchedule.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(removeScheduleSubject.fulfilled, (state) => {
      state.dataSwitch = !state.dataSwitch;
      state.isLoading = false;
    });
    builder.addCase(removeScheduleSubject.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(removeScheduleSubject.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const {
  setCalendarStartHour,
  setCalendarEndHour,
  setCalendarWeekDays,
  setScheduleType,
  setCurrentMonth,
  setWeek,
} = scheduleSlice.actions;

export default scheduleSlice.reducer;
