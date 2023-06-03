import { getAxiosInstance } from '@/requests/config';

export const fetchUsers = async (params: UserQueryParams) => getAxiosInstance().get(
  '/api/users',
  { params },
);

export const fetchUserProfile = async (user: number) => getAxiosInstance().get(
  `/api/users/${user}/profile`,
);

export const fetchUserRecordBook = async (user: number, semester: number) => getAxiosInstance().get(
  `/api/users/${user}/record-book/${semester}`,
);

export const fetchUserRating = async (user: number, semester: number) => getAxiosInstance().get(
  `/api/users/${user}/rating/${semester}`,
);

export const fetchUserSyllabus = async (user: number, semester: number) => getAxiosInstance().get(
  `/api/users/${user}/syllabus/${semester}`,
);

export const fetchUserAttendance = async (user: number) => getAxiosInstance().get(
  `/api/users/${user}/attendance`,
);

export const postSyncUserPhoto = async (user: number) => getAxiosInstance().post(
  `/api/users/${user}/photo`,
);

export const postUserCover = async (user: number, image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  return getAxiosInstance().post(
    `/api/users/${user}/cover`,
    formData,
  );
};

export const postUserAttendance = async (user: number, scheduleSubject: number, data: any) => getAxiosInstance().post(
  `/api/users/${user}/attendance/${scheduleSubject}`,
  data,
);
