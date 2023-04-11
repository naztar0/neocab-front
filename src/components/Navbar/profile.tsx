import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Popover,
} from 'antd';
import Avatar from '@/components/Avatar';
import { logoutAction } from '@/store/actions/login';
import { AppDispatch } from '@/store/store';
import './index.scss';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoginLoading = useSelector((state: any) => state.loginReducer.isLoading);

  const logout = useCallback(() => {
    dispatch(logoutAction());
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
  }, []);

  return (
    <Popover
      content={<Button onClick={logout} loading={isLoginLoading}>Logout</Button>}
      placement="bottomRight"
      title="Profile"
      trigger="click"
      showArrow={false}
    >
      <Button shape="circle" className="avatar">
        <Avatar size={36} avatar={profileData?.image} username={profileData?.first_name} mono />
      </Button>
    </Popover>
  );
}
