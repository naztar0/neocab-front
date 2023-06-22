import React, { useMemo } from 'react';
import { Skeleton } from 'antd';
import * as Icons from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { yearToSemester } from '@/helpers/utils';
import './index.scss';

interface Props {
  isLoading: boolean,
  user: User,
}

export default function StudentProfileData({ isLoading, user }: Props) {
  const { t } = useTranslation();

  const profileRowTitles = useMemo(() => [
    [t('profile.year_semester'), <Icons.CalendarOutlined className="icon" />],
    [t('profile.group'), <Icons.TeamOutlined className="icon" />],
    [t('profile.education_level'), <Icons.BookOutlined className="icon" />],
    [t('profile.form_of_study'), <Icons.EyeOutlined className="icon" />],
    [t('profile.payment_form'), <Icons.DollarOutlined className="icon" />],
  ], [t]);

  const profileRowValues = useMemo(() => (!user ? [] : [
    `${user.year} • ${yearToSemester(user.year)}`,
    user.group.name,
    t(`profile.train_levels.${user.train_level}`),
    t(`profile.train_forms.${user.train_form}`),
    t(`profile.payment_forms.${user.payment}`),
  ]), [user]);

  const profileColTitles = useMemo(() => [
    t('common.divisions.faculty'),
    t('common.divisions.speciality'),
    t('common.divisions.educational_program'),
    t('common.divisions.department'),
    t('common.divisions.specialization'),
  ], [t]);

  const profileColValues = useMemo(() => (!user ? [] : [
    user.group.specialization.department.program.speciality.faculty.name,
    user.group.specialization.department.program.speciality.name,
    user.group.specialization.department.program.name,
    user.group.specialization.department.name,
    user.group.specialization.name,
  ]), [user]);

  return (
    <>
      <div className="student-profile-data col">
        {profileRowTitles.map((title, index) => (
          <div className="item" key={title[0] as string}>
            <Skeleton loading={isLoading} paragraph={{ rows: 1 }} active>
              <div>
                <div className="label">
                  {title[1]}
                  <span className="title">{title[0]}</span>
                </div>
                <span className="value">{profileRowValues[index]}</span>
              </div>
            </Skeleton>
          </div>
        ))}
      </div>
      <div className="student-profile-data row">
        {profileColTitles.map((title, index) => (
          <Skeleton key={title} className="skeleton" loading={isLoading} paragraph={{ rows: 0 }} active>
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
          </Skeleton>
        ))}
      </div>
    </>
  );
}
