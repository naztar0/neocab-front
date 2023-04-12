import { createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import { Theme } from '@/constants/settings';
import { isPrefersDark } from '@/helpers/utils';

const getTheme = () => {
  if (cookies.get('theme')) {
    return Number(cookies.get('theme'));
  }
  if (isPrefersDark()) {
    return Theme.Dark;
  }
  return Theme.Light;
};

const initialState = {
  theme: getTheme(),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === Theme.Light ? Theme.Dark : Theme.Light;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
