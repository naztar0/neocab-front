import React from 'react';
import Header from '@/components/mobile/Calendar/header';
import Cells from '@/components/mobile/Calendar/cells';
import './index.scss';

export default function Calendar({ locale }: { locale: Locale }) {
  return (
    <div className="calendar">
      <Header locale={locale} />
      <Cells locale={locale} />
    </div>
  );
}
