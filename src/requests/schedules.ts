import { getAxiosInstance } from '@/requests/config';

export const fetchUserAzureSchedule = async (user: number) => getAxiosInstance().get(
  `/api/users/${user}/azure-schedule`,
);

export const fetchGroupSchedules = async (group: number) => getAxiosInstance().get(
  `/api/groups/${group}/schedules`,
);

export const fetchGroupSubjects = async (group: number, semester: number) => getAxiosInstance().get(
  `/api/groups/${group}/subjects/${semester}`,
);

export const postGroupSchedule = async (group: number, data: any) => getAxiosInstance().post(
  `/api/groups/${group}/schedules`,
  data,
);

export const postScheduleSubject = async (schedule: number, subject: number, data: any) => getAxiosInstance().post(
  `/api/schedules/${schedule}/subjects/${subject}`,
  data,
);

export const patchSchedule = async (schedule: number, data: any) => getAxiosInstance().patch(
  `/api/schedules/${schedule}`,
  data,
);

export const patchScheduleSubject = async (scheduleSubject: number, data: any) => getAxiosInstance().patch(
  `/api/schedule-subjects/${scheduleSubject}`,
  data,
);

export const deleteSchedule = async (schedule: number) => getAxiosInstance().delete(
  `/api/schedules/${schedule}`,
);

export const deleteScheduleSubject = async (scheduleSubject: number) => getAxiosInstance().delete(
  `/api/schedule-subjects/${scheduleSubject}`,
);
