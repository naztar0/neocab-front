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
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import {
  addWeeks,
  format,
  subWeeks,
} from 'date-fns';
import { useTranslation, Trans } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import {
  setCurrentMonth,
  setScheduleType,
  setWeek,
} from '@/store/reducers/schedule';
import {
  BtnType,
  dateFormat,
  ScheduleType,
} from '@/constants/schedule';
import { Role } from '@/constants/profile';
import './index.scss';

export default function Header({ locale }: { locale: Locale }) {
  const dispatch = useDispatch<AppDispatch>();
  useTranslation();

  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const groupScheduleData: Schedule[] = useSelector((state: any) => state.scheduleReducer.groupSchedule);
  const scheduleType: ScheduleType = useSelector((state: any) => state.scheduleReducer.scheduleType);
  const currentMonth = new Date(useSelector((state: any) => state.scheduleReducer.currentMonth));
  const week: number = useSelector((state: any) => state.scheduleReducer.week);

  const changeWeekHandle = useCallback((btnType: BtnType) => {
    if (btnType === 'prev') {
      dispatch(setCurrentMonth(subWeeks(currentMonth, 1).toJSON()));
    }
    if (btnType === 'next') {
      dispatch(setCurrentMonth(addWeeks(currentMonth, 1).toJSON()));
    }
  }, [currentMonth]);

  const weekSchedule = useMemo(() => {
    if (!groupScheduleData.length) return null;
    return groupScheduleData.find((item) => item.week === week) || groupScheduleData[0];
  }, [groupScheduleData, week]);

  const weekOptions = useCallback(() => (
    groupScheduleData.map((item) => (
      <Tooltip title={item.description} key={item.week} placement="leftBottom">
        <Button
          type="ghost"
          onClick={() => dispatch(setWeek(item.week))}
        >
          {item.week}
        </Button>
      </Tooltip>
    ))
  ) as unknown as React.JSX.Element, [groupScheduleData]);

  return (
    <div className="header">
      <div className="col col-start">
        <Button
          className="go-to-today"
          size="middle"
          shape="circle"
          icon={<HomeOutlined />}
          onClick={() => dispatch(setCurrentMonth((new Date()).toJSON()))}
        />
        <Button
          className="arrow"
          size="middle"
          shape="circle"
          icon={<LeftOutlined />}
          onClick={() => changeWeekHandle('prev')}
        />
        <Button
          className="arrow"
          size="middle"
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => changeWeekHandle('next')}
        />
      </div>
      <div className="col col-center">
        <span>{format(currentMonth, dateFormat, { locale })}</span>
      </div>
      <div className="col col-end">
        <Space.Compact>
          <Button
            className="schedule-type"
            size="middle"
            type={scheduleType === ScheduleType.azure ? 'primary' : 'default'}
            onClick={() => scheduleType !== ScheduleType.azure && dispatch(setScheduleType(ScheduleType.azure))}
          >
            <Trans i18nKey="schedule.teams" />
          </Button>
          <Button
            className="schedule-type"
            size="middle"
            type={scheduleType === ScheduleType.custom ? 'primary' : 'default'}
            onClick={() => scheduleType !== ScheduleType.custom && dispatch(setScheduleType(ScheduleType.custom))}
          >
            <Trans i18nKey="schedule.custom" />
          </Button>
          {scheduleType === ScheduleType.custom
            && (profileData.role === Role.Headman || profileData.role === Role.Admin)
            && (
              <Link to="/schedule/edit">
                <Button
                  className="schedule-type schedule-edit"
                  size="middle"
                >
                  <span><Trans i18nKey="schedule.edit_schedule" /></span>
                </Button>
              </Link>
            )}
          {scheduleType === ScheduleType.custom && (
            <Select
              className="schedule-type schedule-week"
              size="middle"
              value={weekSchedule?.week}
              onChange={(value) => dispatch(setWeek(value))}
              dropdownRender={weekOptions}
            />
          )}
        </Space.Compact>
      </div>
    </div>
  );
}
