import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  format,
  startOfWeek,
  isSameDay,
  addDays,
} from 'date-fns';
import { dayNumFormat, dayNameFormat } from '@/constants/schedule';
import './index.scss';

export default function Days({ locale }: { locale: Locale }) {
  const calendarWeekDays = useSelector((state: any) => state.scheduleReducer.calendarWeekDays);
  const currentMonth = new Date(useSelector((state: any) => state.scheduleReducer.currentMonth));

  const days = useMemo(() => {
    const data = [];
    let day = startOfWeek(currentMonth, { weekStartsOn: 1 });
    for (let i = 0; i < calendarWeekDays; i++) {
      data.push(
        <div className={`col day ${isSameDay(day, new Date()) ? 'today' : ''}`} key={i}>
          <span className="number">{format(day, dayNumFormat, { locale })}</span>
          <span className="name">{format(day, dayNameFormat, { locale })}</span>
        </div>,
      );
      day = addDays(day, 1);
    }
    return data;
  }, [calendarWeekDays, currentMonth, locale]);

  return <div className="days row">{days}</div>;
}
