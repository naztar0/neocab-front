import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Select,
  Tooltip,
  Space,
} from 'antd';
import {
  format,
} from 'date-fns';
import { useTranslation, Trans } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import {
  setScheduleType,
  setWeek,
} from '@/store/reducers/schedule';
import {
  yearFormat,
  ScheduleType,
} from '@/constants/schedule';
import { Role } from '@/constants/profile';
import './index.scss';

export default function Header({ locale }: { locale: Locale }) {
  // noinspection DuplicatedCode
  const dispatch = useDispatch<AppDispatch>();
  useTranslation();

  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const groupScheduleData: Schedule[] = useSelector((state: any) => state.scheduleReducer.groupSchedule);
  const scheduleType: ScheduleType = useSelector((state: any) => state.scheduleReducer.scheduleType);
  const currentMonth = new Date(useSelector((state: any) => state.scheduleReducer.currentMonth));
  const week: number = useSelector((state: any) => state.scheduleReducer.week);

  const weekSchedule = useMemo(() => {
    if (!groupScheduleData.length) return null;
    return groupScheduleData.find((item) => item.week === week) || groupScheduleData[0];
  }, [groupScheduleData, week]);

  const weekOptions = useCallback(() => (
    groupScheduleData.map((item) => (
      <Tooltip title={item.description} key={item.week} placement="leftBottom">
        <Button
          size="small"
          type="text"
          className="no-bg"
          onClick={() => dispatch(setWeek(item.week))}
        >
          {item.week}
        </Button>
      </Tooltip>
    ))
  ) as unknown as React.JSX.Element, [groupScheduleData]);

  return (
    <div className="table-title">
      <div className="title">
        <span>{format(currentMonth, yearFormat, { locale })}</span>
      </div>
      <Space.Compact size="small">
        <Button
          className="schedule-type"
          size="small"
          type={scheduleType === ScheduleType.azure ? 'primary' : 'default'}
          onClick={() => scheduleType !== ScheduleType.azure && dispatch(setScheduleType(ScheduleType.azure))}
        >
          <Trans i18nKey="schedule.teams" />
        </Button>
        {!(scheduleType === ScheduleType.custom
          && (profileData.role === Role.Headman || profileData.role === Role.Admin))
          && (
          <Button
            className="schedule-type"
            size="small"
            type={scheduleType === ScheduleType.custom ? 'primary' : 'default'}
            onClick={() => scheduleType !== ScheduleType.custom && dispatch(setScheduleType(ScheduleType.custom))}
          >
            <Trans i18nKey="schedule.custom" />
          </Button>
          )}
        {scheduleType === ScheduleType.custom
          && (profileData.role === Role.Headman || profileData.role === Role.Admin)
          && (
            <Link to="/schedule/edit">
              <Button
                className="schedule-type schedule-edit"
                size="small"
              >
                <span><Trans i18nKey="schedule.edit_schedule" /></span>
              </Button>
            </Link>
          )}
        {scheduleType === ScheduleType.custom && (
          <Select
            className="schedule-type schedule-week"
            size="small"
            value={weekSchedule?.week}
            onChange={(value) => dispatch(setWeek(value))}
            dropdownRender={weekOptions}
          />
        )}
      </Space.Compact>
    </div>
  );
}
