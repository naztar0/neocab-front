import React from 'react';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Notifications from '@/components/mobile/Navbar/notifications';
import Profile from '@/components/mobile/Navbar/profile';
import { ReactComponent as Logo } from '@/assets/images/logo.svg';
import './index.scss';

export default function Navbar(
  { collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: (collapsed: boolean) => void },
) {
  return (
    <header>
      <div>
        <Button
          className="menu-trigger"
          type="text"
          icon={<MenuOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        <Logo className="logo" />
      </div>
      <div>
        <Notifications />
        <Profile />
      </div>
    </header>
  );
}
