import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  message,
  Form,
  Input,
  Button,
  Spin,
  Divider,
} from 'antd';
import { Helmet } from 'react-helmet';
import { AppDispatch } from '@/store/store';
import { ReactComponent as MsLoginLight } from '@/assets/images/ms_signin_light.svg';
import { ReactComponent as MsLoginDark } from '@/assets/images/ms_signin_dark.svg';
import { Theme } from '@/constants/settings';
import { getAzureLoginUrl, loginViaAzure, loginViaCabinet } from '@/store/actions/login';
import { clearError } from '@/store/reducers/login';
import { ReactComponent as Logo } from '@/assets/images/logo_mini.svg';
import './index.scss';

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const authData = useSelector((state: any) => state.loginReducer.authorization);
  const msLoginUrl = useSelector((state: any) => state.loginReducer.msLoginUrl);
  const userData = useSelector((state: any) => state.loginReducer.user);
  const isLoading = useSelector((state: any) => state.loginReducer.isLoading);
  const isError = useSelector((state: any) => state.loginReducer.isError);
  const errorCode = useSelector((state: any) => state.loginReducer.errorCode);
  const theme: Theme = useSelector((state: any) => state.themeReducer.theme);

  const [nativeRequired, setNativeRequired] = useState(false);
  const [isLoginViaCabinet, setIsLoginViaCabinet] = useState(false);
  const [checkCabinetLogin, setCheckCabinetLogin] = useState(false);
  const [cabinetCredentials, setCabinetCredentials] = useState({ email: '', password: '' });

  const checkCabinetLoginRef = useRef(checkCabinetLogin);
  checkCabinetLoginRef.current = checkCabinetLogin;

  const getMsLoginUrl = useCallback(() => {
    dispatch(getAzureLoginUrl());
  }, []);

  useEffect(() => {
    if (userData?.id && authData?.token) {
      if (!userData.azure_id) {
        getMsLoginUrl();
      } else {
        localStorage.setItem('user_id', userData.id);
        localStorage.setItem('token', authData.token);
        navigate('/profile?r=1');
      }
    } else {
      const userId = localStorage.getItem('user_id');
      const token = localStorage.getItem('token');
      if (token && userId) {
        navigate('/profile?r=1');
      }
    }
  }, [authData]);

  useEffect(() => {
    if (msLoginUrl && (!authData?.token || !userData?.azure_id)) {
      window.location.replace(msLoginUrl);
    }
  }, [msLoginUrl]);

  useEffect(() => {
    if (isError) {
      switch (errorCode) {
        case 401:
          message.error('Wrong email or password', 10).then();
          if (checkCabinetLoginRef.current) {
            setCheckCabinetLogin(false);
          }
          break;
        case 403:
          if (isLoginViaCabinet) {
            if (!checkCabinetLoginRef.current) {
              message.warning('For the first time it may take up to a minute to login', 10).then();
              setCheckCabinetLogin(true);
            }
            setTimeout(() => dispatch(loginViaCabinet(cabinetCredentials)), 8000);
            dispatch(clearError());
          } else {
            message.warning('For the first time you need to login via login and password from cabinet', 15).then();
            setNativeRequired(true);
          }
          break;
        default:
          message.error('Something went wrong').then();
          break;
      }
    }
  }, [isError, errorCode, isLoginViaCabinet]);

  useEffect(() => {
    const msLogin = new URLSearchParams(document.location.search).get('ms');
    if (msLogin) {
      dispatch(loginViaAzure());
    }
  }, []);

  const onSubmit = useCallback((values: { email: string; password: string }) => {
    setIsLoginViaCabinet(true);
    setCabinetCredentials(values);
    dispatch(loginViaCabinet(values));
  }, []);

  return (
    <div className="login-page">
      <Helmet title="Login" />
      <Logo className="logo" />
      <h1 className="title">Sign in to NeoCab</h1>
      <Spin spinning={isLoading || checkCabinetLogin} size="large">
        <div className="substrate">
          <Form
            name="basic"
            onFinish={onSubmit}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!', pattern: /^[a-zA-Z0-9]{4,8}$/ }]}
            >
              <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="button-main">Submit</Button>
          </Form>
          <Divider />
          <button type="button" className="ms-login" onClick={getMsLoginUrl}>
            {!nativeRequired ? (theme === Theme.Light ? <MsLoginLight /> : <MsLoginDark />) : null}
          </button>
        </div>
      </Spin>
    </div>
  );
}
