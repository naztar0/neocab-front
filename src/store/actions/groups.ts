import { createAsyncThunk } from '@reduxjs/toolkit';
import responseHandler from '@/store/actions/config';
import {
  fetchGroups,
  fetchGroup,
  fetchGroupUsers,
  fetchSpecializations,
  fetchSpecialization,
  fetchSpecializationUsers,
  fetchSpecializationGroups,
  fetchDepartments,
  fetchDepartment,
  fetchDepartmentUsers,
  fetchDepartmentGroups,
  fetchDepartmentSpecializations,
  fetchPrograms,
  fetchProgram,
  fetchProgramUsers,
  fetchProgramGroups,
  fetchProgramSpecializations,
  fetchProgramDepartments,
  fetchSpecialities,
  fetchSpeciality,
  fetchSpecialityUsers,
  fetchSpecialityGroups,
  fetchSpecialitySpecializations,
  fetchSpecialityDepartments,
  fetchSpecialityPrograms,
  fetchFaculties,
  fetchFaculty,
  fetchFacultyUsers,
  fetchFacultyGroups,
  fetchFacultySpecializations,
  fetchFacultyDepartments,
  fetchFacultyPrograms,
  fetchFacultySpecialities,
  fetchGroupAttendance,
} from '@/requests/groups';

export const getGroups = createAsyncThunk(
  'get_groups',
  async ({ params }: { params?: GroupQueryParams }) => (
    await responseHandler(fetchGroups(params))
  ).data,
);

export const getGroup = createAsyncThunk(
  'get_group',
  async ({ group }: { group: number }) => (
    await responseHandler(fetchGroup(group))
  ).data,
);

export const getGroupUsers = createAsyncThunk(
  'get_group_users',
  async ({ group, params }: { group: number, params?: UserQueryParams }) => (
    await responseHandler(fetchGroupUsers(group, params))
  ).data,
);

export const getSpecializations = createAsyncThunk(
  'get_specializations',
  async ({ params }: { params?: GroupQueryParams }) => (
    await responseHandler(fetchSpecializations(params))
  ).data,
);

export const getSpecialization = createAsyncThunk(
  'get_specialization',
  async ({ specialization }: { specialization: number }) => (
    await responseHandler(fetchSpecialization(specialization))
  ).data,
);

export const getSpecializationUsers = createAsyncThunk(
  'get_specialization_users',
  async ({ specialization, params }: { specialization: number, params?: UserQueryParams }) => (
    await responseHandler(fetchSpecializationUsers(specialization, params))
  ).data,
);

export const getSpecializationGroups = createAsyncThunk(
  'get_specialization_groups',
  async ({ specialization, params }: { specialization: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchSpecializationGroups(specialization, params))
  ).data,
);

export const getDepartments = createAsyncThunk(
  'get_departments',
  async ({ params }: { params?: GroupQueryParams }) => (
    await responseHandler(fetchDepartments(params))
  ).data,
);

export const getDepartment = createAsyncThunk(
  'get_department',
  async ({ department }: { department: number }) => (
    await responseHandler(fetchDepartment(department))
  ).data,
);

export const getDepartmentUsers = createAsyncThunk(
  'get_department_users',
  async ({ department, params }: { department: number, params?: UserQueryParams }) => (
    await responseHandler(fetchDepartmentUsers(department, params))
  ).data,
);

export const getDepartmentGroups = createAsyncThunk(
  'get_department_groups',
  async ({ department, params }: { department: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchDepartmentGroups(department, params))
  ).data,
);

export const getDepartmentSpecializations = createAsyncThunk(
  'get_department_specializations',
  async ({ department, params }: { department: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchDepartmentSpecializations(department, params))
  ).data,
);

export const getPrograms = createAsyncThunk(
  'get_programs',
  async ({ params }: { params?: GroupQueryParams }) => (
    await responseHandler(fetchPrograms(params))
  ).data,
);

export const getProgram = createAsyncThunk(
  'get_program',
  async ({ program }: { program: number }) => (
    await responseHandler(fetchProgram(program))
  ).data,
);

