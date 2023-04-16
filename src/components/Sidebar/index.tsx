import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Icons from '@ant-design/icons';
import { Layout as LayoutAntd, Menu } from 'antd';
import { SiderTheme } from 'antd/lib/layout/Sider';
import { useTranslation } from 'react-i18next';
import { Theme } from '@/constants/settings';
import './index.scss';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const theme = useSelector((state: any) => state.themeReducer.theme);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    setSelected(path);
  }, [location]);

  const items = useMemo(() => [
    {
      key: 'profile',
      icon: <Icons.UserOutlined className="icon" />,
      label: t('common.menu.profile'),
    },
    {
      key: 'attendance',
      icon: <Icons.CheckCircleOutlined className="icon" />,
      label: t('common.menu.attendance'),
    },
    {
      key: 'record-book',
      icon: <Icons.BookOutlined className="icon" />,
      label: t('common.menu.record_book'),
    },
    {
      key: 'rating',
      icon: <Icons.BarChartOutlined className="icon" />,
      label: t('common.menu.rating'),
    },
    {
      key: 'schedule',
      icon: <Icons.CalendarOutlined className="icon" />,
      label: t('common.menu.schedule'),
    },
    {
      key: 'syllabus',
      icon: <Icons.PieChartOutlined className="icon" />,
      label: t('common.menu.syllabus'),
    },
    {
      key: 'search',
      icon: <Icons.SearchOutlined className="icon" />,
      label: t('common.menu.search'),
    },
    {
      key: 'settings',
      icon: <Icons.SettingOutlined className="icon" />,
      label: t('common.menu.settings'),
    },
    {
      key: 'help',
      icon: <Icons.QuestionCircleOutlined className="icon" />,
      label: t('common.menu.help'),
    },
  ], [t]);

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
