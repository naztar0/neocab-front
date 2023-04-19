import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
import { Theme } from '@/constants/settings';
import { AppDispatch } from '@/store/store';
import { getMyProfile } from '@/store/actions/users';
import { refreshAction } from '@/store/actions/login';
import { isPrefersDark } from '@/helpers/utils';
import { appLanguages, tokenRefreshTime } from '@/constants/appInit';

export default function AppInit() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const theme = useSelector((state: any) => state.themeReducer.theme);
  const language = useSelector((state: any) => state.languageReducer.language);
  const authData = useSelector((state: any) => state.loginReducer.authorization);
  const isLoginLoading = useSelector((state: any) => state.loginReducer.isLoading);

  const refreshToken = useCallback(() => {
    if (Number(localStorage.getItem('last_refresh') || 0) + tokenRefreshTime < Date.now()) {
      localStorage.setItem('last_refresh', Date.now().toString());
      setTimeout(() => dispatch(refreshAction()), 60 * 1000);
    }
  }, []);

  useEffect(() => {
    const link: HTMLAnchorElement | null = document.querySelector("link[rel~='icon']");
    if (link && isPrefersDark()) {
      link.href = '/favicon_dark.svg';
    }
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
      refreshToken();
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

  useEffect(() => {
    i18next.changeLanguage(appLanguages[language]).then();
  }, [language]);

  return null;
}
