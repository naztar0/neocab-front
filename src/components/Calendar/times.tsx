import React from 'react';
import { useSelector } from 'react-redux';
import { formatZero } from '@/helpers/utils';
import './index.scss';

export default function Times() {
  const calendarStartHour = useSelector((state: any) => state.scheduleReducer.calendarStartHour);
  const calendarEndHour = useSelector((state: any) => state.scheduleReducer.calendarEndHour);

  const cols = [];
  for (let i = calendarStartHour; i <= calendarEndHour; i++) {
    cols.push(
      <div className="cell" key={i}>
        <span className="time">{`${formatZero(i)}:00`}</span>
      </div>,
    );
  }
  return <div className="col times">{cols}</div>;
}
