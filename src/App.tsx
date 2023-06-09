import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { setupStore } from '@/store/store';
import AppInit from '@/components/AppInit';
import ConfigProvider from '@/components/ConfigProvider';
import './styles/global.scss';
import './styles/antd.scss';

const Login = lazy(() => import('@/pages/Login'));
const Profile = lazy(() => import('@/pages/Profile'));
const Attendance = lazy(() => import('@/pages/Attendance'));
const AttendanceEdit = lazy(() => import('@/pages/AttendanceEdit'));
const RecordBook = lazy(() => import('@/pages/RecordBook'));
const Rating = lazy(() => import('@/pages/Rating'));
const Schedule = lazy(() => import('@/pages/Schedule'));
const ScheduleEdit = lazy(() => import('@/pages/ScheduleEdit'));
const Syllabus = lazy(() => import('@/pages/Syllabus'));
const AcademicPerformance = lazy(() => import('@/pages/AcademicPerformance'));
const Search = lazy(() => import('@/pages/Search'));
const Settings = lazy(() => import('@/pages/Settings'));
const Help = lazy(() => import('@/pages/Help'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Unsupported = lazy(() => import('@/pages/Unsupported'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/* eslint-disable max-len */
function App() {
  return (
    <Provider store={setupStore()}>
      <ConfigProvider>
        <BrowserRouter>
          <AppInit />
          <Helmet defaultTitle="NeoCab" titleTemplate="%s ∣ NeoCab" />
          <Routes>
            <Route path="/" />
            <Route path="/login" element={<Suspense fallback={<div />}><Login /></Suspense>} />
            <Route path="/profile" element={<Suspense fallback={<div />}><Profile /></Suspense>} />
            <Route path="/attendance" element={<Suspense fallback={<div />}><Attendance /></Suspense>} />
            <Route path="/attendance/edit" element={<Suspense fallback={<div />}><AttendanceEdit /></Suspense>} />
            <Route path="/record-book" element={<Suspense fallback={<div />}><RecordBook /></Suspense>} />
            <Route path="/rating" element={<Suspense fallback={<div />}><Rating /></Suspense>} />
            <Route path="/schedule" element={<Suspense fallback={<div />}><Schedule /></Suspense>} />
            <Route path="/schedule/edit" element={<Suspense fallback={<div />}><ScheduleEdit /></Suspense>} />
            <Route path="/syllabus" element={<Suspense fallback={<div />}><Syllabus /></Suspense>} />
            <Route path="/academic-performance" element={<Suspense fallback={<div />}><AcademicPerformance /></Suspense>} />
            <Route path="/search" element={<Suspense fallback={<div />}><Search /></Suspense>} />
            <Route path="/settings" element={<Suspense fallback={<div />}><Settings /></Suspense>} />
            <Route path="/help" element={<Suspense fallback={<div />}><Help /></Suspense>} />
            <Route path="/privacy" element={<Suspense fallback={<div />}><Privacy /></Suspense>} />
            <Route path="/unsupported" element={<Suspense fallback={<div />}><Unsupported /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<div />}><NotFound /></Suspense>} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
