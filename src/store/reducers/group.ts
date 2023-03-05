import { createSlice } from '@reduxjs/toolkit';
import {
  getGroups,
  getGroup,
  getSpecializationGroups,
  getDepartmentGroups,
  getProgramGroups,
  getSpecialityGroups,
  getFacultyGroups,
} from '@/store/actions/groups';

const initialState = {
  isLoading: false,
  groups: [],
  group: null,
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    resetGroups: (state) => {
      state.groups = [];
      state.group = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGroups.fulfilled, (state, action) => {
      state.groups = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getGroups.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getGroups.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getGroup.fulfilled, (state, action) => {
      state.group = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getGroup.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getGroup.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSpecializationGroups.fulfilled, (state, action) => {
      state.groups = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSpecializationGroups.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSpecializationGroups.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getDepartmentGroups.fulfilled, (state, action) => {
      state.groups = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDepartmentGroups.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getDepartmentGroups.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProgramGroups.fulfilled, (state, action) => {
      state.groups = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProgramGroups.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProgramGroups.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSpecialityGroups.fulfilled, (state, action) => {
      state.groups = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSpecialityGroups.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSpecialityGroups.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getFacultyGroups.fulfilled, (state, action) => {
      state.groups = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getFacultyGroups.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getFacultyGroups.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { resetGroups } = groupSlice.actions;

export default groupSlice.reducer;
