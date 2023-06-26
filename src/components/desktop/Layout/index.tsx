import React from 'react';
import { Layout as LayoutAntd } from 'antd';
import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <LayoutAntd>
        <Sidebar />
        <LayoutAntd.Content className="container">
          {children}
        </LayoutAntd.Content>
      </LayoutAntd>
    </>
  );
}
