import axios from 'axios';

export const fetchUserProfile = async (user: number) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/users/${user}/profile`,
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const fetchUserPhoto = async (user: number) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/users/${user}/photo`,
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const fetchUserRecordBook = async (user: number, semester: number) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/users/${user}/record-book/${semester}`,
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const fetchUserRating = async (user: number, semester: number) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/users/${user}/rating/${semester}`,
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const fetchUserSyllabus = async (user: number, semester: number) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/users/${user}/syllabus/${semester}`,
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const postUserCover = async (user: number, image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  return axios({
    method: 'post',
    data: formData,
    url: `${import.meta.env.VITE_APP_API_URL}/api/users/${user}/cover`,
    withCredentials: true,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

export const fetchUsers = async (params: UserQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/users`,
  params,
  withCredentials: true,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});
