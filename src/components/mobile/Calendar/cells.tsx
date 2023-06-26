import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
  ReactElement,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startOfWeek,
  isSameDay,
  addDays,
  format,
  addWeeks,
} from 'date-fns';
import { AppDispatch } from '@/store/store';
import EventsAzure from '@/components/mobile/Calendar/eventsAzure';
import EventsCustom from '@/components/mobile/Calendar/eventsCustom';
import { setCurrentMonth } from '@/store/reducers/schedule';
import {
  monthFormat,
  dayNameFormat,
  dayNumFormat,
  ScheduleType,
} from '@/constants/schedule';
import './index.scss';

export default function Cells({ locale }: { locale: Locale }) {
  const dispatch = useDispatch<AppDispatch>();
  const azureScheduleData: CalendarEvent[] = useSelector((state: any) => state.scheduleReducer.azureSchedule);
  const groupScheduleData: Schedule[] = useSelector((state: any) => state.scheduleReducer.groupSchedule);
  const isLoading: boolean = useSelector((state: any) => state.scheduleReducer.isLoading);
  const scheduleType: ScheduleType = useSelector((state: any) => state.scheduleReducer.scheduleType);
  const calendarWeekDays: number = useSelector((state: any) => state.scheduleReducer.calendarWeekDays);
  const currentMonth = new Date(useSelector((state: any) => state.scheduleReducer.currentMonth));
  const week: number = useSelector((state: any) => state.scheduleReducer.week);

  const [rowsList, setRowsList] = useState<ReactElement[]>([]);
  const [prevDate, setPrevDate] = useState<Date | null>(null);
  const [prevWeek, setPrevWeek] = useState<number | null>(null);
  const [prevLoad, setPrevLoad] = useState<boolean>(true);

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(setCurrentMonth(addWeeks(currentMonth, 1).toJSON()));
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    });
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [currentMonth, observerTarget]);

  const groupScheduleSubjects = useMemo(() => (
    groupScheduleData?.find((e) => e.week === week)?.schedule_subjects || []
  ), [groupScheduleData, week]);

  const getRows = useCallback(() => {
    const today = new Date();
    const data = [];
    let days = [];
    let day = startOfWeek(currentMonth, { weekStartsOn: 1 });

    for (let i = 0; i < calendarWeekDays; i++) {
      if (scheduleType === ScheduleType.azure) {
        days.push(
          <div key={i}>
            <div className={`day ${isSameDay(day, today) ? 'today' : ''}`}>
              <span className="month">{format(day, monthFormat, { locale })}</span>
              <span className="number">{format(day, dayNumFormat, { locale })}</span>
              <span className="name">{format(day, dayNameFormat, { locale })}</span>
            </div>
            <EventsAzure day={day} events={azureScheduleData} />
          </div>,
        );
      } else if (scheduleType === ScheduleType.custom) {
        days.push(
          <div key={i}>
            <div className={`day ${isSameDay(day, today) ? 'today' : ''}`}>
              <span className="month">{format(day, monthFormat, { locale })}</span>
              <span className="number">{format(day, dayNumFormat, { locale })}</span>
              <span className="name">{format(day, dayNameFormat, { locale })}</span>
            </div>
            <EventsCustom day={day} events={groupScheduleSubjects} />
          </div>,
        );
      }
      data.push(<div className="days" key={day.toString()}>{days}</div>);
      day = addDays(day, 1);
      days = [];
    }
    data.push(<div ref={observerTarget} key="observer" />);
    return data;
  }, [
    currentMonth,
    scheduleType,
    calendarWeekDays,
    azureScheduleData,
    groupScheduleSubjects,
  ]);

  useEffect(() => {
    if (prevDate?.toString() !== currentMonth.toString()) {
      setPrevDate(currentMonth);
      setRowsList(rowsList.slice(0, -1).concat(getRows()));
    }
    if (prevWeek !== week || prevLoad !== isLoading) {
      setPrevWeek(week);
      setPrevLoad(isLoading);
      setRowsList(getRows());
      const now = new Date();
      if (!(currentMonth.getFullYear() === now.getFullYear()
          && currentMonth.getMonth() === now.getMonth()
          && currentMonth.getDate() === now.getDate())
      ) {
        dispatch(setCurrentMonth(now.toJSON()));
      }
    }
  }, [
    prevDate,
    currentMonth,
    prevWeek,
    week,
    prevLoad,
    isLoading,
    getRows,
  ]);

  return rowsList;
}
