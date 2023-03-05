import React from 'react';
import { Skeleton } from 'antd';
import * as Icons from '@ant-design/icons';
import { yearToSemester } from '@/helpers/utils';
import './index.scss';

interface Props {
  isLoading: boolean,
  user: User,
}

export default function StudentProfileData({ isLoading, user }: Props) {
  const profileRowTitles = [
    ['Year • Semester', <Icons.CalendarOutlined className="icon" />],
    ['Group', <Icons.TeamOutlined className="icon" />],
    ['Education level', <Icons.BookOutlined className="icon" />],
    ['Form of study', <Icons.EyeOutlined className="icon" />],
    ['Payment form', <Icons.DollarOutlined className="icon" />],
  ];

  const profileRowValues = !user ? [] : [
    `${user.year} • ${yearToSemester(user.year)}`,
    user.group.name,
    user.train_level,
    user.train_form,
    user.payment,
  ];

  const profileColTitles = [
    'Faculty',
    'Speciality',
    'Educational program',
    'Department',
    'Specialization',
  ];

  const profileColValues = !user ? [] : [
    user.group.specialization.department.program.speciality.faculty.name,
    user.group.specialization.department.program.speciality.name,
    user.group.specialization.department.program.name,
    user.group.specialization.department.name,
    user.group.specialization.name,
  ];

  return (
    <>
      <div className="student-profile-data col">
        {profileRowTitles.map((title, index) => (
          <div className="item" key={title[0] as string}>
            {!isLoading ? (
              <div>
                <div className="label">
                  {title[1]}
                  <span className="title">{title[0]}</span>
                </div>
                <span className="value">{profileRowValues[index]}</span>
              </div>
            ) : (
              <Skeleton paragraph={{ rows: 1 }} active />
            )}
          </div>
        ))}
      </div>
      <div className="student-profile-data row">
        {profileColTitles.map((title, index) => (
          !isLoading ? (
            <div className="item" key={title}>
              <div>
                <div className="title">
                  <span>{title}</span>
                </div>
                <div className="value">
                  <span>{profileColValues[index]}</span>
                </div>
              </div>
            </div>
          ) : (
            <Skeleton key={title} paragraph={{ rows: 0 }} active style={!index ? { marginTop: '20px' } : {}} />
          )))}
      </div>
    </>
  );
}
