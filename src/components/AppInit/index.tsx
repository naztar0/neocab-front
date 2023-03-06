import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Theme } from '@/constants/settings';
import { AppDispatch } from '@/store/store';
import { getMyProfile, getMyPhoto } from '@/store/actions/users';
import { refreshAction } from '@/store/actions/login';

export default function AppInit() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const theme = useSelector((state: any) => state.themeReducer.theme);
  const authData = useSelector((state: any) => state.loginReducer.authorization);

  useEffect(() => {
    if (document.location.href.includes('login')) {
      return;
    }
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    if (token && userId) {
      dispatch(getMyProfile({ user: +userId }));
      dispatch(getMyPhoto({ user: +userId }));
      dispatch(refreshAction());
    } else {
      navigate('/login');
    }
  }, []);

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
