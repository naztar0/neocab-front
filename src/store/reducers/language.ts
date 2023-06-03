import { createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import { Language } from '@/constants/settings';

const getLanguage = () => {
  if (cookies.get('language')) {
    return Number(cookies.get('language'));
  }
  if (['ua', 'ru'].includes(navigator.language.split('-')[0])) {
    return Language.Ukrainian;
  }
  return Language.English;
};

const initialState = {
  language: getLanguage(),
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
