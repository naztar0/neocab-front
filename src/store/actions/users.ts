import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUserProfile,
  fetchUserPhoto,
  fetchUserRecordBook,
  fetchUserRating,
  fetchUserSyllabus,
  fetchUserAttendance,
  fetchUsers,
  postUserCover,
  postUserAttendance,
} from '@/requests/users';

export const getMyProfile = createAsyncThunk(
  'get_my_profile',
  async ({ user }: { user: number }) => (
    await fetchUserProfile(user)
  ).data,
);

export const getMyPhoto = createAsyncThunk(
  'get_my_photo',
  async ({ user }: { user: number }) => (
    await fetchUserPhoto(user)
  ).data,
);

export const getUserProfile = createAsyncThunk(
  'get_user_profile',
  async ({ user }: { user: number }) => (
    await fetchUserProfile(user)
  ).data,
);

export const getUserPhoto = createAsyncThunk(
  'get_user_photo',
  async ({ user }: { user: number }) => (
    await fetchUserPhoto(user)
  ).data,
);

export const getUserRecordBook = createAsyncThunk(
  'get_user_record_book',
  async ({ user, semester }: { user: number, semester: number }) => (
    await fetchUserRecordBook(user, semester)
  ).data,
);

export const getUserRating = createAsyncThunk(
  'get_user_rating',
  async ({ user, semester }: { user: number, semester: number }) => (
    await fetchUserRating(user, semester)
  ).data,
);

export const getUserSyllabus = createAsyncThunk(
  'get_user_syllabus',
  async ({ user, semester }: { user: number, semester: number }) => (
    await fetchUserSyllabus(user, semester)
  ).data,
);

export const getUserAttendance = createAsyncThunk(
  'get_user_attendance',
  async ({ user }: { user: number }) => (
    await fetchUserAttendance(user)
  ).data,
);

export const getUsers = createAsyncThunk(
  'get_users',
  async ({ params }: { params: UserQueryParams }) => (
    await fetchUsers(params)
  ).data,
);

export const setUserCover = createAsyncThunk(
  'post_user_cover',
  async ({ user, image }: { user: number, image: File }) => (
    await postUserCover(user, image)
  ).data,
);

export const setUserAttendance = createAsyncThunk(
  'post_user_attendance',
  async ({ user, scheduleSubject, data }: { user: number, scheduleSubject: number, data: any }) => (
    await postUserAttendance(user, scheduleSubject, data)
  ).data,
);
