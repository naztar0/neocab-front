import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Helmet } from 'react-helmet';
import { useTranslation, Trans } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/desktop/Layout';
import Semester from '@/components/common/Semester';
import UserModal from '@/components/desktop/UserModal';
import {
  getUserProfile,
  getUserRating,
} from '@/store/actions/users';
import {
  yearToSemester,
  toMark5,
  toMarkEcts,
  formatName,
} from '@/helpers/utils';
import './index.scss';

export default function Rating() {
  // noinspection DuplicatedCode
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoading: boolean = useSelector((state: any) => state.ratingReducer.isLoading);
  const ratingData: Rating[] = useSelector((state: any) => state.ratingReducer.rating);
  const userLoading: boolean = useSelector((state: any) => state.userReducer.isLoading);
  const userData: User = useSelector((state: any) => state.userReducer.user);

  const [semester, setSemester] = useState(yearToSemester(profileData?.year ?? 0, true));
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (profileData) {
      setSemester(yearToSemester(profileData.year, true));
    }
  }, [profileData]);

  useEffect(() => {
    if (semester) {
      dispatch(getUserRating({ user: profileData.id, semester }));
    }
  }, [semester]);

  useEffect(() => {
    setTimeout(() => {
      const oldSelectors = document.getElementsByClassName('bg-black-10');
      for (let i = 0; i < oldSelectors.length; i++) {
        oldSelectors[i].classList.remove('bg-black-10');
      }
      const ratingMe = document.getElementsByClassName('student-id');
      for (let i = 0; i < ratingMe.length; i++) {
        if (ratingMe[i].innerHTML === profileData.id.toString()) {
          ratingMe[i].parentElement?.parentElement?.classList.add('bg-black-10');
          ratingMe[i].parentElement?.parentElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }, 750);
  }, [isLoading]);

  const ratingColumns: ColumnsType<Rating> = useMemo(() => [
    {
      key: 'position',
      dataIndex: 'position',
      title: '№',
      render: (_, record, index) => (
        <>
          <span>{index + 1}</span>
          <span className="student-id">{record.user?.id}</span>
        </>
      ),
    },
    {
      key: 'student',
      dataIndex: 'student',
      title: t('rating.student'),
      render: (_, record, index) => {
        const percent = ((index + 1) * 100) / ratingData.length;
        const probability = percent > 50 ? '0%' : (percent > 45 ? t('rating.high_probability') : '100%');
        return (
          <Tooltip
            title={
              record.user?.id === profileData?.id
                ? t('rating.percentage', { percent: percent.toFixed(2), probability })
                : null
            }
            placement="right"
          >
            <div>
              {record.user ? (
                <span>{formatName(record.user)}</span>
              ) : (
                <span>{record.name}</span>
              )}
            </div>
          </Tooltip>
        );
      },
      onCell: (data) => ({
        onClick: () => {
          if (data.user) {
            dispatch(getUserProfile({ user: data.user.id }));
            setModalOpen(true);
          }
        },
      }),
      sorter: (a, b) => (a.user?.last_name ?? a.name).localeCompare(b.user?.last_name ?? b.name),
    },
    {
      key: 'group',
      dataIndex: 'group',
      title: t('rating.group'),
      render: (_, record) => (
        <span>{record.user?.group.name ?? record.group}</span>
      ),
      sorter: (a, b) => (a.user?.group.name ?? a.group).localeCompare(b.user?.group.name ?? b.group),
    },
    {
      key: 'mark_5',
      dataIndex: 'mark_5',
      title: t('rating.national'),
      render: (_, record) => (
        <span>{toMark5(parseFloat(record.mark))}</span>
      ),
      sorter: (a, b) => parseFloat(a.mark) - parseFloat(b.mark),
    },
    {
      key: 'mark_ects',
      dataIndex: 'mark_ects',
      title: t('rating.ects'),
      render: (_, record) => (
        <span>{toMarkEcts(parseFloat(record.mark))}</span>
      ),
      sorter: (a, b) => parseFloat(a.mark) - parseFloat(b.mark),
    },
    {
      dataIndex: 'mark_100',
      key: 'mark_100',
      title: t('rating.mark'),
      render: (_, record) => (
        <Tooltip title={record.comment} placement="left">
          <span>{record.mark}</span>
        </Tooltip>
      ),
      sorter: (a, b) => parseFloat(a.mark) - parseFloat(b.mark),
    },
  ], [ratingData]);

  const ratingDataSource = useMemo(() => (
    ratingData?.map((data, index) => ({ key: index, ...data })) || []
  ), [ratingData]);

  return (
    <Layout>
      <Helmet title={t('common.menu.rating') as string} />
      <div className="substrate subject-table">
        <Table
          columns={ratingColumns}
          dataSource={ratingDataSource}
          pagination={false}
          showSorterTooltip={false}
          loading={isLoading}
          size="small"
          caption={(
            <div className="table-title">
              <span className="title">
                <Trans i18nKey="common.menu.rating" />
              </span>
              <Semester semester={semester} setSemester={setSemester} />
            </div>
          )}
        />
      </div>
      <UserModal
        isLoading={userLoading}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        user={userData}
      />
    </Layout>
  );
}
