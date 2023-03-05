import { createSlice } from '@reduxjs/toolkit';
import {
  getDepartments,
  getDepartment,
  getProgramDepartments,
  getSpecialityDepartments,
  getFacultyDepartments,
} from '@/store/actions/groups';

const initialState = {
  isLoading: false,
  departments: [],
  department: null,
};

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    resetDepartments: (state) => {
      state.departments = [];
      state.department = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDepartments.fulfilled, (state, action) => {
      state.departments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDepartments.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getDepartments.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getDepartment.fulfilled, (state, action) => {
      state.department = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDepartment.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getDepartment.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProgramDepartments.fulfilled, (state, action) => {
      state.departments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProgramDepartments.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProgramDepartments.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSpecialityDepartments.fulfilled, (state, action) => {
      state.departments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSpecialityDepartments.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSpecialityDepartments.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getFacultyDepartments.fulfilled, (state, action) => {
      state.departments = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getFacultyDepartments.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getFacultyDepartments.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { resetDepartments } = departmentSlice.actions;

export default departmentSlice.reducer;
