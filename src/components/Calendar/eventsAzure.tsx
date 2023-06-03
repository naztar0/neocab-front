import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Button, Popover } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';
import {
  format,
  isSameDay,
  setMinutes,
  differenceInMinutes,
} from 'date-fns';
import { Trans, useTranslation } from 'react-i18next';
import { getDate } from '@/helpers/utils';
import { shiftCoefficient } from '@/constants/schedule';
import './index.scss';

export default function EventsAzure({ events, day }: { events: CalendarEvent[], day: Date }) {
  useTranslation();
  const calendarStartHour = useSelector((state: any) => state.scheduleReducer.calendarStartHour);
  const calendarEndHour = useSelector((state: any) => state.scheduleReducer.calendarEndHour);
  const calendarWeekDays = useSelector((state: any) => state.scheduleReducer.calendarWeekDays);

  const cols = useMemo(() => {
    const data = [];
    for (let i = calendarStartHour; i <= calendarEndHour; i++) {
      const event = events.find((e) => {
        const eventDay = getDate(e.start);
        return isSameDay(day, eventDay) && eventDay.getHours() === i;
      });
      if (event) {
        const eventStart = getDate(event.start);
        const eventEnd = getDate(event.end);
        const eventHeight = differenceInMinutes(eventEnd, eventStart) * shiftCoefficient;
        const eventTop = differenceInMinutes(eventStart, setMinutes(eventStart, 0)) * shiftCoefficient;
        data.push(
          <div className="cell" key={i}>
            <Popover
              trigger="click"
              title={`${format(eventStart, 'HH:mm')} - ${format(eventEnd, 'HH:mm')}`}
              content={(
                <a href={event.joinUrl} target="_blank" rel="noreferrer">
                  <Button size="middle" type="primary" icon={<VideoCameraOutlined />}>
                    <span><Trans i18nKey="schedule.join" /></span>
                  </Button>
                </a>
              )}
            >
              <div
                className={`event days-${calendarWeekDays}`}
                style={{ height: `${eventHeight}px`, marginTop: `${eventTop}px` }}
              >
                <div className="ui" />
                <div className="content">
                  <div className="title">{event.subject}</div>
                  <div className="organizer">{event.organizer}</div>
                </div>
              </div>
            </Popover>
          </div>,
        );
      } else if (i <= calendarEndHour - 1) {
        data.push(
          <div className="cell" key={i}>
            <div className="event empty" />
          </div>,
        );
      } else {
        data.push(<div className="cell" key={i} />);
      }
    }
    return data;
  }, [events, day, calendarStartHour, calendarEndHour, calendarWeekDays]);

  return cols as unknown as React.JSX.Element;
}
