import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { setupStore } from '@/store/store';
import AppInit from '@/components/AppInit';
import ConfigProvider from '@/components/ConfigProvider';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import RecordBook from '@/pages/RecordBook';
import Rating from '@/pages/Rating';
import Syllabus from '@/pages/Syllabus';
import Search from '@/pages/Search';
import Settings from '@/pages/Settings';
import './styles/global.scss';
import './styles/antd.scss';

function App() {
  return (
    <Provider store={setupStore()}>
      <ConfigProvider>
        <BrowserRouter>
          <AppInit />
          <Helmet defaultTitle="NeoCab" titleTemplate="%s ∣ NeoCab" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/record-book" element={<RecordBook />} />
            <Route path="/rating" element={<Rating />} />
            <Route path="/syllabus" element={<Syllabus />} />
            <Route path="/search" element={<Search />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
