import { createSlice } from '@reduxjs/toolkit';
import { getMyProfile, getMyPhoto, setUserCover } from '@/store/actions/users';

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
      if (state.profile && state.image) {
        state.profile.image = state.image;
      }
      state.isLoading = false;
    });
    builder.addCase(getMyProfile.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getMyProfile.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getMyPhoto.fulfilled, (state, action) => {
      if (state.profile && (!state.profile.image || state.profile.image.startsWith('data:image'))) {
        state.profile.image = action.payload;
      } else {
        state.image = action.payload;
      }
    });

    builder.addCase(setUserCover.fulfilled, (state, action) => {
      if (state.profile) {
        state.profile.cover = action.payload.cover;
      }
    });
  },
});

export const { setUserProfile } = profileSlice.actions;

export default profileSlice.reducer;
