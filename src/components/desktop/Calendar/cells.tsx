import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  startOfWeek,
  isSameDay,
  addDays,
} from 'date-fns';
import EventsAzure from '@/components/desktop/Calendar/eventsAzure';
import EventsCustom from '@/components/desktop/Calendar/eventsCustom';
import Timeline from '@/components/desktop/Calendar/timeline';
import { ScheduleType } from '@/constants/schedule';
import './index.scss';

export default function Cells() {
  const azureScheduleData: CalendarEvent[] = useSelector((state: any) => state.scheduleReducer.azureSchedule);
  const groupScheduleData: Schedule[] = useSelector((state: any) => state.scheduleReducer.groupSchedule);
  const scheduleType: ScheduleType = useSelector((state: any) => state.scheduleReducer.scheduleType);
  const calendarWeekDays = useSelector((state: any) => state.scheduleReducer.calendarWeekDays);
  const currentMonth = new Date(useSelector((state: any) => state.scheduleReducer.currentMonth));
  const week: number = useSelector((state: any) => state.scheduleReducer.week);

  const groupScheduleSubjects = useMemo(() => (
    groupScheduleData?.find((e) => e.week === week)?.schedule_subjects || []
  ), [groupScheduleData, week]);

  const rows: React.JSX.Element = useMemo(() => {
    const today = new Date();
    const days = [<Timeline key="timeline" />];
    let day = startOfWeek(currentMonth, { weekStartsOn: 1 });

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
    return <div className="row cells" key={day.toString()}>{days}</div>;
  }, [currentMonth, calendarWeekDays, scheduleType, azureScheduleData, groupScheduleSubjects]);

  return rows;
}
