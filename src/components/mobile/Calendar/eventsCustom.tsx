import React from 'react';
import {
  setMinutes,
  addMinutes,
  differenceInMinutes,
  format,
} from 'date-fns';
import { useTranslation, Trans } from 'react-i18next';
import { getDay, parseHM, formatName } from '@/helpers/utils';
import {
  customSubjectDuration,
  timeFormat,
} from '@/constants/schedule';
import './index.scss';

export default function EventsCustom({ events, day }: { events: ScheduleSubject[], day: Date }) {
  useTranslation();
  const result = events
    .filter((e) => getDay(day) === e.day)
    .sort((a, b) => (parseHM(a.time) > parseHM(b.time) ? 1 : -1))
    .map((event) => {
      const eventEnd = setMinutes(
        day,
        differenceInMinutes(addMinutes(parseHM(event.time), customSubjectDuration), day),
      );
      return (
        <div className="event" key={event.id}>
          <div className="ui" />
          <div className="content">
            <div className="title">{event.subject.title}</div>
            <div className="time">{`${event.time} - ${format(eventEnd, timeFormat)}`}</div>
            <div className="organizer">{event.subject.professor_name || formatName(event.subject.professor)}</div>
            <div className="notes s1">{event.notes}</div>
            <div className="notes s2">{event.subject.notes}</div>
          </div>
        </div>
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
