import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Icons from '@ant-design/icons';
import { Layout as LayoutAntd, Menu } from 'antd';
import { useTranslation, Trans } from 'react-i18next';
import AboutModal from '@/components/common/AboutModal';
import './index.scss';

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  // noinspection DuplicatedCode
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [selected, setSelected] = useState('');
  const [aboutModalOpen, setAboutModalOpen] = useState(false);

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
      key: 'academic-performance',
      icon: <Icons.LineChartOutlined className="icon" />,
      label: t('common.menu.academic_performance'),
    },
    {
      key: 'search',
      icon: <Icons.SearchOutlined className="icon" />,
      label: t('common.menu.search'),
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
      collapsedWidth="0"
      trigger={null}
      collapsed={collapsed}
    >
      <Menu
        mode="inline"
        selectedKeys={[selected]}
        items={items}
        onSelect={(item) => navigate(`/${item.key}`)}
      />
      <div className="about">
        <button type="button" onClick={() => setAboutModalOpen(true)}>
          <span><Trans i18nKey="common.menu.about" /></span>
        </button>
      </div>
      <AboutModal open={aboutModalOpen} setOpen={setAboutModalOpen} />
    </LayoutAntd.Sider>
  );
}
