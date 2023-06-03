import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  startOfWeek,
  isSameDay,
  lastDayOfWeek,
  addDays,
} from 'date-fns';
import EventsAzure from '@/components/Calendar/eventsAzure';
import EventsCustom from '@/components/Calendar/eventsCustom';
import Timeline from '@/components/Calendar/timeline';
import { ScheduleType } from '@/constants/schedule';
import './index.scss';

export default function Cells() {
  const azureScheduleData: CalendarEvent[] = useSelector((state: any) => state.scheduleReducer.azureSchedule);
  const groupScheduleData: Schedule[] = useSelector((state: any) => state.scheduleReducer.groupSchedule);
  const scheduleType: ScheduleType = useSelector((state: any) => state.scheduleReducer.scheduleType);
  const calendarWeekDays = useSelector((state: any) => state.scheduleReducer.calendarWeekDays);
  const currentMonth = new Date(useSelector((state: any) => state.scheduleReducer.currentMonth));
  const week: number = useSelector((state: any) => state.scheduleReducer.week);

  const startDate = useMemo(() => startOfWeek(currentMonth, { weekStartsOn: 1 }), [currentMonth]);
  const endDate = useMemo(() => lastDayOfWeek(currentMonth, { weekStartsOn: 1 }), [currentMonth]);

  const groupScheduleSubjects = useMemo(() => (
    groupScheduleData?.find((e) => e.week === week)?.schedule_subjects || []
  ), [groupScheduleData, week]);

  const rows: JSX.Element[] = useMemo(() => {
    const data = [];
    const today = new Date();
    let days = [<Timeline />];
    let day = startDate;

    while (day < endDate) {
      for (let i = 0; i < calendarWeekDays; i++) {
        days.push(
          <div
            className={`col ${isSameDay(day, today) ? 'today' : ''}`}
            key={day.toString()}
          >
            {scheduleType === ScheduleType.azure && <EventsAzure day={day} events={azureScheduleData} />}
            {scheduleType === ScheduleType.custom && <EventsCustom day={day} events={groupScheduleSubjects} />}
          </div>,
        );
        day = addDays(day, 1);
      }
      data.push(<div className="row cells" key={day.toString()}>{days}</div>);
      days = [];
    }
    return data;
  }, [startDate, endDate, calendarWeekDays, scheduleType, azureScheduleData, groupScheduleSubjects]);

  return rows as unknown as React.JSX.Element;
}
