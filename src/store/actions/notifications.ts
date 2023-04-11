import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchUserNotifications,
  postUNotificationRead,
} from '@/requests/notifications';

export const getUserNotifications = createAsyncThunk(
  'get_user_notifications',
  async ({ user }: { user: number }) => (
    await fetchUserNotifications(user)
  ).data,
);

export const postNotificationRead = createAsyncThunk(
  'post_notification_read',
  async ({ notification }: { notification: number }) => (
    await postUNotificationRead(notification)
  ).data,
);
