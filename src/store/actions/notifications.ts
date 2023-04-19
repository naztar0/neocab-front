import { createAsyncThunk } from '@reduxjs/toolkit';
import responseHandler from '@/store/actions/config';
import {
  fetchUserNotifications,
  postUNotificationRead,
} from '@/requests/notifications';

export const getUserNotifications = createAsyncThunk(
  'get_user_notifications',
  async ({ user }: { user: number }) => (
    await responseHandler(fetchUserNotifications(user))
  ).data,
);

export const postNotificationRead = createAsyncThunk(
  'post_notification_read',
  async ({ notification }: { notification: number }) => (
    await responseHandler(postUNotificationRead(notification))
  ).data,
);
