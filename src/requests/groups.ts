import axios from 'axios';

export const fetchGroups = async (params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/groups`,
  params,
});

export const fetchGroup = async (group: number) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/groups/${group}`,
});

export const fetchGroupUsers = async (group: number, params?: UserQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/groups/${group}/users`,
  params,
});

export const fetchGroupSchedules = async (group: number) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/groups/${group}/schedules`,
});

export const fetchSpecializations = async (params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/specializations`,
  params,
});

export const fetchSpecialization = async (specialization: number) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/specializations/${specialization}`,
});

// eslint-disable-next-line max-len
export const fetchSpecializationUsers = async (specialization: number, params?: UserQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/specializations/${specialization}/users`,
  params,
});

// eslint-disable-next-line max-len
export const fetchSpecializationGroups = async (specialization: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/specializations/${specialization}/groups`,
  params,
});

export const fetchDepartments = async (params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/departments`,
  params,
});

export const fetchDepartment = async (department: number) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/departments/${department}`,
});

export const fetchDepartmentUsers = async (department: number, params?: UserQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/departments/${department}/users`,
  params,
});

export const fetchDepartmentGroups = async (department: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/departments/${department}/groups`,
  params,
});

export const fetchDepartmentSpecializations = async (department: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/departments/${department}/specializations`,
  params,
});

export const fetchPrograms = async (params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/programs`,
  params,
});

export const fetchProgram = async (program: number) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/programs/${program}`,
});

export const fetchProgramUsers = async (program: number, params?: UserQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/programs/${program}/users`,
  params,
});

export const fetchProgramGroups = async (program: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/programs/${program}/groups`,
  params,
});

export const fetchProgramSpecializations = async (program: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/programs/${program}/specializations`,
  params,
});

export const fetchProgramDepartments = async (program: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/programs/${program}/departments`,
  params,
});

export const fetchSpecialities = async (params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/specialities`,
  params,
});

export const fetchSpeciality = async (speciality: number) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/specialities/${speciality}`,
});

export const fetchSpecialityUsers = async (speciality: number, params?: UserQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/specialities/${speciality}/users`,
  params,
});

export const fetchSpecialityGroups = async (speciality: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/specialities/${speciality}/groups`,
  params,
});

export const fetchSpecialitySpecializations = async (speciality: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/specialities/${speciality}/specializations`,
  params,
});

export const fetchSpecialityDepartments = async (speciality: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/specialities/${speciality}/departments`,
  params,
});

export const fetchSpecialityPrograms = async (speciality: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/specialities/${speciality}/programs`,
  params,
});

export const fetchFaculties = async (params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/faculties`,
  params,
});

export const fetchFaculty = async (faculty: number) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/faculties/${faculty}`,
});

export const fetchFacultyUsers = async (faculty: number, params?: UserQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/faculties/${faculty}/users`,
  params,
});

export const fetchFacultyGroups = async (faculty: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/faculties/${faculty}/groups`,
  params,
});

export const fetchFacultySpecializations = async (faculty: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/faculties/${faculty}/specializations`,
  params,
});

export const fetchFacultyDepartments = async (faculty: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/faculties/${faculty}/departments`,
  params,
});

export const fetchFacultyPrograms = async (faculty: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/faculties/${faculty}/programs`,
  params,
});

export const fetchFacultySpecialities = async (faculty: number, params?: GroupQueryParams) => axios({
  method: 'get',
  url: `${import.meta.env.VITE_APP_API_URL}/api/faculties/${faculty}/specialities`,
  params,
});
