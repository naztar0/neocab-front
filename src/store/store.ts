import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '@/store/reducers/theme';
import languageReducer from '@/store/reducers/language';
import loginReducer from '@/store/reducers/login';
import profileReducer from '@/store/reducers/profile';
import recordBookReducer from '@/store/reducers/recordBook';
import ratingReducer from '@/store/reducers/rating';
import syllabusReducer from '@/store/reducers/syllabus';
import coverReducer from '@/store/reducers/cover';
import userReducer from '@/store/reducers/user';
import groupReducer from '@/store/reducers/group';
import specializationReducer from '@/store/reducers/specialization';
import departmentReducer from '@/store/reducers/department';
import programReducer from '@/store/reducers/program';
import specialityReducer from '@/store/reducers/speciality';
import facultyReducer from '@/store/reducers/faculty';

const rootReducer = combineReducers({
  themeReducer,
  languageReducer,
  loginReducer,
  profileReducer,
  recordBookReducer,
  ratingReducer,
  syllabusReducer,
  coverReducer,
  userReducer,
  groupReducer,
  specializationReducer,
  departmentReducer,
  programReducer,
  specialityReducer,
  facultyReducer,
});

// eslint-disable-next-line import/prefer-default-export
export const setupStore = () => configureStore({
  reducer: rootReducer,
});

// @ts-ignore
export type AppDispatch = typeof setupStore.dispatch;
