import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Select,
  Button,
  DatePicker,
  Drawer,
  Table,
  Form,
  List,
  Modal,
  Checkbox,
  Pagination,
  message,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Helmet } from 'react-helmet';
import { Dayjs } from 'dayjs';
import { format } from 'date-fns';
import { useTranslation, Trans } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import { resetAttendance } from '@/store/reducers/attendance';
import { resetUsers } from '@/store/reducers/user';
import Layout from '@/components/Layout';
import SubjectData from '@/components/SubjectData';
import { Role } from '@/constants/profile';
import {
  historyLimitAdmin,
  defaultPagePerPage,
  pageSizeOptions,
  dateFormat,
  modalInit, apiDateFormat,
} from '@/constants/attendance';
import { setUserAttendance } from '@/store/actions/users';
import { getGroupSchedules } from '@/store/actions/schedules';
import { getGroupUsers, getGroupAttendance } from '@/store/actions/groups';
import {
  formatDate,
  getDay,
  getProfessorName,
} from '@/helpers/utils';
import './index.scss';

export default function AttendanceEdit() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const groupSchedules: Schedule[] = useSelector((state: any) => state.scheduleReducer.groupSchedule);
  const groupUsers: Pagination<User> = useSelector((state: any) => state.userReducer.users);
  // eslint-disable-next-line max-len
  const attendanceData: Pagination<AttendanceGroup> = useSelector((state: any) => state.attendanceReducer.attendance);
  const isGroupSchedulesLoading: boolean = useSelector((state: any) => state.scheduleReducer.isLoading);
  const isGroupUsersLoading: boolean = useSelector((state: any) => state.userReducer.isLoading);

  const [pagePerPage, setPagePerPage] = useState(defaultPagePerPage);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState<Dayjs | null>(null);
  const [attendanceWeek, setAttendanceWeek] = useState<number | null>(null);
  const [attendanceSS, setAttendanceSS] = useState<number | null>(null);
  const [attendanceUsers, setAttendanceUsers] = useState<number[]>([]);
  const [attendanceModal, setAttendanceModal] = useState(modalInit);
  const [reloadAttendanceData, setReloadAttendanceData] = useState(false);

  useEffect(() => () => {
    dispatch(resetAttendance());
    dispatch(resetUsers());
  }, []);

  useEffect(() => {
    if (profileData?.role === Role.Headman) {
      dispatch(getGroupAttendance({ group: profileData.group_id, ...pagePerPage }));
      dispatch(getGroupSchedules({ group: profileData.group_id }));
      dispatch(getGroupUsers({ group: profileData.group_id }));
    }
  }, [profileData]);

  useEffect(() => {
    if (profileData?.role === Role.Headman && reloadAttendanceData) {
      setReloadAttendanceData(false);
      dispatch(getGroupAttendance({ group: profileData.group_id, ...pagePerPage }));
    }
  }, [profileData, reloadAttendanceData, pagePerPage]);

  const scheduleSubjects = useMemo(() => {
    if (groupSchedules.length && attendanceDate && attendanceWeek) {
      return groupSchedules.find((schedule) => schedule.id === attendanceWeek)
        ?.schedule_subjects.filter((scheduleSubject) => scheduleSubject.day === getDay(attendanceDate.toDate())) || [];
    }
    return [];
  }, [groupSchedules, attendanceDate, attendanceWeek]);

  const attendanceDataSource = useMemo(() => (
    attendanceData?.data?.slice(-historyLimitAdmin).map((data, index) => ({ ...data, key: index })) || []
  ), [attendanceData]);

  const isLoading = isGroupSchedulesLoading || isGroupUsersLoading;

  const sendAttendance = useCallback(({ target }: CheckboxChangeEvent) => {
    if (!attendanceSS || !attendanceDate) {
      message.error(t('attendance.edit.messages.select_subjects_and_date')).then();
      return;
    }
    if (target.checked) {
      setAttendanceUsers([...attendanceUsers, Number(target.value)]);
    } else {
      setAttendanceUsers(attendanceUsers.filter((user) => user !== Number(target.value)));
    }
    dispatch(setUserAttendance({
      user: target.value,
      scheduleSubject: attendanceSS,
      data: {
        date: format(attendanceDate.toDate(), apiDateFormat),
      },
    }));
  }, [attendanceSS, attendanceDate, attendanceUsers]);

  const onTableClick = useCallback((record: AttendanceGroup) => {
    setAttendanceModal({
      title: (
        <div className="attendance-modal-title">
          <div className="subject">
            {record.schedule_subject.subject.title}
          </div>
          <div className="date">
            {`${format(new Date(record.date), dateFormat)} ${record.schedule_subject.time}`}
          </div>
        </div>
      ),
      users: record.users,
    });
  }, []);

  const onSSChange = useCallback((value: number) => {
    setAttendanceSS(value);
    setAttendanceUsers(attendanceData?.data.find((data) => (
      new Date(data.date).getDate() === attendanceDate?.toDate().getDate()
      && data.schedule_subject.id === value
    ))?.users.map((user) => user.id) || []);
  }, [attendanceData, attendanceDate]);

  const attendanceColumns: ColumnsType<AttendanceGroup> = useMemo(() => [
    {
      dataIndex: 'subject',
      title: t('attendance.edit.subject'),
      render: (value, data) => (
        <SubjectData
          title={data.schedule_subject.subject.title}
          professor={getProfessorName(data.schedule_subject.subject)}
          department={null}
        />
      ),
      onCell: (data) => ({
        onClick: () => onTableClick(data),
      }),
    },
    {
      dataIndex: 'date',
      title: t('attendance.edit.date'),
      render: (value, data) => (
        <span className="date">{formatDate(data.date)}</span>
      ),
      onCell: (data) => ({
        onClick: () => onTableClick(data),
      }),
    },
    {
      dataIndex: 'time',
      title: t('attendance.edit.time'),
      render: (value, data) => (
        <span className="time">{data.schedule_subject.time}</span>
      ),
      onCell: (data) => ({
        onClick: () => onTableClick(data),
      }),
    },
    {
      dataIndex: 'attendances-count',
      title: t('attendance.edit.attendances_count'),
      render: (value, data) => (
        <span className="attendances-count">{data.users.length}</span>
      ),
      onCell: (data) => ({
        onClick: () => onTableClick(data),
      }),
    },
  ], []);

  return (
    <Layout>
      <Helmet title={t('attendance.edit.title') as string} />
      <div className="substrate">
        <Table
          columns={attendanceColumns}
          dataSource={attendanceDataSource}
          pagination={false}
          loading={isLoading}
          caption={(
            <div className="table-title">
              <span className="title">
                <Trans i18nKey="attendance.edit.title" />
              </span>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setAttendanceDate(null);
                  setAttendanceSS(null);
                  setDrawerOpen(true);
                }}
              >
                <span>
                  <Trans i18nKey="attendance.edit.add_attendances" />
                </span>
              </Button>
            </div>
          )}
        />
        <Pagination
          showSizeChanger
          onChange={(page, perPage) => setPagePerPage({ page, perPage })}
          total={attendanceData?.total || 0}
          pageSize={pagePerPage.perPage}
          current={pagePerPage.page}
          pageSizeOptions={pageSizeOptions}
          className="pagination"
        />
        <Drawer
          title={t('attendance.edit.title')}
          placement="right"
          closable
          onClose={() => {
            setDrawerOpen(false);
            setReloadAttendanceData(true);
          }}
          open={drawerOpen}
        >
          <Form
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              label={t('attendance.edit.date')}
              name="date"
              rules={[{ required: true }]}
            >
              <DatePicker
                className="date"
                placeholder={t('attendance.edit.date') as string}
                onSelect={(date) => {
                  setAttendanceDate(date);
                  setAttendanceSS(null);
                }}
              />
            </Form.Item>
            <Form.Item
              label={t('attendance.edit.week')}
              name="week"
              rules={[{ required: true }]}
            >
              <Select
                className="week"
                onSelect={(value) => {
                  setAttendanceWeek(value);
                }}
              >
                {groupSchedules.map((schedule) => (
                  <Select.Option
                    key={`${schedule.id}`}
                    value={schedule.id}
                  >
                    {`${schedule.week}. ${schedule.description}`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={t('attendance.edit.subject')}
              name="subject"
              rules={[{ required: true }]}
            >
              <Select
                className="subject"
                onSelect={onSSChange}
              >
                {scheduleSubjects.map((scheduleSubject) => (
                  <Select.Option
                    key={`${scheduleSubject.id}`}
                    value={scheduleSubject.id}
                  >
                    {`${scheduleSubject.time} ${scheduleSubject.subject.title}`}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={t('attendance.edit.students')}
              name="students"
            >
              <List
                className="attendance-students"
                size="small"
                dataSource={groupUsers.data}
                renderItem={(user) => (
                  <List.Item>
                    <Checkbox
                      onChange={sendAttendance}
                      disabled={isLoading || !attendanceSS || !attendanceDate}
                      value={user.id}
                      checked={attendanceUsers.includes(user.id)}
                    >
                      {`${user.last_name} ${user.first_name}`}
                    </Checkbox>
                  </List.Item>
                )}
              />
            </Form.Item>
          </Form>
        </Drawer>
        <Modal
          title={attendanceModal.title || ''}
          open={!!attendanceModal.title}
          onCancel={() => setAttendanceModal(modalInit)}
          footer={[
            <Button key="back" onClick={() => setAttendanceModal(modalInit)}>
              <Trans i18nKey="common.buttons.close" />
            </Button>,
          ]}
        >
          {attendanceModal.users?.map((user, index) => (
            <List className="attendance-modal-body" key={user.id} size="small">
              <List.Item className="name">{`${index + 1}. ${user.last_name} ${user.first_name}`}</List.Item>
            </List>
          ))}
        </Modal>
      </div>
    </Layout>
  );
}
