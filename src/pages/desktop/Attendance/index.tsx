import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Divider,
  Modal,
  Tooltip,
  Table,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Helmet } from 'react-helmet';
import ActivityCalendar, {
  Activity,
  Labels,
  Level,
} from 'react-activity-calendar';
import { startOfYear, endOfYear, format } from 'date-fns';
import dayjs from 'dayjs';
import { useTranslation, Trans } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import { getUserAttendance } from '@/store/actions/users';
import { resetAttendance } from '@/store/reducers/attendance';
import Layout from '@/components/desktop/Layout';
import SubjectData from '@/components/common/SubjectData';
import { Theme } from '@/constants/settings';
import {
  dateFormat,
  apiDateFormat,
  mainColor,
  startColorDark,
  startColorLight,
  historyLimit,
} from '@/constants/attendance';
import { timeFormat } from '@/constants/schedule';
import { Role } from '@/constants/profile';
import { getProfessorName } from '@/helpers/utils';
import './index.scss';

export default function Attendance() {
  // noinspection DuplicatedCode
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const theme: Theme = useSelector((state: any) => state.themeReducer.theme);
  const attendanceData: AttendanceResponse = useSelector((state: any) => state.attendanceReducer.attendance);
  const isLoading: boolean = useSelector((state: any) => state.attendanceReducer.isLoading);

  const [modalDay, setModalDay] = useState<string | null>(null);

  // noinspection DuplicatedCode
  useEffect(() => () => {
    dispatch(resetAttendance());
  }, []);

  useEffect(() => {
    if (profileData) {
      dispatch(getUserAttendance({ user: profileData.id }));
    }
  }, [profileData]);

  const daysData: Activity[] = useMemo(() => {
    const data = attendanceData?.history.map((day) => {
      const level: Level = day.count > 4 ? 4 : day.count as Level;
      return { ...day, level };
    }) || [];
    const firstDay: Activity = { date: format(startOfYear(new Date()), apiDateFormat), count: 0, level: 0 };
    data.unshift(firstDay);
    const lastDay: Activity = { date: format(endOfYear(new Date()), apiDateFormat), count: 0, level: 0 };
    data.push(lastDay);
    return data;
  }, [attendanceData]);

  const lastAttendancesColumns: ColumnsType<AttendanceLog> = useMemo(() => [
    {
      dataIndex: 'subject',
      title: t('attendance.subject'),
      render: (_, data) => (
        <SubjectData
          title={data.schedule_subject.subject.title}
          professor={getProfessorName(data.schedule_subject.subject)}
          department={null}
        />
      ),
    },
    {
      dataIndex: 'date',
      title: t('attendance.date'),
      render: (_, data) => (
        <span className="date">{`${format(new Date(data.date), dateFormat)} ${data.schedule_subject.time}`}</span>
      ),
    },
  ], [t]);

  const mostVisitedSubjectsColumns: ColumnsType<AttendanceMostVisited> = useMemo(() => [
    {
      dataIndex: 'subject',
      title: t('attendance.subject'),
      render: (_, data) => (
        <span className="subject">{data.title}</span>
      ),
    },
    {
      dataIndex: 'count',
      title: t('attendance.visits'),
      render: (_, data) => (
        <span className="count">{data.count}</span>
      ),
    },
  ], [t]);

  const mostVisitedSubjectsDataSource = useMemo(() => (
    attendanceData?.most_visited.map((data, index) => ({ ...data, key: index }))
  ), [attendanceData]);

  // noinspection DuplicatedCode
  const lastAttendancesDataSource = useMemo(() => (
    attendanceData?.attendance.slice(-historyLimit).map((data, index) => ({ ...data, key: index }))
  ), [attendanceData]);

  const labels: Labels = useMemo(() => ({
    months: [
      t('common.labels.months.january'),
      t('common.labels.months.february'),
      t('common.labels.months.march'),
      t('common.labels.months.april'),
      t('common.labels.months.may'),
      t('common.labels.months.june'),
      t('common.labels.months.july'),
      t('common.labels.months.august'),
      t('common.labels.months.september'),
      t('common.labels.months.october'),
      t('common.labels.months.november'),
      t('common.labels.months.december'),
    ],
    weekdays: [
      t('common.labels.weekdays.sunday'),
      t('common.labels.weekdays.monday'),
      t('common.labels.weekdays.tuesday'),
      t('common.labels.weekdays.wednesday'),
      t('common.labels.weekdays.thursday'),
      t('common.labels.weekdays.friday'),
      t('common.labels.weekdays.saturday'),
    ],
    legend: {
      less: t('attendance.labels.legend.less') as string,
      more: t('attendance.labels.legend.more') as string,
    },
    totalCount: t('attendance.labels.total_count') as string,
  }), [t]);

  return (
    <Layout>
      <Helmet title={t('common.menu.attendance') as string} />
      {(profileData?.role === Role.Headman) && (
        <div className="attendance-title">
          <span className="title">
            <Trans i18nKey="common.menu.attendance" />
          </span>
          <Link to="/attendance/edit">
            <Button>
              <Trans i18nKey="attendance.edit_attendances" />
            </Button>
          </Link>
        </div>
      )}
      <div className="attendance-row">
        <div className="attendance-column">
          <div className="substrate activity-calendar">
            <ActivityCalendar
              loading={isLoading}
              data={daysData}
              weekStart={1}
              fontSize={12}
              theme={{ light: [startColorLight, mainColor], dark: [startColorDark, mainColor] }}
              colorScheme={theme === Theme.Dark ? 'dark' : 'light'}
              labels={labels}
              showWeekdayLabels
              hideTotalCount
              eventHandlers={{
                onClick: () => (day) => (
                  setModalDay(day.date)
                ),
              }}
              renderBlock={(block, activity) => (
                <Tooltip title={t(
                  'attendance.attendances',
                  { date: format(new Date(activity.date), dateFormat), count: activity.count },
                )}
                >
                  {block}
                </Tooltip>
              )}
            />
          </div>
          <div className="substrate subject-table">
            <Table
              columns={lastAttendancesColumns}
              dataSource={lastAttendancesDataSource}
              pagination={false}
              loading={isLoading}
              caption={(
                <div className="title">
                  <span>
                    <Trans i18nKey="attendance.last_attendances" />
                  </span>
                </div>
              )}
            />
          </div>
        </div>
        <div className="substrate row">
          <Table
            columns={mostVisitedSubjectsColumns}
            dataSource={mostVisitedSubjectsDataSource}
            pagination={false}
            size="small"
            loading={isLoading}
            caption={(
              <div className="title">
                <span>
                  <Trans i18nKey="attendance.most_visited_subjects" />
                </span>
              </div>
            )}
          />
        </div>
      </div>
      <Modal
        title={modalDay ? format(new Date(modalDay), dateFormat) : ''}
        open={!!modalDay}
        onCancel={() => setModalDay(null)}
        footer={[
          <Button key="back" onClick={() => setModalDay(null)}>
            <Trans i18nKey="common.buttons.close" />
          </Button>,
        ]}
      >
        {attendanceData?.attendance.filter((day) => day.date === modalDay)
          ?.sort((a, b) => (
            dayjs(a.schedule_subject.time, timeFormat).isAfter(dayjs(b.schedule_subject.time, timeFormat)) ? 1 : -1))
          .map((attendance) => (
            <div className="attendance-modal subject-table" key={attendance.id}>
              <Divider>
                <span className="time">{attendance.schedule_subject.time}</span>
              </Divider>
              <SubjectData
                title={attendance.schedule_subject.subject.title}
                professor={getProfessorName(attendance.schedule_subject.subject)}
                department={null}
              />
            </div>
          ))}
      </Modal>
    </Layout>
  );
}
