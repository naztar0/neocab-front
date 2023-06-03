import React from 'react';
import Header from '@/components/Calendar/header';
import Days from '@/components/Calendar/days';
import Times from '@/components/Calendar/times';
import Cells from '@/components/Calendar/cells';
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
