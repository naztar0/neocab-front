import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Drawer,
  Input,
  InputNumber,
  Button,
  Form,
  Popconfirm,
  message,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { Helmet } from 'react-helmet';
import { useTranslation, Trans } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/desktop/Layout';
import {
  getGroupSchedules,
  getGroupSubjects,
  addGroupSchedule,
  addScheduleSubject,
  editSchedule,
  editScheduleSubject,
  removeSchedule,
  removeScheduleSubject,
} from '@/store/actions/schedules';
import {
  ScheduleEditType,
  timeFormat,
} from '@/constants/schedule';
import Semester from '@/components/common/Semester';
import SubjectData from '@/components/common/SubjectData';
import ScheduleSubjectEdit from '@/components/common/ScheduleSubjectEdit';
import { yearToSemester, getProfessorName } from '@/helpers/utils';
import './index.scss';

export default function ScheduleEdit() {
  // noinspection DuplicatedCode
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const groupScheduleData: Schedule[] = useSelector((state: any) => state.scheduleReducer.groupSchedule);
  const groupSubjectsData: Subject[] = useSelector((state: any) => state.scheduleReducer.groupSubjects);
  const dataSwitch: boolean = useSelector((state: any) => state.scheduleReducer.dataSwitch);
  const isLoading: boolean = useSelector((state: any) => state.scheduleReducer.isLoading);

  const [schedule, setSchedule] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editType, setEditType] = useState<ScheduleEditType | null>();
  const [editScheduleSubjectId, setEditScheduleSubjectId] = useState<number | null>(null);
  const [addScheduleSubjectId, setAddScheduleSubjectId] = useState<number | null>(null);
  const [semester, setSemester] = useState(yearToSemester(profileData?.year ?? 0));

  useEffect(() => {
    if (profileData) {
      dispatch(getGroupSchedules({ group: profileData.group_id }));
    }
  }, [profileData, dataSwitch]);

  useEffect(() => {
    if (profileData) {
      setSemester(yearToSemester(profileData.year));
    }
  }, [profileData]);

  useEffect(() => {
    if (semester) {
      dispatch(getGroupSubjects({ group: profileData.group_id, semester }));
    }
  }, [semester]);

  const onSave = useCallback((values: any) => {
    if (!values.week || !values.description) {
      message.error(t('common.messages.fill_all_fields')).then();
      return;
    }
    if (editType === ScheduleEditType.addNew) {
      dispatch(addGroupSchedule({
        group: profileData.group_id,
        data: values,
      }));
    } else if (editType === ScheduleEditType.editMeta && schedule) {
      dispatch(editSchedule({
        schedule,
        data: values,
      }));
    }
    setEditType(null);
    setSchedule(null);
    setDrawerOpen(false);
  }, [editType, schedule]);

  const onSubjectChange = useCallback((value: any) => {
    if (!editScheduleSubjectId) {
      setEditScheduleSubjectId(value.subject);
    }
  }, [editScheduleSubjectId]);

  const onSubjectSave = useCallback((values: any) => {
    if (!values.day || !values.time) {
      message.error(t('common.messages.fill_all_fields')).then();
      return;
    }
    values.time = dayjs(values.time).format(timeFormat);
    if (editScheduleSubjectId) {
      dispatch(editScheduleSubject({ scheduleSubject: editScheduleSubjectId, data: values }));
    }
    setEditScheduleSubjectId(null);
  }, [editScheduleSubjectId]);

  const onSubjectAdd = useCallback((values: any) => {
    if (!values.day || !values.time) {
      message.error(t('common.messages.fill_all_fields')).then();
      return;
    }
    values.time = dayjs(values.time).format(timeFormat);
    if (addScheduleSubjectId && schedule) {
      dispatch(addScheduleSubject({ schedule, subject: addScheduleSubjectId, data: values }));
    }
    setAddScheduleSubjectId(null);
  }, [addScheduleSubjectId, schedule]);

  const onSubjectDelete = useCallback((scheduleSubject: number) => {
    dispatch(removeScheduleSubject({ scheduleSubject }));
  }, []);

  const columns: ColumnsType<Schedule> = useMemo(() => [
    {
      dataIndex: 'week',
      render: (value, data) => (
        <span className="week">{data.week}</span>
      ),
    },
    {
      dataIndex: 'description',
      render: (value, data) => (
        <span className="description">{data.description}</span>
      ),
    },
    {
      dataIndex: 'actions',
      render: (value, data) => (
        <div className="actions">
          <Button
            shape="circle"
            icon={<SettingOutlined />}
            onClick={() => {
              setSchedule(data.id);
              setEditType(ScheduleEditType.editSubjects);
              setDrawerOpen(true);
            }}
          />
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => {
              setSchedule(data.id);
              setEditType(ScheduleEditType.editMeta);
              setDrawerOpen(true);
            }}
          />
          <Popconfirm
            title={t('schedule.edit.delete_schedule')}
            description={t('schedule.edit.sure_to_delete_schedule')}
            okText={t('common.buttons.yes')}
            cancelText={t('common.buttons.no')}
            placement="left"
            onConfirm={() => {
              dispatch(removeSchedule({ schedule: data.id }));
            }}
          >
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ], []);

  // noinspection DuplicatedCode
  const subjectsColumns: ColumnsType<Subject> = useMemo(() => [
    {
      dataIndex: 'name',
      render: (value, data) => (
        <div className="schedule-subject">
          <div className="subject-data">
            <SubjectData title={data.title} professor={getProfessorName(data)} department={data.department?.name} />
            <Button
              type="ghost"
              icon={addScheduleSubjectId !== data.id ? <PlusOutlined /> : <MinusOutlined />}
              onClick={() => setAddScheduleSubjectId(addScheduleSubjectId !== data.id ? data.id : null)}
            />
          </div>
          <div className="subject-days">
            {groupScheduleData.find((item) => item.id === schedule)
              ?.schedule_subjects?.filter((ss) => ss.subject_id === data.id).map((ss) => (
                <ScheduleSubjectEdit
                  key={ss.id}
                  editScheduleSubjectId={editScheduleSubjectId}
                  scheduleSubject={ss}
                  onChange={onSubjectChange}
                  onSave={onSubjectSave}
                  onDelete={onSubjectDelete}
                />
              ))}
            {addScheduleSubjectId === data.id && (
              <ScheduleSubjectEdit
                editScheduleSubjectId={null}
                scheduleSubject={null}
                onChange={() => {}}
                onSave={onSubjectAdd}
                onDelete={() => {}}
              />
            )}
          </div>
        </div>
      ),
    },
  ], [
    addScheduleSubjectId,
    groupScheduleData,
    schedule,
    editScheduleSubjectId,
    onSubjectChange,
    onSubjectSave,
    onSubjectAdd,
  ]);

  const schedulesDataSource = useMemo(() => (
    groupScheduleData.map((data, index) => ({ key: index, ...data })) || []
  ), [groupScheduleData]);

  const subjectsDataSource = useMemo(() => (
    groupSubjectsData.map((data, index) => ({ key: index, ...data })) || []
  ), [groupSubjectsData]);

  return (
    <Layout>
      <Helmet title={t('schedule.edit.title') as string} />
      <div className="substrate schedules-table">
        <Table
          columns={columns}
          dataSource={schedulesDataSource}
          pagination={false}
          showHeader={false}
          loading={isLoading}
          caption={(
            <div className="table-title">
              <span className="title">
                <Trans i18nKey="schedule.edit.title" />
              </span>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditType(ScheduleEditType.addNew);
                  setSchedule(null);
                  setDrawerOpen(true);
                }}
              >
                <span><Trans i18nKey="schedule.edit.add_schedule" /></span>
              </Button>
            </div>
          )}
        />
        <Drawer
          title={schedule
            ? t(
              'schedule.edit.edit_schedule',
              { schedule: groupScheduleData.find((item) => item.id === schedule)?.week },
            ) : t('schedule.edit.add_schedule')}
          placement="right"
          closable
          onClose={() => {
            setDrawerOpen(false);
            setEditType(null);
            setSchedule(null);
            setEditScheduleSubjectId(null);
            setAddScheduleSubjectId(null);
          }}
          open={drawerOpen}
        >
          {(editType === ScheduleEditType.addNew || editType === ScheduleEditType.editMeta) ? (
            <Form
              onFinish={onSave}
              layout="vertical"
              requiredMark={false}
            >
              <Form.Item
                label={t('schedule.edit.week')}
                name="week"
                rules={[{
                  required: true,
                  message: t('schedule.edit.messages.input_valid_week') as string,
                  type: 'number',
                }]}
              >
                <InputNumber
                  min={1}
                  max={52}
                  placeholder={t('schedule.edit.description_placeholder') as string}
                />
              </Form.Item>
              <Form.Item
                label={t('schedule.edit.description')}
                name="description"
                rules={[{
                  required: true,
                  message: t('schedule.edit.messages.input_description') as string,
                }]}
              >
                <Input
                  minLength={1}
                  maxLength={255}
                  placeholder={t('schedule.edit.description_placeholder') as string}
                />
              </Form.Item>
              <Button type="primary" htmlType="submit" className="button-main">
                <span><Trans i18nKey="common.buttons.submit" /></span>
              </Button>
            </Form>
          ) : editType === ScheduleEditType.editSubjects ? (
            <div className="edit-subjects subject-table">
              <Semester semester={semester} setSemester={setSemester} />
              <Table
                columns={subjectsColumns}
                dataSource={subjectsDataSource}
                pagination={false}
                showHeader={false}
                loading={isLoading}
              />
            </div>
          ) : null}
        </Drawer>
      </div>
    </Layout>
  );
}
