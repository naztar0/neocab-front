import React from 'react';
import Header from '@/components/desktop/Calendar/header';
import Days from '@/components/desktop/Calendar/days';
import Times from '@/components/desktop/Calendar/times';
import Cells from '@/components/desktop/Calendar/cells';
import './index.scss';

export default function Calendar({ locale }: { locale: Locale }) {
  return (
    <div className="calendar">
      <Header locale={locale} />
      <Days locale={locale} />
      <Times />
      <Cells />
    </div>
  );
}
