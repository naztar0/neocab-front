import React from 'react';
import { Layout as LayoutAntd } from 'antd';
import Navbar from '@/components/desktop/Navbar';
import Sidebar from '@/components/desktop/Sidebar';

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
