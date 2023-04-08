import React from 'react';
import { useSelector } from 'react-redux';
import {
  setMinutes,
  differenceInMinutes,
} from 'date-fns';
import dayjs from 'dayjs';
import { getDay, formatName } from '@/helpers/utils';
import {
  shiftCoefficient,
  customSubjectDuration,
  timeFormat,
} from '@/constants/schedule';
import './index.scss';

export default function EventsCustom({ events, day }: { events: ScheduleSubject[], day: Date }) {
  const calendarStartHour = useSelector((state: any) => state.scheduleReducer.calendarStartHour);
  const calendarEndHour = useSelector((state: any) => state.scheduleReducer.calendarEndHour);
  const calendarWeekDays = useSelector((state: any) => state.scheduleReducer.calendarWeekDays);

  const cols = [];
  for (let i = calendarStartHour; i <= calendarEndHour; i++) {
    const event = events.find((e) => getDay(day) === e.day && dayjs(e.time, timeFormat).hour() === i);
    if (event) {
      const eventStart = setMinutes(day, dayjs(event.time, timeFormat).minute());
      const eventHeight = customSubjectDuration * shiftCoefficient;
      const eventTop = differenceInMinutes(eventStart, setMinutes(eventStart, 0)) * shiftCoefficient;
      cols.push(
        <div className="cell" key={i}>
          <div
            className={`event days-${calendarWeekDays}`}
            style={{ height: `${eventHeight}px`, marginTop: `${eventTop}px` }}
          >
            <div className="ui" />
            <div className="content">
              <div className="title">{event.subject.title}</div>
              <div className="organizer">{event.subject.professor_name || formatName(event.subject.professor)}</div>
              <div className="notes s1">{event.notes}</div>
              <div className="notes s2">{event.subject.notes}</div>
            </div>
          </div>
        </div>,
      );
    } else if (i <= calendarEndHour - 1) {
      cols.push(
        <div className="cell" key={i}>
          <div className="event empty" />
        </div>,
      );
    } else {
      cols.push(<div className="cell" key={i} />);
    }
  }
  return cols as unknown as JSX.Element;
}
