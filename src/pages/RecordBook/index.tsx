import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Helmet } from 'react-helmet';
import {
  Chart,
  ArcElement,
  Tooltip as ChartTooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import chroma from 'chroma-js';
import { WarningOutlined } from '@ant-design/icons';
import { useTranslation, Trans } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/Layout';
import Semester from '@/components/Semester';
import SubjectData from '@/components/SubjectData';
import { getUserRecordBook } from '@/store/actions/users';
import { colorsRange, colorsRangeLight } from '@/constants/recordBook';
import {
  yearToSemester,
  toMark5,
  toMarkNational,
  toMarkEcts,
  formatDate,
  getProfessorName,
} from '@/helpers/utils';
import './index.scss';

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  borderRadius: 15,
  borderWidth: 3,
  barPercentage: 0.65,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      display: false,
    },
  },
};

export default function RecordBook() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoading: boolean = useSelector((state: any) => state.recordBookReducer.isLoading);
  const recordBookData: RecordBook[] = useSelector((state: any) => state.recordBookReducer.recordBook);

  const [semester, setSemester] = useState(yearToSemester(profileData?.year ?? 0, true));
  const [isChartRegistered, setIsChartRegistered] = useState(false);

  useEffect(() => {
    Chart.register(ArcElement, ChartTooltip, CategoryScale, LinearScale, BarElement);
    setIsChartRegistered(true);
    return () => {
      Chart.unregister(ArcElement, ChartTooltip, CategoryScale, LinearScale, BarElement);
    };
  }, []);

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

  const colorsMain = useMemo(() => [
    chroma.scale(colorsRange).colors(recordBookData?.length),
    chroma.scale(colorsRangeLight).colors(recordBookData?.length),
  ], [recordBookData]);

  const markChart = useMemo(() => ({
    labels: recordBookData?.filter((data) => Number(data.mark)).map((data) => data.syllabus.subject.title),
    datasets: [
      {
        label: t('record_book.mark'),
        data: recordBookData?.filter((data) => Number(data.mark)).map((data) => data.mark),
        backgroundColor: colorsMain[1],
        borderColor: colorsMain[0],
      },
    ],
  }), [recordBookData, colorsMain, t]);

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
      {isChartRegistered && (
        <div className="substrate record-book-charts">
          <div className="chart">
            <Bar data={markChart} options={chartOptions} />
            <div className="mark-labels">
              {recordBookData?.filter((data) => Number(data.mark)).map((data, index) => (
                <span
                  className="mark"
                  key={data.id}
                  style={{ marginTop: `${(100 - data.mark) * 3.8 - 24}px`, color: colorsMain[0][index] }}
                >
                  {data.mark}
                </span>
              ))}
            </div>
            <div className="title-labels">
              {recordBookData?.filter((data) => Number(data.mark)).map((data, index) => (
                <span
                  className="title"
                  key={data.id}
                  style={{ color: colorsMain[0][index] }}
                >
                  {data.syllabus.subject.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
