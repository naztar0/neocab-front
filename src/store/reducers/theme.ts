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
  primaryColor: cookies.get('primaryColor'),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === Theme.Light ? Theme.Dark : Theme.Light;
      cookies.set('theme', state.theme.toString());
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
      cookies.set('primaryColor', action.payload);
    },
  },
});

export const { toggleTheme, setTheme, setPrimaryColor } = themeSlice.actions;

export default themeSlice.reducer;
