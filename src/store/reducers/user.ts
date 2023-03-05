import { createSlice } from '@reduxjs/toolkit';
import {
  getUserProfile,
  getUserPhoto,
  getUsers,
} from '@/store/actions/users';
import {
  getFacultyUsers,
  getSpecialityUsers,
  getProgramUsers,
  getDepartmentUsers,
  getSpecializationUsers,
  getGroupUsers,
} from '@/store/actions/groups';

const initialState = {
  isLoading: false,
  users: [],
  user: <User | null>null,
  image: <string | null>null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.user = action.payload;
      if (state.user && state.image) {
        state.user.image = state.image;
      }
      state.isLoading = false;
    });
    builder.addCase(getUserProfile.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserProfile.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserPhoto.fulfilled, (state, action) => {
      if (state.user && (!state.user.image || state.user.image.startsWith('data:image'))) {
        state.user.image = action.payload;
      } else {
        state.image = action.payload;
      }
    });
    builder.addCase(getUserPhoto.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUserPhoto.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getFacultyUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getFacultyUsers.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getFacultyUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSpecialityUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSpecialityUsers.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSpecialityUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getProgramUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getProgramUsers.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProgramUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getDepartmentUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDepartmentUsers.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getDepartmentUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getSpecializationUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getSpecializationUsers.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getSpecializationUsers.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getGroupUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getGroupUsers.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getGroupUsers.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { resetUsers } = userSlice.actions;

export default userSlice.reducer;
