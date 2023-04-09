import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Icons from '@ant-design/icons';
import {
  Badge,
  Button,
  Input,
  Popover,
  List,
  message,
} from 'antd';
import Avatar from '@/components/Avatar';
import {
  searchPattern,
  searchPatternString,
} from '@/constants/search';
import logo from '@/assets/images/logo.jpg';
import { logoutAction } from '@/store/actions/login';
import { AppDispatch } from '@/store/store';
import './index.scss';

const notificationsData = [
  {
    datetime: '2020-01-01 00:00',
    text: 'Racing car sprays burning fuel into crowd.',
    read: false,
  },
  {
    datetime: '2022-02-02 00:00',
    text: 'Japanese princess to wed commoner.',
    read: false,
  },
  {
    datetime: '2023-03-03 00:00',
    text: 'Australian walks 100km after outback crash.',
    read: true,
  },
  {
    datetime: '2024-04-04 00:00',
    text: 'Man charged over missing wedding girl.',
    read: true,
  },
  {
    datetime: '2025-05-05 00:00',
    text: 'Los Angeles battles huge wildfires.',
    read: true,
  },
];

const notificationsLimit = 5;
const unreadNotificationsCount = notificationsData.filter((n) => !n.read).length;
const notifications = unreadNotificationsCount > notificationsLimit
  ? notificationsData.filter((n) => !n.read)
  : notificationsData.slice(0, notificationsLimit);

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoginLoading = useSelector((state: any) => state.loginReducer.isLoading);

  useEffect(() => {
    if (!isLoginLoading && !localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [isLoginLoading]);

  const logout = useCallback(() => {
    dispatch(logoutAction());
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
  }, []);

  const onSearch = useCallback((value: string) => {
    if (searchPattern.test(value)) {
      navigate(`/search?q=${value}`);
    } else {
      message.error('Search value must contain only letters and spaces').then();
    }
  }, []);

  return (
    <header>
      <div>
        <img src={logo} className="logo" alt="NeoCab" />
        <Input.Search
          className="search"
          placeholder="Search"
          pattern={searchPatternString}
          onSearch={onSearch}
        />
      </div>
      <div>
        <Popover
          content={(
            <List
              className="notifications"
              size="small"
              dataSource={notifications}
              renderItem={(item) => (
                <List.Item className={item.read ? '' : 'unread'}>
                  <div>
                    { item.read ? null : <Badge className="status" status="warning" /> }
                    <span className="date-time">{item.datetime}</span>
                  </div>
                  <span>{item.text}</span>
                </List.Item>
              )}
            />
          )}
          placement="bottomRight"
          title="Notifications"
          trigger="click"
          showArrow={false}
        >
          <Badge count={unreadNotificationsCount}>
            <Button
              className="notification"
              size="middle"
              shape="circle"
              icon={<Icons.BellOutlined />}
            />
          </Badge>
        </Popover>
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
      </div>
    </header>
  );
}
