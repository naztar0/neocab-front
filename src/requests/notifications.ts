import { getAxiosInstance } from '@/requests/config';

export const fetchUserNotifications = async (user: number) => getAxiosInstance().get(
  `/api/users/${user}/notifications`,
);

export const postUNotificationRead = async (notification: number) => getAxiosInstance().post(
  `/api/notifications/${notification}/read`,
);
