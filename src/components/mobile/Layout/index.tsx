import React, { useState } from 'react';
import { Layout as LayoutAntd } from 'antd';
import Navbar from '@/components/mobile/Navbar';
import Sidebar from '@/components/mobile/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
      <LayoutAntd>
        <Sidebar collapsed={collapsed} />
        <LayoutAntd.Content className="container mobile">
          {children}
        </LayoutAntd.Content>
      </LayoutAntd>
    </>
  );
}
