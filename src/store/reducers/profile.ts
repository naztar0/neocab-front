import { createSlice } from '@reduxjs/toolkit';
import {
  getMyProfile,
  setUserCover,
  syncUserPhoto,
} from '@/store/actions/users';

const initialState = {
  isLoading: true,
  profile: <Profile | null>null,
  image: <string | null>null,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyProfile.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getMyProfile.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getMyProfile.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(syncUserPhoto.fulfilled, (state, action) => {
      if (state.profile) {
        state.profile.image = action.payload;
      }
    });

    builder.addCase(setUserCover.fulfilled, (state, action) => {
      if (state.profile) {
        state.profile.cover = action.payload.cover;
      }
    });
  },
});

export default profileSlice.reducer;
