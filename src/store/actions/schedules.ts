import { createAsyncThunk } from '@reduxjs/toolkit';
import responseHandler from '@/store/actions/config';
import {
  fetchUserAzureSchedule,
  fetchGroupSchedules,
  fetchGroupSubjects,
  postGroupSchedule,
  postScheduleSubject,
  patchSchedule,
  patchScheduleSubject,
  deleteSchedule,
  deleteScheduleSubject,
} from '@/requests/schedules';

export const getUserAzureSchedule = createAsyncThunk(
  'get_user_azure_schedule',
  async ({ user }: { user: number }) => (
    await responseHandler(fetchUserAzureSchedule(user))
  ).data,
);

export const getGroupSchedules = createAsyncThunk(
  'get_group_schedules',
  async ({ group }: { group: number }) => (
    await responseHandler(fetchGroupSchedules(group))
  ).data,
);

export const getGroupSubjects = createAsyncThunk(
  'get_group_subjects',
  async ({ group, semester }: { group: number, semester: number }) => (
    await responseHandler(fetchGroupSubjects(group, semester))
  ).data,
);

export const addGroupSchedule = createAsyncThunk(
  'add_group_schedule',
  async ({ group, data }: { group: number, data: any }) => (
    await responseHandler(postGroupSchedule(group, data))
  ).data,
);

export const addScheduleSubject = createAsyncThunk(
  'add_group_schedule_subject',
  async ({ schedule, subject, data }: { schedule: number, subject: number, data: any }) => (
    await responseHandler(postScheduleSubject(schedule, subject, data))
  ).data,
);

export const editSchedule = createAsyncThunk(
  'edit_schedule',
  async ({ schedule, data }: { schedule: number, data: any }) => (
    await responseHandler(patchSchedule(schedule, data))
  ).data,
);

export const editScheduleSubject = createAsyncThunk(
  'edit_schedule_subject',
  async ({ scheduleSubject, data }: { scheduleSubject: number, data: any }) => (
    await responseHandler(patchScheduleSubject(scheduleSubject, data))
  ).data,
);

export const removeSchedule = createAsyncThunk(
  'remove_schedule',
  async ({ schedule }: { schedule: number }) => (
    await responseHandler(deleteSchedule(schedule))
  ).data,
);

export const removeScheduleSubject = createAsyncThunk(
  'remove_schedule_subject',
  async ({ scheduleSubject }: { scheduleSubject: number }) => (
    await responseHandler(deleteScheduleSubject(scheduleSubject))
  ).data,
);
