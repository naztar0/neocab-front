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
import ActivityCalendar, { Activity, Level } from 'react-activity-calendar';
import { startOfYear, endOfYear, format } from 'date-fns';
import dayjs from 'dayjs';
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
      title: 'Subject',
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
      title: 'Date',
      render: (value, data) => (
        <span className="date">{`${formatDate(data.date)} ${data.schedule_subject.time}`}</span>
      ),
    },
  ], []);

  const mostVisitedSubjectsColumns: ColumnsType<AttendanceMostVisited> = useMemo(() => [
    {
      dataIndex: 'subject',
      title: 'Subject',
      render: (value, data) => (
        <span className="subject">{data.title}</span>
      ),
    },
    {
      dataIndex: 'count',
      title: 'Visits',
      render: (value, data) => (
        <span className="count">{data.count}</span>
      ),
    },
  ], []);

  const mostVisitedSubjectsDataSource = useMemo(() => (
    attendanceData?.most_visited.map((data, index) => ({ ...data, key: index }))
  ), [attendanceData]);

  const lastAttendancesDataSource = useMemo(() => (
    attendanceData?.attendance.slice(-historyLimit).map((data, index) => ({ ...data, key: index }))
  ), [attendanceData]);

  return (
    <Layout>
      <Helmet title="Attendance" />
      {(profileData?.role === Role.Headman || profileData?.role === Role.Admin) && (
        <div className="attendance-title">
          <span className="title">Attendance</span>
          <Link to="/attendance/edit">
            <Button>Edit attendances</Button>
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
              color={mainColor}
              colorScheme={theme === Theme.Dark ? 'dark' : 'light'}
              showWeekdayLabels
              hideTotalCount
              eventHandlers={{
                onClick: () => (day) => (
                  setModalDay(day.date)
                ),
              }}
              renderBlock={(block, activity) => (
                <Tooltip title={`${formatDate(activity.date)}: ${activity.count} attendances`}>
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
                  <span>Last attendances</span>
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
                <span>Most visited subjects</span>
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
          <Button key="back" onClick={() => setModalDay(null)}>Close</Button>,
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
