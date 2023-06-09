import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Popover,
} from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useTranslation, Trans } from 'react-i18next';
import Avatar from '@/components/Avatar';
import { logoutAction } from '@/store/actions/login';
import { AppDispatch } from '@/store/store';
import './index.scss';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoginLoading = useSelector((state: any) => state.loginReducer.isLoading);

  const logout = useCallback(() => {
    dispatch(logoutAction());
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
  }, []);

  return (
    <Popover
      content={(
        <Button
          onClick={logout}
          loading={isLoginLoading}
          icon={<LogoutOutlined />}
        >
          <span><Trans i18nKey="navbar.logout" /></span>
        </Button>
      )}
      placement="bottomRight"
      title={t('navbar.profile')}
      trigger="click"
      showArrow={false}
    >
      <Button shape="circle" className="avatar">
        <Avatar size={36} avatar={profileData?.image} username={profileData?.first_name} mono />
      </Button>
    </Popover>
  );
}
