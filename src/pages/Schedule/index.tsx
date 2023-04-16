import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { Helmet } from 'react-helmet';
import { enUS, ru, uk } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/Layout';
import Calendar from '@/components/Calendar';
import { Language } from '@/constants/settings';
import { ScheduleType } from '@/constants/schedule';
import {
  getGroupSchedules,
  getUserAzureSchedule,
} from '@/store/actions/schedules';
import { setWeek } from '@/store/reducers/schedule';
import './index.scss';

export default function Schedule() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const scheduleType: ScheduleType = useSelector((state: any) => state.scheduleReducer.scheduleType);
  const groupScheduleData: Schedule[] = useSelector((state: any) => state.scheduleReducer.groupSchedule);
  const currLanguage: Language = useSelector((state: any) => state.languageReducer.language);
  const isLoading: boolean = useSelector((state: any) => state.scheduleReducer.isLoading);

  useEffect(() => {
    if (profileData) {
      if (scheduleType === ScheduleType.azure) {
        dispatch(getUserAzureSchedule({ user: profileData.id }));
      } else if (scheduleType === ScheduleType.custom) {
        dispatch(getGroupSchedules({ group: profileData.group_id }));
      }
    }
  }, [profileData, scheduleType]);

  useEffect(() => {
    if (groupScheduleData?.length) {
      dispatch(setWeek(groupScheduleData[0].week));
    }
  }, [groupScheduleData]);

  const locale = useMemo(() => {
    switch (currLanguage) {
      case Language.English:
        return enUS;
      case Language.Russian:
        return ru;
      case Language.Ukrainian:
        return uk;
      default:
        return uk;
    }
  }, [currLanguage]);

  return (
    <Layout>
      <Helmet title={t('common.menu.schedule')} />
      <div className="substrate subject-table">
        <Spin spinning={isLoading} size="large">
          <Calendar locale={locale} />
        </Spin>
      </div>
    </Layout>
  );
}
