import React from 'react';
import { Button, Popover } from 'antd';
import { VideoCameraOutlined } from '@ant-design/icons';
import {
  isSameDay,
  format,
} from 'date-fns';
import dayjs from 'dayjs';
import { useTranslation, Trans } from 'react-i18next';
import { getDate } from '@/helpers/utils';
import {
  timeFormat,
} from '@/constants/schedule';
import './index.scss';

export default function EventsCustom({ events, day }: { events: CalendarEvent[], day: Date }) {
  useTranslation();
  const result = events
    .filter((e) => isSameDay(day, getDate(e.start)))
    .sort((a, b) => (dayjs(getDate(a.start), timeFormat) > dayjs(getDate(b.start), timeFormat) ? 1 : -1))
    .map((event) => {
      const eventStart = getDate(event.start);
      const eventEnd = getDate(event.end);
      return (
        <Popover
          trigger="click"
          title={`${format(eventStart, timeFormat)} - ${format(eventEnd, timeFormat)}`}
          content={(
            <a href={event.joinUrl} target="_blank" rel="noreferrer">
              <Button size="middle" type="primary" icon={<VideoCameraOutlined />}>
                <span><Trans i18nKey="schedule.join" /></span>
              </Button>
            </a>
          )}
        >
          <div className="event" key={event.start.toString()}>
            <div className="ui" />
            <div className="content">
              <div className="title">{event.subject}</div>
              <div className="time">{`${format(eventStart, timeFormat)} - ${format(eventEnd, timeFormat)}`}</div>
              <div className="organizer">{event.organizer}</div>
            </div>
          </div>
        </Popover>
      );
    });
  if (!result.length) {
    return (
      <div className="event" key={day.toString()}>
        <div className="ui" />
        <div className="content">
          <div className="title"><Trans i18nKey="schedule.no_subjects" /></div>
        </div>
      </div>
    );
  }
  return result;
}
