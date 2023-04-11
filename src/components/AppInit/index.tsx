import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { Theme } from '@/constants/settings';
import { AppDispatch } from '@/store/store';
import { getMyProfile, getMyPhoto } from '@/store/actions/users';
import { refreshAction } from '@/store/actions/login';

export default function AppInit() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const theme = useSelector((state: any) => state.themeReducer.theme);
  const authData = useSelector((state: any) => state.loginReducer.authorization);
  const isLoginLoading = useSelector((state: any) => state.loginReducer.isLoading);

  const requestNotificationPermission = useCallback(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then((result) => {
        if (result === 'denied') {
          message.error('You have to allow notifications to receive updates').then();
        }
      });
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 660) {
      navigate('/unsupported');
      return;
    }
    if (document.location.pathname.includes('login')) {
      return;
    }
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    if (token && userId) {
      dispatch(getMyProfile({ user: +userId }));
      dispatch(getMyPhoto({ user: +userId }));
      dispatch(refreshAction());
      requestNotificationPermission();
      if (document.location.pathname === '/') {
        navigate('/profile');
      }
    } else {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (!isLoginLoading && !localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [isLoginLoading]);

  useEffect(() => {
    if (authData?.token) {
      localStorage.setItem('token', authData.token);
    }
  }, [authData]);

  /* eslint-disable eqeqeq */
  useEffect(() => {
    document.body.classList.remove('light-theme');
    document.body.classList.remove('dark-theme');
    if (theme === Theme.Light) {
      document.body.classList.add('light-theme');
    } else if (theme === Theme.Dark) {
      document.body.classList.add('dark-theme');
    }
  }, [theme]);

  return null;
}
