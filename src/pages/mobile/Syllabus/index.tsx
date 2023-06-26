import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Empty, Skeleton } from 'antd';
import { Helmet } from 'react-helmet';
import { Chart, ArcElement, Tooltip as ChartTooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import chroma from 'chroma-js';
import { useTranslation, Trans } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/mobile/Layout';
import ListItem from '@/components/mobile/ListItem';
import Semester from '@/components/common/Semester';
import SubjectData from '@/components/common/SubjectData';
import { getUserSyllabus } from '@/store/actions/users';
import { yearToSemester, getProfessorName } from '@/helpers/utils';
import './index.scss';

const chartOptions = {
  maintainAspectRatio: false,
  cutout: '83%',
  responsive: true,
  borderRadius: 99,
  borderWidth: 0,
  spacing: 10,
};

// noinspection DuplicatedCode
const colorWheel = (length: number, s: number, l: number, a: number) => {
  const totalHues = 360;
  const endHue = totalHues - totalHues / length;
  const hue1 = 0;
  const hue2 = endHue / 3;
  const hue3 = (endHue * 2) / 3;
  const colors = [
    chroma.hsl(hue1, s, l, a),
    chroma.hsl(hue2, s, l, a),
    chroma.hsl(hue3, s, l, a),
    chroma.hsl(endHue, s, l, a),
  ];
  return chroma.scale(colors).mode('hsl').colors(length);
};

export default function Rating() {
  // noinspection DuplicatedCode
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoading: boolean = useSelector((state: any) => state.syllabusReducer.isLoading);
  const syllabusData: Syllabus[] = useSelector((state: any) => state.syllabusReducer.syllabus);

  const [semester, setSemester] = useState(yearToSemester(profileData?.year ?? 0));
  const [isChartRegistered, setIsChartRegistered] = useState(false);

  useEffect(() => {
    Chart.register(ArcElement, ChartTooltip);
    setIsChartRegistered(true);
    return () => {
      Chart.unregister(ArcElement, ChartTooltip);
    };
  }, []);

  useEffect(() => {
    if (profileData) {
      setSemester(yearToSemester(profileData.year));
    }
  }, [profileData]);

  useEffect(() => {
    if (semester) {
      dispatch(getUserSyllabus({ user: profileData.id, semester }));
    }
  }, [semester]);

  const colorsMain = useMemo(() => [
    colorWheel(syllabusData.length, 1, 0.5, 0.6),
    colorWheel(syllabusData.length, 0.5, 0.2, 1),
  ], [syllabusData]);

  // noinspection DuplicatedCode
  const creditsChart = useMemo(() => ({
    labels: syllabusData?.filter((data) => Number(data.credit)).map((data) => data.subject.title),
    datasets: [
      {
        label: t('syllabus.credits'),
        data: syllabusData?.filter((data) => Number(data.credit)).map((data) => data.credit),
        backgroundColor: colorsMain[0],
        borderColor: colorsMain[1],
      },
    ],
  }), [syllabusData, colorsMain, t]);

  const hoursChart = useMemo(() => ({
    labels: syllabusData?.filter((data) => Number(data.hours)).map((data) => data.subject.title),
    datasets: [
      {
        label: t('syllabus.hours'),
        data: syllabusData?.filter((data) => Number(data.hours)).map((data) => data.hours),
        backgroundColor: colorsMain[0],
        borderColor: colorsMain[1],
      },
    ],
  }), [syllabusData, colorsMain, t]);

  return (
    <Layout>
      <Helmet title={t('common.menu.syllabus') as string} />
      <div className="substrate subject-table">
        <div className="table-title">
          <span className="title">
            <Trans i18nKey="common.menu.syllabus" />
          </span>
          <Semester semester={semester} setSemester={setSemester} />
        </div>
        <div className="mobile-list">
          {isLoading && ([...Array(5)].map((value) => (
            <Skeleton active key={value} />
          )))}
          {!isLoading && !syllabusData?.length && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
          {!isLoading && syllabusData?.map((record) => (
            <ListItem
              key={record.id}
              column
              title={(
                <SubjectData
                  title={record.subject.title}
                  professor={getProfessorName(record.subject)}
                  department={record.subject.department?.name}
                />
              )}
              value={(
                <div className="subject-data">
                  <div className="item">
                    <span className="title">{`📊 ${t('syllabus.credits')}`}</span>
                    <span className="value">{record.credit}</span>
                  </div>
                  <div className="item">
                    <span className="title">{`✏️ ${t('syllabus.control')}`}</span>
                    <span className="value">
                      {`${
                        record.control ? t(`syllabus.${record.control}`) : '-'
                      }, ${
                        record.individual_task ? t(`syllabus.${record.individual_task}`) : '-'
                      }`}
                    </span>
                  </div>
                  <div className="item">
                    <span className="title">{`⏰ ${t('syllabus.hours')}`}</span>
                    <span className="value">{record.hours}</span>
                  </div>
                </div>
              )}
            />
          ))}
        </div>
      </div>
      {isChartRegistered && (
        <div className="substrate syllabus-charts">
          <div className="legend">
            {syllabusData?.map((data, index) => (
              <div className="legend-item" key={data.subject.id}>
                <div className="legend-color" style={{ backgroundColor: colorsMain[0][index] }} />
                <span className="legend-name">{data.subject.title}</span>
              </div>
            ))}
          </div>
          <div className="charts-col">
            <div className="chart">
              <span className="chart-title">
                <Trans i18nKey="syllabus.credits" />
              </span>
              <div>
                <Doughnut data={creditsChart} options={chartOptions} />
              </div>
            </div>
            <div className="chart">
              <span className="chart-title">
                <Trans i18nKey="syllabus.hours" />
              </span>
              <div>
                <Doughnut data={hoursChart} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
