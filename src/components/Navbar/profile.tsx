import React, { useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import {
  LogoutOutlined,
  DollarOutlined,
  SettingOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useTranslation, Trans } from 'react-i18next';
import Avatar from '@/components/Avatar';
import { logoutAction } from '@/store/actions/login';
import { AppDispatch } from '@/store/store';
import { PaymentType } from '@/constants/profile';
import './index.scss';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoginLoading = useSelector((state: any) => state.loginReducer.isLoading);

  const [open, setOpen] = useState(false);

  const logout = useCallback(() => {
    dispatch(logoutAction());
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
  }, []);

  const handleOpenChange = useCallback((flag: boolean) => {
    setOpen(flag);
  }, []);

  const handleMenuClick = useCallback((e: MenuInfo) => {
    if (e.key !== '3') {
      setOpen(false);
    }
  }, []);

  const profileDataSource = useMemo(() => {
    const result = [];
    if (profileData?.payment === PaymentType.Contract) {
      result.push({
        key: '1',
        label: <Link to="/contract" className="nav-link"><Trans i18nKey="common.menu.contract" /></Link>,
        icon: <DollarOutlined />,
      });
    }
    result.push({
      key: '2',
      label: <Link to="/settings" className="nav-link"><Trans i18nKey="common.menu.settings" /></Link>,
      icon: <SettingOutlined />,
    }, {
      key: '3',
      label: t('common.menu.logout'),
      icon: isLoginLoading ? <LoadingOutlined /> : <LogoutOutlined />,
      onClick: logout,
    });
    return result;
  }, [profileData, isLoginLoading]);

  return (
    <Dropdown
      menu={{ items: profileDataSource, onClick: handleMenuClick }}
      placement="bottomRight"
      trigger={['click']}
      onOpenChange={handleOpenChange}
      open={open}
      arrow={false}
    >
      <Button shape="circle" className="avatar">
        <Avatar size={36} avatar={profileData?.image} username={profileData?.first_name} mono />
      </Button>
    </Dropdown>
  );
}
