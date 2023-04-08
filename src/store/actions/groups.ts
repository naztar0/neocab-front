import { createAsyncThunk } from '@reduxjs/toolkit';
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
    await fetchGroups(params)
  ).data,
);

export const getGroup = createAsyncThunk(
  'get_group',
  async ({ group }: { group: number }) => (
    await fetchGroup(group)
  ).data,
);

export const getGroupUsers = createAsyncThunk(
  'get_group_users',
  async ({ group, params }: { group: number, params?: UserQueryParams }) => (
    await fetchGroupUsers(group, params)
  ).data,
);

export const getSpecializations = createAsyncThunk(
  'get_specializations',
  async ({ params }: { params?: GroupQueryParams }) => (
    await fetchSpecializations(params)
  ).data,
);

export const getSpecialization = createAsyncThunk(
  'get_specialization',
  async ({ specialization }: { specialization: number }) => (
    await fetchSpecialization(specialization)
  ).data,
);

export const getSpecializationUsers = createAsyncThunk(
  'get_specialization_users',
  async ({ specialization, params }: { specialization: number, params?: UserQueryParams }) => (
    await fetchSpecializationUsers(specialization, params)
  ).data,
);

export const getSpecializationGroups = createAsyncThunk(
  'get_specialization_groups',
  async ({ specialization, params }: { specialization: number, params?: GroupQueryParams }) => (
    await fetchSpecializationGroups(specialization, params)
  ).data,
);

export const getDepartments = createAsyncThunk(
  'get_departments',
  async ({ params }: { params?: GroupQueryParams }) => (
    await fetchDepartments(params)
  ).data,
);

export const getDepartment = createAsyncThunk(
  'get_department',
  async ({ department }: { department: number }) => (
    await fetchDepartment(department)
  ).data,
);

export const getDepartmentUsers = createAsyncThunk(
  'get_department_users',
  async ({ department, params }: { department: number, params?: UserQueryParams }) => (
    await fetchDepartmentUsers(department, params)
  ).data,
);

export const getDepartmentGroups = createAsyncThunk(
  'get_department_groups',
  async ({ department, params }: { department: number, params?: GroupQueryParams }) => (
    await fetchDepartmentGroups(department, params)
  ).data,
);

export const getDepartmentSpecializations = createAsyncThunk(
  'get_department_specializations',
  async ({ department, params }: { department: number, params?: GroupQueryParams }) => (
    await fetchDepartmentSpecializations(department, params)
  ).data,
);

export const getPrograms = createAsyncThunk(
  'get_programs',
  async ({ params }: { params?: GroupQueryParams }) => (
    await fetchPrograms(params)
  ).data,
);

export const getProgram = createAsyncThunk(
  'get_program',
  async ({ program }: { program: number }) => (
    await fetchProgram(program)
  ).data,
);

export const getProgramUsers = createAsyncThunk(
  'get_program_users',
  async ({ program, params }: { program: number, params?: UserQueryParams }) => (
    await fetchProgramUsers(program, params)
  ).data,
);

export const getProgramGroups = createAsyncThunk(
  'get_program_groups',
  async ({ program, params }: { program: number, params?: GroupQueryParams }) => (
    await fetchProgramGroups(program, params)
  ).data,
);

export const getProgramSpecializations = createAsyncThunk(
  'get_program_specializations',
  async ({ program, params }: { program: number, params?: GroupQueryParams }) => (
    await fetchProgramSpecializations(program, params)
  ).data,
);

export const getProgramDepartments = createAsyncThunk(
  'get_program_departments',
  async ({ program, params }: { program: number, params?: GroupQueryParams }) => (
    await fetchProgramDepartments(program, params)
  ).data,
);

export const getSpecialities = createAsyncThunk(
  'get_specialities',
  async ({ params }: { params?: GroupQueryParams }) => (
    await fetchSpecialities(params)
  ).data,
);

export const getSpeciality = createAsyncThunk(
  'get_speciality',
  async ({ speciality }: { speciality: number }) => (
    await fetchSpeciality(speciality)
  ).data,
);

export const getSpecialityUsers = createAsyncThunk(
  'get_speciality_users',
  async ({ speciality, params }: { speciality: number, params?: UserQueryParams }) => (
    await fetchSpecialityUsers(speciality, params)
  ).data,
);

export const getSpecialityGroups = createAsyncThunk(
  'get_speciality_groups',
  async ({ speciality, params }: { speciality: number, params?: GroupQueryParams }) => (
    await fetchSpecialityGroups(speciality, params)
  ).data,
);

export const getSpecialitySpecializations = createAsyncThunk(
  'get_speciality_specializations',
  async ({ speciality, params }: { speciality: number, params?: GroupQueryParams }) => (
    await fetchSpecialitySpecializations(speciality, params)
  ).data,
);

export const getSpecialityDepartments = createAsyncThunk(
  'get_speciality_departments',
  async ({ speciality, params }: { speciality: number, params?: GroupQueryParams }) => (
    await fetchSpecialityDepartments(speciality, params)
  ).data,
);

export const getSpecialityPrograms = createAsyncThunk(
  'get_speciality_programs',
  async ({ speciality, params }: { speciality: number, params?: GroupQueryParams }) => (
    await fetchSpecialityPrograms(speciality, params)
  ).data,
);

export const getFaculties = createAsyncThunk(
  'get_faculties',
  async ({ params }: { params?: GroupQueryParams }) => (
    await fetchFaculties(params)
  ).data,
);

export const getFaculty = createAsyncThunk(
  'get_faculty',
  async ({ faculty }: { faculty: number }) => (
    await fetchFaculty(faculty)
  ).data,
);

export const getFacultyUsers = createAsyncThunk(
  'get_faculty_users',
  async ({ faculty, params }: { faculty: number, params?: UserQueryParams }) => (
    await fetchFacultyUsers(faculty, params)
  ).data,
);

export const getFacultyGroups = createAsyncThunk(
  'get_faculty_groups',
  async ({ faculty, params }: { faculty: number, params?: GroupQueryParams }) => (
    await fetchFacultyGroups(faculty, params)
  ).data,
);

export const getFacultySpecializations = createAsyncThunk(
  'get_faculty_specializations',
  async ({ faculty, params }: { faculty: number, params?: GroupQueryParams }) => (
    await fetchFacultySpecializations(faculty, params)
  ).data,
);

export const getFacultyDepartments = createAsyncThunk(
  'get_faculty_departments',
  async ({ faculty, params }: { faculty: number, params?: GroupQueryParams }) => (
    await fetchFacultyDepartments(faculty, params)
  ).data,
);

export const getFacultyPrograms = createAsyncThunk(
  'get_faculty_programs',
  async ({ faculty, params }: { faculty: number, params?: GroupQueryParams }) => (
    await fetchFacultyPrograms(faculty, params)
  ).data,
);

export const getFacultySpecialities = createAsyncThunk(
  'get_faculty_specialities',
  async ({ faculty, params }: { faculty: number, params?: GroupQueryParams }) => (
    await fetchFacultySpecialities(faculty, params)
  ).data,
);

export const getGroupAttendance = createAsyncThunk(
  'get_group_attendance',
  async ({ group, params }: { group: number, params?: AttendanceQueryParams }) => (
    await fetchGroupAttendance(group, params)
  ).data,
);
