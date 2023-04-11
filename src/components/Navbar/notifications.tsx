import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Icons from '@ant-design/icons';
import {
  Badge,
  Button,
  Popover,
  List,
  message,
} from 'antd';
import { format } from 'date-fns';
import {
  getUserNotifications,
  postNotificationRead,
} from '@/store/actions/notifications';
import { AppDispatch } from '@/store/store';
import {
  dateTimeFormat,
  historyLimit,
  truncateLimit,
  updateInterval,
} from '@/constants/notification';
import { truncate } from '@/helpers/utils';
import './index.scss';

export default function Notifications() {
  const dispatch = useDispatch<AppDispatch>();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const notificationsData: UserNotification[] = useSelector((state: any) => state.notificationReducer.notifications);
  const dataSwitch: boolean = useSelector((state: any) => state.notificationReducer.dataSwitch);

  const [currentNotification, setCurrentNotification] = useState<number | null>(null);
  const [lastNotification, setLastNotification] = useState<number | null>(null);

  useEffect(() => {
    if (profileData) {
      dispatch(getUserNotifications({ user: profileData.id }));
    }
  }, [profileData, dataSwitch]);

  useEffect(() => {
    if (profileData) {
      setTimeout(() => dispatch(getUserNotifications({ user: profileData.id })), updateInterval);
    }
  }, [profileData, notificationsData]);

  useEffect(() => {
    if (notificationsData.length > 0) {
      if (lastNotification && lastNotification !== notificationsData[0].id && !notificationsData[0].read) {
        try {
          const notification = new Notification('New notification', {
            body: notificationsData[0].text,
          });
          notification.onclick = () => {
            window.focus();
            notification.close();
          };
        } catch (e) {
          message.info('New notification!').then();
        }
      }
      setLastNotification(notificationsData[0].id);
    }
  }, [notificationsData, lastNotification]);

  const unreadNotificationsCount = useMemo(() => (
    notificationsData.filter((n) => !n.read).length
  ), [notificationsData]);

  const notificationsDataSource = useMemo(() => {
    const data = notificationsData.filter((n) => !n.read).slice(0, historyLimit);
    if (data.length < historyLimit) {
      data.push(...notificationsData.filter((n) => n.read).slice(0, historyLimit - data.length));
    }
    return data;
  }, [notificationsData, unreadNotificationsCount]);

  const onNotificationClick = useCallback((item: UserNotification) => {
    setCurrentNotification(item.id);
    if (!item.read) {
      dispatch(postNotificationRead({ notification: item.id }));
    }
  }, []);

  const listItem = useCallback((item: UserNotification) => (
    <List.Item
      className={item.read ? '' : 'unread'}
      onClick={() => onNotificationClick(item)}
    >
      <div>
        { item.read ? null : <Badge className="status" status="warning" /> }
        <span className="date-time">{format(new Date(item.created_at), dateTimeFormat)}</span>
      </div>
      <span>{currentNotification === item.id ? item.text : truncate(item.text, truncateLimit)}</span>
    </List.Item>
  ), [currentNotification]);

  return (
    <Popover
      content={(
        <List
          className="notifications"
          size="small"
          dataSource={notificationsDataSource}
          renderItem={listItem}
        />
      )}
      placement="bottomRight"
      title="Notifications"
      trigger="click"
      showArrow={false}
      onOpenChange={() => setCurrentNotification(null)}
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
  );
}
