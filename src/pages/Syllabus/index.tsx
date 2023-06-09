import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Helmet } from 'react-helmet';
import { Chart, ArcElement, Tooltip as ChartTooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import chroma from 'chroma-js';
import { useTranslation, Trans } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/Layout';
import Semester from '@/components/Semester';
import SubjectData from '@/components/SubjectData';
import { getUserSyllabus } from '@/store/actions/users';
import { yearToSemester, getProfessorName } from '@/helpers/utils';
import './index.scss';

const chartOptions = {
  maintainAspectRatio: false,
  cutout: '83%',
  responsive: true,
  borderRadius: 99,
  borderWidth: 0,
  spacing: 20,
};

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
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoading: boolean = useSelector((state: any) => state.syllabusReducer.isLoading);
  const syllabusData: Syllabus[] = useSelector((state: any) => state.syllabusReducer.syllabus);

  const [semester, setSemester] = useState(yearToSemester(profileData?.year ?? 0));

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

  if (!Object.keys(Chart.instances).length) {
    Chart.register(ArcElement, ChartTooltip);
  }

  const syllabusDataSource = useMemo(() => (
    syllabusData?.map((data, index) => ({ key: index, ...data }))
  ), [syllabusData]);

  const colorsMain = useMemo(() => [
    colorWheel(syllabusData.length, 1, 0.5, 0.6),
    colorWheel(syllabusData.length, 0.5, 0.2, 1),
  ], [syllabusData]);

  const colorsMono = useMemo(() => [
    chroma.scale(['rgba(80,80,80,0.6)', 'rgba(180,180,180,0.6)']).colors(2),
    chroma.scale(['rgb(80,80,80)', 'rgb(180,180,180)']).colors(2),
  ], [syllabusData]);

  const creditsChart = useMemo(() => ({
    labels: syllabusData?.filter((data) => Number(data.credit)).map((data) => data.subject.title),
    datasets: [
      {
        label: t('syllabus.credits'),
        data: syllabusData?.filter((data) => Number(data.credit)).map((data) => data.credit),
        backgroundColor: colorsMain[0],
        borderColor: colorsMain[1],
        borderWidth: 1,
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
        borderWidth: 1,
      },
    ],
  }), [syllabusData, colorsMain, t]);

  const controlChart = useMemo(() => ({
    labels: [t('syllabus.exam'), t('syllabus.credit')],
    datasets: [
      {
        label: t('syllabus.control'),
        data: [syllabusData?.filter((data) => data.control === 'exam').length,
          syllabusData?.filter((data) => data.control === 'credit').length],
        backgroundColor: colorsMono[0],
        borderColor: colorsMono[1],
        borderWidth: 1,
      },
    ],
  }), [syllabusData, colorsMain, t]);

  const syllabusColumns: ColumnsType<Syllabus> = useMemo(() => [
    {
      key: 'subject',
      dataIndex: 'subject',
      title: t('syllabus.subject'),
      render: (value, record, index) => (
        <SubjectData
          title={record.subject.title}
          professor={getProfessorName(record.subject)}
          department={record.subject.department?.name}
          color={colorsMain[0][index]}
        />
      ),
      sorter: (a, b) => a.subject.title.localeCompare(b.subject.title),
    },
    {
      key: 'credit',
      dataIndex: 'credit',
      title: t('syllabus.credits'),
      render: (value, record) => (
        <span>{record.credit}</span>
      ),
      sorter: (a, b) => a.credit.localeCompare(b.credit),
    },
    {
      key: 'control',
      dataIndex: 'control',
      title: t('syllabus.control'),
      render: (value, record) => (
        <div className="row-data e-c">
          <span>{record.control ? t(`syllabus.${record.control}`) : '-'}</span>
          <span>{record.individual_task ? t(`syllabus.${record.individual_task}`) : '-'}</span>
        </div>
      ),
      sorter: (a, b) => a.control.localeCompare(b.control),
    },
    {
      key: 'hours',
      dataIndex: 'hours',
      title: t('syllabus.hours'),
      render: (value, record) => (
        <span>{record.hours}</span>
      ),
      sorter: (a, b) => a.hours.localeCompare(b.hours),
    },
  ], [t, colorsMain]);

  return (
    <Layout>
      <Helmet title={t('common.menu.syllabus') as string} />
      <div className="substrate subject-table">
        <Table
          columns={syllabusColumns}
          dataSource={syllabusDataSource}
          pagination={false}
          showSorterTooltip={false}
          loading={isLoading}
          size="small"
          caption={(
            <div className="table-title">
              <span className="title">
                <Trans i18nKey="common.menu.syllabus" />
              </span>
              <Semester semester={semester} setSemester={setSemester} />
            </div>
          )}
        />
      </div>
      <div className="substrate charts">
        <div className="legend">
          {syllabusData?.map((data, index) => (
            <div className="legend-item" key={data.subject.id}>
              <div className="legend-color" style={{ backgroundColor: colorsMain[0][index] }} />
              <span className="legend-name">{data.subject.title}</span>
            </div>
          ))}
        </div>
        <div className="chart">
          <span className="chart-title">
            <Trans i18nKey="syllabus.credits" />
          </span>
          <div>
            <Doughnut data={creditsChart} height={300} options={chartOptions} />
          </div>
        </div>
        <div className="chart">
          <span className="chart-title">
            <Trans i18nKey="syllabus.hours" />
          </span>
          <div>
            <Doughnut data={hoursChart} height={300} options={chartOptions} />
          </div>
        </div>
        <div className="chart">
          <span className="chart-title">
            <Trans i18nKey="syllabus.control" />
          </span>
          <div>
            <Doughnut data={controlChart} height={300} options={chartOptions} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
