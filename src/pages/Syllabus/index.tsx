import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Helmet } from 'react-helmet';
import { Chart, ArcElement, Tooltip as ChartTooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
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
  spacing: 20,
};

export default function Rating() {
  const dispatch = useDispatch<AppDispatch>();
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

  const syllabusColumns: ColumnsType<Syllabus> = useMemo(() => [
    {
      key: 'subject',
      dataIndex: 'subject',
      title: 'Subject',
      render: (value, record) => (
        <SubjectData
          title={record.subject.title}
          professor={getProfessorName(record.subject)}
          department={record.subject.department?.name}
        />
      ),
      sorter: (a, b) => a.subject.title.localeCompare(b.subject.title),
    },
    {
      key: 'credit',
      dataIndex: 'credit',
      title: 'Credit',
      render: (value, record) => (
        <span>{record.credit}</span>
      ),
      sorter: (a, b) => a.credit.localeCompare(b.credit),
    },
    {
      key: 'control',
      dataIndex: 'control',
      title: 'E/C',
      render: (value, record) => (
        <div className="row-data e-c">
          <span>{record.control || '-'}</span>
          <span>{record.individual_task || '-'}</span>
        </div>
      ),
      sorter: (a, b) => a.control.localeCompare(b.control),
    },
    {
      key: 'hours',
      dataIndex: 'hours',
      title: 'Hours',
      render: (value, record) => (
        <span>{record.hours}</span>
      ),
      sorter: (a, b) => a.hours.localeCompare(b.hours),
    },
  ], []);

  const syllabusDataSource = useMemo(() => (
    syllabusData?.map((data, index) => ({ key: index, ...data }))
  ), [syllabusData]);

  const colors1: string[] = useMemo(() => {
    const colors: string[] = [];
    for (let i = 0; i < syllabusData.length; i++) {
      colors.push(`hsl(${(i * 360) / syllabusData.length}deg 100% 50% / 60%)`);
    }
    return colors;
  }, [syllabusData]);

  const colors2: string[] = useMemo(() => {
    const colors: string[] = [];
    for (let i = 0; i < syllabusData.length; i++) {
      colors.push(`hsl(${(i * 360) / syllabusData.length}, 50%, 20%)`);
    }
    return colors;
  }, [syllabusData]);

  const creditsChart = useMemo(() => ({
    labels: syllabusData?.map((data) => data.subject.title),
    datasets: [
      {
        label: 'Credits',
        data: syllabusData?.map((data) => data.credit),
        backgroundColor: colors1,
        borderColor: colors2,
        borderWidth: 1,
      },
    ],
  }), [syllabusData, colors1, colors2]);

  const hoursChart = useMemo(() => ({
    labels: syllabusData?.map((data) => data.subject.title),
    datasets: [
      {
        label: 'Hours',
        data: syllabusData?.map((data) => data.hours),
        backgroundColor: colors1,
        borderColor: colors2,
        borderWidth: 1,
      },
    ],
  }), [syllabusData, colors1, colors2]);

  return (
    <Layout>
      <Helmet title="Syllabus" />
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
              <span className="title">Syllabus</span>
              <Semester semester={semester} setSemester={setSemester} />
            </div>
          )}
        />
      </div>
      <div className="substrate charts">
        <div className="legend">
          {syllabusData?.map((data, index) => (
            <div className="legend-item" key={data.subject.id}>
              <div className="legend-color" style={{ backgroundColor: colors1[index] }} />
              <span className="legend-name">{data.subject.title}</span>
            </div>
          ))}
        </div>
        <div className="chart">
          <span className="chart-title">Credits</span>
          <div>
            <Doughnut data={creditsChart} height={300} options={chartOptions} />
          </div>
        </div>
        <div className="chart">
          <span className="chart-title">Hours</span>
          <div>
            <Doughnut data={hoursChart} height={300} options={chartOptions} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
