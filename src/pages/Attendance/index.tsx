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
import Layout from '@/components/Layout';
import SubjectData from '@/components/SubjectData';
import { Theme } from '@/constants/settings';
import {
  dateFormat,
  apiDateFormat,
  mainColor,
  historyLimit,
} from '@/constants/attendance';
import { timeFormat } from '@/constants/schedule';
import { Role } from '@/constants/profile';
import { getProfessorName, formatDate } from '@/helpers/utils';
import './index.scss';

export default function Attendance() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const theme: Theme = useSelector((state: any) => state.themeReducer.theme);
  const attendanceData: AttendanceResponse = useSelector((state: any) => state.attendanceReducer.attendance);
  const isLoading: boolean = useSelector((state: any) => state.attendanceReducer.isLoading);

  const [modalDay, setModalDay] = useState<string | null>(null);

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
      render: (value, data) => (
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
      render: (value, data) => (
        <span className="date">{`${formatDate(data.date)} ${data.schedule_subject.time}`}</span>
      ),
    },
  ], [t]);

  const mostVisitedSubjectsColumns: ColumnsType<AttendanceMostVisited> = useMemo(() => [
    {
      dataIndex: 'subject',
      title: t('attendance.subject'),
      render: (value, data) => (
        <span className="subject">{data.title}</span>
      ),
    },
    {
      dataIndex: 'count',
      title: t('attendance.visits'),
      render: (value, data) => (
        <span className="count">{data.count}</span>
      ),
    },
  ], [t]);

  const mostVisitedSubjectsDataSource = useMemo(() => (
    attendanceData?.most_visited.map((data, index) => ({ ...data, key: index }))
  ), [attendanceData]);

  const lastAttendancesDataSource = useMemo(() => (
    attendanceData?.attendance.slice(-historyLimit).map((data, index) => ({ ...data, key: index }))
  ), [attendanceData]);

  const labels: Labels = useMemo(() => ({
    months: [
      t('attendance.labels.months.january'),
      t('attendance.labels.months.february'),
      t('attendance.labels.months.march'),
      t('attendance.labels.months.april'),
      t('attendance.labels.months.may'),
      t('attendance.labels.months.june'),
      t('attendance.labels.months.july'),
      t('attendance.labels.months.august'),
      t('attendance.labels.months.september'),
      t('attendance.labels.months.october'),
      t('attendance.labels.months.november'),
      t('attendance.labels.months.december'),
    ],
    weekdays: [
      t('attendance.labels.weekdays.monday'),
      t('attendance.labels.weekdays.tuesday'),
      t('attendance.labels.weekdays.wednesday'),
      t('attendance.labels.weekdays.thursday'),
      t('attendance.labels.weekdays.friday'),
      t('attendance.labels.weekdays.saturday'),
      t('attendance.labels.weekdays.sunday'),
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
      {(profileData?.role === Role.Headman || profileData?.role === Role.Admin) && (
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
              weekStart={0}
              fontSize={12}
              color={mainColor}
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
                  { date: formatDate(activity.date), count: activity.count },
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
