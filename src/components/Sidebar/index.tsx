import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Icons from '@ant-design/icons';
import { Layout as LayoutAntd, Menu } from 'antd';
import { SiderTheme } from 'antd/lib/layout/Sider';
import { Theme } from '@/constants/settings';
import './index.scss';

const items = [
  {
    key: 'profile',
    icon: <Icons.UserOutlined className="icon" />,
    label: 'Profile',
  },
  {
    key: 'attendance',
    icon: <Icons.CheckCircleOutlined className="icon" />,
    label: 'Attendance',
  },
  {
    key: 'record-book',
    icon: <Icons.BookOutlined className="icon" />,
    label: 'Record Book',
  },
  {
    key: 'rating',
    icon: <Icons.BarChartOutlined className="icon" />,
    label: 'Rating',
  },
  {
    key: 'schedule',
    icon: <Icons.CalendarOutlined className="icon" />,
    label: 'Schedule',
  },
  {
    key: 'syllabus',
    icon: <Icons.PieChartOutlined className="icon" />,
    label: 'Syllabus',
  },
  {
    key: 'search',
    icon: <Icons.SearchOutlined className="icon" />,
    label: 'Search',
  },
  {
    key: 'settings',
    icon: <Icons.SettingOutlined className="icon" />,
    label: 'Settings',
  },
  {
    key: 'help',
    icon: <Icons.QuestionCircleOutlined className="icon" />,
    label: 'Help',
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useSelector((state: any) => state.themeReducer.theme);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setSelected(path);
  }, [location]);

  return (
    <LayoutAntd.Sider
      className="sidebar"
      width={250}
      breakpoint="lg"
      collapsedWidth="0"
      theme={Theme[theme].toLowerCase() as SiderTheme}
    >
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[selected]}
        style={{ height: '100%' }}
        items={items}
        onSelect={(item) => navigate(`/${item.key}`)}
      />
    </LayoutAntd.Sider>
  );
}
