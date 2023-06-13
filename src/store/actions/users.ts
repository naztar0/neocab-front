import { createAsyncThunk } from '@reduxjs/toolkit';
import responseHandler from '@/store/actions/config';
import {
  fetchUserProfile,
  fetchUserRecordBook,
  fetchUserRating,
  fetchUserSyllabus,
  fetchUserContract,
  fetchUserAttendance,
  fetchUserAcademicPerformance,
  fetchUsers,
  postSyncUserPhoto,
  postUserCover,
  postUserAttendance,
} from '@/requests/users';

export const getUsers = createAsyncThunk(
  'get_users',
  async ({ params }: { params: UserQueryParams }) => (
    await responseHandler(fetchUsers(params))
  ).data,
);

export const getMyProfile = createAsyncThunk(
  'get_my_profile',
  async ({ user }: { user: number }) => (
    await responseHandler(fetchUserProfile(user))
  ).data,
);

export const getUserProfile = createAsyncThunk(
  'get_user_profile',
  async ({ user }: { user: number }) => (
    await responseHandler(fetchUserProfile(user))
  ).data,
);

export const getUserRecordBook = createAsyncThunk(
  'get_user_record_book',
  async ({ user, semester }: { user: number, semester: number }) => (
    await responseHandler(fetchUserRecordBook(user, semester))
  ).data,
);

export const getUserRating = createAsyncThunk(
  'get_user_rating',
  async ({ user, semester }: { user: number, semester: number }) => (
    await responseHandler(fetchUserRating(user, semester))
  ).data,
);

export const getUserSyllabus = createAsyncThunk(
  'get_user_syllabus',
  async ({ user, semester }: { user: number, semester: number }) => (
    await responseHandler(fetchUserSyllabus(user, semester))
  ).data,
);

export const getUserContract = createAsyncThunk(
  'get_user_contract',
  async ({ user }: { user: number }) => (
    await responseHandler(fetchUserContract(user))
  ).data,
);

export const getUserAttendance = createAsyncThunk(
  'get_user_attendance',
  async ({ user }: { user: number }) => (
    await responseHandler(fetchUserAttendance(user))
  ).data,
);

export const getUserAcademicPerformance = createAsyncThunk(
  'get_user_academic_performance',
  async ({ user }: { user: number }) => (
    await responseHandler(fetchUserAcademicPerformance(user))
  ).data,
);

export const syncUserPhoto = createAsyncThunk(
  'sync_user_photo',
  async ({ user }: { user: number }) => (
    await responseHandler(postSyncUserPhoto(user))
  ).data,
);

export const setUserCover = createAsyncThunk(
  'post_user_cover',
  async ({ user, image }: { user: number, image: File }) => (
    await responseHandler(postUserCover(user, image))
  ).data,
);

export const setUserAttendance = createAsyncThunk(
  'post_user_attendance',
  async ({ user, scheduleSubject, data }: { user: number, scheduleSubject: number, data: any }) => (
    await responseHandler(postUserAttendance(user, scheduleSubject, data))
  ).data,
);