export const getProgramUsers = createAsyncThunk(
  'get_program_users',
  async ({ program, params }: { program: number, params?: UserQueryParams }) => (
    await responseHandler(fetchProgramUsers(program, params))
  ).data,
);

export const getProgramGroups = createAsyncThunk(
  'get_program_groups',
  async ({ program, params }: { program: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchProgramGroups(program, params))
  ).data,
);

export const getProgramSpecializations = createAsyncThunk(
  'get_program_specializations',
  async ({ program, params }: { program: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchProgramSpecializations(program, params))
  ).data,
);

export const getProgramDepartments = createAsyncThunk(
  'get_program_departments',
  async ({ program, params }: { program: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchProgramDepartments(program, params))
  ).data,
);

export const getSpecialities = createAsyncThunk(
  'get_specialities',
  async ({ params }: { params?: GroupQueryParams }) => (
    await responseHandler(fetchSpecialities(params))
  ).data,
);

export const getSpeciality = createAsyncThunk(
  'get_speciality',
  async ({ speciality }: { speciality: number }) => (
    await responseHandler(fetchSpeciality(speciality))
  ).data,
);

export const getSpecialityUsers = createAsyncThunk(
  'get_speciality_users',
  async ({ speciality, params }: { speciality: number, params?: UserQueryParams }) => (
    await responseHandler(fetchSpecialityUsers(speciality, params))
  ).data,
);

export const getSpecialityGroups = createAsyncThunk(
  'get_speciality_groups',
  async ({ speciality, params }: { speciality: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchSpecialityGroups(speciality, params))
  ).data,
);

export const getSpecialitySpecializations = createAsyncThunk(
  'get_speciality_specializations',
  async ({ speciality, params }: { speciality: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchSpecialitySpecializations(speciality, params))
  ).data,
);

export const getSpecialityDepartments = createAsyncThunk(
  'get_speciality_departments',
  async ({ speciality, params }: { speciality: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchSpecialityDepartments(speciality, params))
  ).data,
);

export const getSpecialityPrograms = createAsyncThunk(
  'get_speciality_programs',
  async ({ speciality, params }: { speciality: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchSpecialityPrograms(speciality, params))
  ).data,
);

export const getFaculties = createAsyncThunk(
  'get_faculties',
  async ({ params }: { params?: GroupQueryParams }) => (
    await responseHandler(fetchFaculties(params))
  ).data,
);

export const getFaculty = createAsyncThunk(
  'get_faculty',
  async ({ faculty }: { faculty: number }) => (
    await responseHandler(fetchFaculty(faculty))
  ).data,
);

export const getFacultyUsers = createAsyncThunk(
  'get_faculty_users',
  async ({ faculty, params }: { faculty: number, params?: UserQueryParams }) => (
    await responseHandler(fetchFacultyUsers(faculty, params))
  ).data,
);

export const getFacultyGroups = createAsyncThunk(
  'get_faculty_groups',
  async ({ faculty, params }: { faculty: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchFacultyGroups(faculty, params))
  ).data,
);

export const getFacultySpecializations = createAsyncThunk(
  'get_faculty_specializations',
  async ({ faculty, params }: { faculty: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchFacultySpecializations(faculty, params))
  ).data,
);

export const getFacultyDepartments = createAsyncThunk(
  'get_faculty_departments',
  async ({ faculty, params }: { faculty: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchFacultyDepartments(faculty, params))
  ).data,
);

export const getFacultyPrograms = createAsyncThunk(
  'get_faculty_programs',
  async ({ faculty, params }: { faculty: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchFacultyPrograms(faculty, params))
  ).data,
);

export const getFacultySpecialities = createAsyncThunk(
  'get_faculty_specialities',
  async ({ faculty, params }: { faculty: number, params?: GroupQueryParams }) => (
    await responseHandler(fetchFacultySpecialities(faculty, params))
  ).data,
);

export const getGroupAttendance = createAsyncThunk(
  'get_group_attendance',
  async ({ group, params }: { group: number, params?: AttendanceQueryParams }) => (
    await responseHandler(fetchGroupAttendance(group, params))
  ).data,
);
