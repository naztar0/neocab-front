import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Helmet } from 'react-helmet';
import { WarningOutlined } from '@ant-design/icons';
import { useTranslation, Trans } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/Layout';
import Semester from '@/components/Semester';
import SubjectData from '@/components/SubjectData';
import { getUserRecordBook } from '@/store/actions/users';
import {
  yearToSemester,
  toMark5,
  toMarkNational,
  toMarkEcts,
  formatDate,
  getProfessorName,
} from '@/helpers/utils';
import './index.scss';

export default function RecordBook() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoading: boolean = useSelector((state: any) => state.recordBookReducer.isLoading);
  const recordBookData: RecordBook[] = useSelector((state: any) => state.recordBookReducer.recordBook);

  const [semester, setSemester] = useState(yearToSemester(profileData?.year ?? 0, true));

  useEffect(() => {
    if (profileData) {
      setSemester(yearToSemester(profileData.year, true));
    }
  }, [profileData]);

  useEffect(() => {
    if (semester) {
      dispatch(getUserRecordBook({ user: profileData.id, semester }));
    }
  }, [semester]);

  const rbColumns: ColumnsType<RecordBook> = useMemo(() => [
    {
      key: 'subject',
      dataIndex: 'subject',
      title: t('record_book.subject'),
      render: (value, record) => (
        <SubjectData
          title={record.syllabus.subject.title}
          professor={getProfessorName(record.syllabus.subject)}
          department={record.syllabus.subject.department?.name}
        />
      ),
      sorter: (a, b) => a.syllabus.subject.title.localeCompare(b.syllabus.subject.title),
    },
    {
      key: 'credit',
      dataIndex: 'credit',
      title: t('record_book.credits'),
      render: (value, record) => (
        <span>{record.syllabus.credit}</span>
      ),
      sorter: (a, b) => parseFloat(a.syllabus.credit) - parseFloat(b.syllabus.credit),
    },
    {
      key: 'control',
      dataIndex: 'control',
      title: t('record_book.control'),
      render: (value, record) => (
        <div className="row-data e-c">
          <span>{record.syllabus.control ? t(`record_book.${record.syllabus.control}`) : '-'}</span>
          <span>{record.syllabus.individual_task ? t(`record_book.${record.syllabus.individual_task}`) : '-'}</span>
        </div>
      ),
      sorter: (a, b) => a.syllabus.control.localeCompare(b.syllabus.control),
    },
    {
      key: 'mark_5',
      dataIndex: 'mark_5',
      title: t('record_book.national'),
      render: (value, record) => (
        record.debt_date ? (
          <span className="debt"><WarningOutlined /></span>
        ) : (
          <Tooltip title={t(`record_book.marks.${toMarkNational(record.mark)}`)} placement="top">
            <span>{toMark5(record.mark)}</span>
          </Tooltip>
        )
      ),
      sorter: (a, b) => a.mark - b.mark,
    },
    {
      dataIndex: 'mark_100',
      key: 'mark_100',
      title: t('record_book.mark'),
      render: (value, record) => (
        record.debt_date ? (
          <Tooltip title={formatDate(record.debt_date)} placement="top">
            <span className="debt"><Trans i18nKey="record_book.debt" /></span>
          </Tooltip>
        ) : (
          <Tooltip title={t(`record_book.marks.${toMarkNational(record.mark)}`)} placement="top">
            <span>{record.mark}</span>
          </Tooltip>
        )
      ),
      sorter: (a, b) => a.mark - b.mark,
    },
    {
      key: 'mark_ects',
      dataIndex: 'mark_ects',
      title: t('record_book.ects'),
      render: (value, record) => (
        record.debt_date ? (
          <span className="debt"><WarningOutlined /></span>
        ) : (
          <Tooltip title={t(`record_book.marks.${toMarkNational(record.mark)}`)} placement="top">
            <span>{toMarkEcts(record.mark)}</span>
          </Tooltip>
        )
      ),
      sorter: (a, b) => a.mark - b.mark,
    },
  ], [t]);

  const rbDataSource = useMemo(() => (
    recordBookData.map((data, index) => ({ key: index, ...data })) || []
  ), [recordBookData]);

  return (
    <Layout>
      <Helmet title={t('common.menu.record_book') as string} />
      <div className="substrate subject-table">
        <Table
          columns={rbColumns}
          dataSource={rbDataSource}
          pagination={false}
          showSorterTooltip={false}
          loading={isLoading}
          caption={(
            <div className="table-title">
              <span className="title">
                <Trans i18nKey="common.menu.record_book" />
              </span>
              <Semester semester={semester} setSemester={setSemester} />
            </div>
          )}
        />
      </div>
    </Layout>
  );
}
