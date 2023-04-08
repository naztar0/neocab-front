import React from 'react';
import {
  Select,
  Button,
  Form,
  TimePicker,
  Input,
  Popover,
} from 'antd';
import {
  DeleteOutlined,
  SaveOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  dayNames,
  timeFormat,
} from '@/constants/schedule';
import './index.scss';

type ScheduleSubjectEditProps = {
  editScheduleSubjectId: number | null;
  scheduleSubject: ScheduleSubject | null;
  onChange: (value: any) => void;
  onSave: (values: any) => void;
  onDelete: (value: any) => void;
};

export default function ScheduleSubjectEdit({
  editScheduleSubjectId, scheduleSubject, onChange, onSave, onDelete,
}: ScheduleSubjectEditProps) {
  return (
    <Form
      className="date-time"
      onFinish={onSave}
      layout="horizontal"
      requiredMark={false}
      initialValues={{
        time: dayjs(scheduleSubject?.time || '00:00', timeFormat),
        day: scheduleSubject?.day || 1,
        notes: scheduleSubject?.notes || null,
      }}
    >
      <Popover
        trigger="click"
        placement="left"
        content={(
          <Form.Item name="notes" noStyle>
            <Input
              className="notes"
              placeholder="Type any notes"
              onChange={() => onChange({ subject: scheduleSubject?.id })}
            />
          </Form.Item>
        )}
      >
        <Button
          shape="circle"
          type="ghost"
          className="notes-btn"
          icon={<MessageOutlined />}
        />
      </Popover>
      <Form.Item name="time" noStyle>
        <TimePicker
          className="time"
          placeholder="Time"
          format={timeFormat}
          minuteStep={5}
          onChange={() => onChange({ subject: scheduleSubject?.id })}
        />
      </Form.Item>
      <Form.Item name="day" noStyle>
        <Select
          className="day"
          onChange={() => onChange({ subject: scheduleSubject?.id })}
        >
          {dayNames.map((day, index) => (
            <Select.Option value={index + 1} key={day}>{day}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      {editScheduleSubjectId === scheduleSubject?.id || !scheduleSubject ? (
        <Button
          shape="circle"
          type="ghost"
          icon={<SaveOutlined />}
          htmlType="submit"
        />
      ) : (
        <Button
          shape="circle"
          type="ghost"
          icon={<DeleteOutlined />}
          onClick={() => onDelete(scheduleSubject?.id)}
        />
      )}
    </Form>
  );
}
