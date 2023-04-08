import { getAxiosInstance } from '@/requests/config';

export const fetchGroups = async (params?: GroupQueryParams) => getAxiosInstance().get(
  '/api/groups',
  { params },
);

export const fetchGroup = async (group: number) => getAxiosInstance().get(
  `/api/groups/${group}`,
);

export const fetchGroupUsers = async (group: number, params?: UserQueryParams) => getAxiosInstance().get(
  `/api/groups/${group}/users`,
  { params },
);

export const fetchSpecializations = async (params?: GroupQueryParams) => getAxiosInstance().get(
  '/api/specializations',
  { params },
);

export const fetchSpecialization = async (specialization: number) => getAxiosInstance().get(
  `/api/specializations/${specialization}`,
);

// eslint-disable-next-line max-len
export const fetchSpecializationUsers = async (specialization: number, params?: UserQueryParams) => getAxiosInstance().get(
  `/api/specializations/${specialization}/users`,
  { params },
);

// eslint-disable-next-line max-len
export const fetchSpecializationGroups = async (specialization: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/specializations/${specialization}/groups`,
  { params },
);

export const fetchDepartments = async (params?: GroupQueryParams) => getAxiosInstance().get(
  '/api/departments',
  { params },
);

export const fetchDepartment = async (department: number) => getAxiosInstance().get(
  `/api/departments/${department}`,
);

export const fetchDepartmentUsers = async (department: number, params?: UserQueryParams) => getAxiosInstance().get(
  `/api/departments/${department}/users`,
  { params },
);

export const fetchDepartmentGroups = async (department: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/departments/${department}/groups`,
  { params },
);

// eslint-disable-next-line max-len
export const fetchDepartmentSpecializations = async (department: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/departments/${department}/specializations`,
  { params },
);

export const fetchPrograms = async (params?: GroupQueryParams) => getAxiosInstance().get(
  '/api/programs',
  { params },
);

export const fetchProgram = async (program: number) => getAxiosInstance().get(
  `/api/programs/${program}`,
);

export const fetchProgramUsers = async (program: number, params?: UserQueryParams) => getAxiosInstance().get(
  `/api/programs/${program}/users`,
  { params },
);

export const fetchProgramGroups = async (program: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/programs/${program}/groups`,
  { params },
);

export const fetchProgramSpecializations = async (program: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/programs/${program}/specializations`,
  { params },
);

export const fetchProgramDepartments = async (program: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/programs/${program}/departments`,
  { params },
);

export const fetchSpecialities = async (params?: GroupQueryParams) => getAxiosInstance().get(
  '/api/specialities',
  { params },
);

export const fetchSpeciality = async (speciality: number) => getAxiosInstance().get(
  `/api/specialities/${speciality}`,
);

export const fetchSpecialityUsers = async (speciality: number, params?: UserQueryParams) => getAxiosInstance().get(
  `/api/specialities/${speciality}/users`,
  { params },
);

export const fetchSpecialityGroups = async (speciality: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/specialities/${speciality}/groups`,
  { params },
);

// eslint-disable-next-line max-len
export const fetchSpecialitySpecializations = async (speciality: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/specialities/${speciality}/specializations`,
  { params },
);

// eslint-disable-next-line max-len
export const fetchSpecialityDepartments = async (speciality: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/specialities/${speciality}/departments`,
  { params },
);

export const fetchSpecialityPrograms = async (speciality: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/specialities/${speciality}/programs`,
  { params },
);

export const fetchFaculties = async (params?: GroupQueryParams) => getAxiosInstance().get(
  '/api/faculties',
  { params },
);

export const fetchFaculty = async (faculty: number) => getAxiosInstance().get(
  `/api/faculties/${faculty}`,
);

export const fetchFacultyUsers = async (faculty: number, params?: UserQueryParams) => getAxiosInstance().get(
  `/api/faculties/${faculty}/users`,
  { params },
);

export const fetchFacultyGroups = async (faculty: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/faculties/${faculty}/groups`,
  { params },
);

export const fetchFacultySpecializations = async (faculty: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/faculties/${faculty}/specializations`,
  { params },
);

export const fetchFacultyDepartments = async (faculty: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/faculties/${faculty}/departments`,
  { params },
);

export const fetchFacultyPrograms = async (faculty: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/faculties/${faculty}/programs`,
  { params },
);

export const fetchFacultySpecialities = async (faculty: number, params?: GroupQueryParams) => getAxiosInstance().get(
  `/api/faculties/${faculty}/specialities`,
  { params },
);

export const fetchGroupAttendance = async (group: number, params?: AttendanceQueryParams) => getAxiosInstance().get(
  `/api/groups/${group}/attendance`,
  { params },
);
