import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Empty } from 'antd';
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
import Layout from '@/components/mobile/Layout';
import ListItem from '@/components/mobile/ListItem';
import Semester from '@/components/common/Semester';
import SubjectData from '@/components/common/SubjectData';
import { getUserRecordBook } from '@/store/actions/users';
import { colorsRange, colorsRangeLight } from '@/constants/recordBook';
import {
  yearToSemester,
  toMark5,
  toMarkEcts,
  getProfessorName,
} from '@/helpers/utils';
import './index.scss';

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  borderRadius: 6,
  borderWidth: 1,
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
    y: {
      min: 0,
      max: 100,
    },
  },
};

export default function RecordBook() {
  // noinspection DuplicatedCode
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

  // noinspection DuplicatedCode
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

  const marksLength = useMemo(() => recordBookData?.filter((data) => Number(data.mark)).length || 0, [recordBookData]);

  return (
    <Layout>
      <Helmet title={t('common.menu.record_book') as string} />
      <div className="substrate subject-table">
        <div className="table-title">
          <span className="title">
            <Trans i18nKey="common.menu.record_book" />
          </span>
          <Semester semester={semester} setSemester={setSemester} />
        </div>
        <div className="mobile-list">
          {isLoading && ([...Array(5)].map((value) => (
            <Skeleton active key={value} />
          )))}
          {!isLoading && !recordBookData?.length && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
          {!isLoading && recordBookData?.map((record) => (
            <ListItem
              key={record.id}
              column
              title={(
                <SubjectData
                  title={record.syllabus.subject.title}
                  professor={getProfessorName(record.syllabus.subject)}
                  department={record.syllabus.subject.department?.name}
                />
              )}
              value={(
                <div className="subject-data">
                  <div className="item">
                    <span className="title">{`📊 ${t('record_book.credits')}`}</span>
                    <span className="value">{record.syllabus.credit}</span>
                  </div>
                  <div className="item">
                    <span className="title">{`✏️ ${t('record_book.control')}`}</span>
                    <span className="value">
                      {`${
                        record.syllabus.control ? t(`record_book.${record.syllabus.control}`) : '-'
                      }, ${
                        record.syllabus.individual_task ? t(`record_book.${record.syllabus.individual_task}`) : '-'
                      }`}
                    </span>
                  </div>
                  <div className="item">
                    <span className="title">{`✅ ${t('record_book.mark')}`}</span>
                    {record.debt_date ? (
                      <div className="debt">
                        <WarningOutlined />
                        <span className="debt-text"><Trans i18nKey="record_book.debt" /></span>
                        <WarningOutlined />
                      </div>
                    ) : (
                      <span className="value">
                        {`${record.mark} ${toMark5(record.mark)}${toMarkEcts(record.mark)}`}
                      </span>
                    )}
                  </div>
                </div>
              )}
            />
          ))}
        </div>
      </div>
      {isChartRegistered && marksLength > 4 && (
        <div className="substrate record-book-charts">
          <div className="chart">
            <Bar data={markChart} options={chartOptions} />
            <div className="mark-labels">
              {recordBookData?.filter((data) => Number(data.mark)).map((data, index) => (
                <span
                  className="mark"
                  key={data.id}
                  style={{ marginTop: `${(100 - data.mark) * 2.3 - 12}px`, color: colorsMain[0][index] }}
                >
                  {data.mark}
                </span>
              ))}
            </div>
            <div className="title-labels" style={marksLength < 8 ? { left: `-${(8 - marksLength) * 10}px` } : {}}>
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
