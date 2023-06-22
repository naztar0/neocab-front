import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import { Helmet } from 'react-helmet';
import {
  Chart,
  Filler,
  ArcElement,
  Tooltip as ChartTooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ScriptableContext,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { hex } from 'chroma-js';
import { Trans, useTranslation } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/Layout';
import { getUserAcademicPerformance } from '@/store/actions/users';
import {
  yearToSemester,
  semesterToYear,
} from '@/helpers/utils';
import {
  months,
  colorsMain,
  firstMonth,
} from '@/constants/academicPerformance';
import { PaymentType } from '@/constants/profile';
import './index.scss';

const chartOptions1 = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const chartOptions2 = {
  ...chartOptions1,
  animations: {
    tension: {
      duration: 1000,
      from: 0.3,
      to: 0.45,
      loop: true,
      easing: 'linear' as const,
    },
  },
};

const chartOptions3 = {
  ...chartOptions2,
  scales: {
    y: {
      reverse: true,
    },
  },
};

const getGradient = (chartContext: ScriptableContext<'line'> & CanvasRenderingContext2D, color: string) => {
  const { chart } = chartContext;
  const { ctx, chartArea } = chart;
  const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
  gradient.addColorStop(1, hex(color).alpha(0.25).css());
  gradient.addColorStop(0.5, hex(color).alpha(0.1).css());
  gradient.addColorStop(0.025, hex(color).alpha(0).css());
  return gradient;
};

export default function AcademicPerformance() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoading: boolean = useSelector((state: any) => state.academicPerformanceReducer.isLoading);
  const academicPerformanceData: AcademicPerformance = useSelector(
    (state: any) => state.academicPerformanceReducer.data,
  );

  const [semester, setSemester] = useState(yearToSemester(profileData?.year ?? 0));
  const [isChartRegistered, setIsChartRegistered] = useState(false);

  useEffect(() => {
    Chart.register(ArcElement, Filler, ChartTooltip, CategoryScale, LinearScale, PointElement, LineElement);
    setIsChartRegistered(true);
    return () => {
      Chart.unregister(ArcElement, Filler, ChartTooltip, CategoryScale, LinearScale, PointElement, LineElement);
    };
  }, []);

  useEffect(() => {
    if (profileData) {
      setSemester(yearToSemester(profileData.year));
    }
  }, [profileData]);

  useEffect(() => {
    if (semester) {
      dispatch(getUserAcademicPerformance({ user: profileData.id }));
    }
  }, [semester]);

  const semesterToMonthYear = useCallback((sem: number): string => {
    const year = semesterToYear(sem, semester);
    const month = sem % 2 === 0 ? months[4] : months[10];
    return `${t(`common.labels.months.${month}`)} '${year.toString().slice(-2)}`;
  }, [t, semester]);

  const formatMonthDate = useCallback((date: string): string => {
    const [year, month] = date.split('-');
    return `${t(`common.labels.months.${months[Number(month) - 1]}`)} '${year.slice(-2)}`;
  }, [t]);

  const labels = useMemo(() => {
    if (!academicPerformanceData) {
      return [];
    }
    const currentMonth = new Date().getMonth();
    const currentYear = semesterToYear(semester, semester);
    let year = semesterToYear(1, semester);
    const res = [];
    for (let i = firstMonth; !(i > currentMonth && year === currentYear); i++) {
      if (i === 12) {
        i = 0;
        year++;
      }
      res.push(`${t(`common.labels.months.${months[i]}`)} '${year.toString().slice(-2)}`);
    }
    return res;
  }, [academicPerformanceData, t]);

  const attendancesChart = useMemo(() => ({
    labels,
    datasets: [
      {
        label: t('academic_performance.attendances_count'),
        data: academicPerformanceData?.attendances.map((data) => ({
          x: formatMonthDate(data.date),
          y: data.count,
          min: 60,
          max: 100,
        })),
        tension: 0.4,
        backgroundColor: colorsMain[0][0],
        borderColor: colorsMain[0][1],
        fill: {
          target: 'start',
          above: (
            (ctx: ScriptableContext<'line'> & CanvasRenderingContext2D) => getGradient(ctx, colorsMain[0][0])
          ) as any,
        },
      },
    ],
  }), [academicPerformanceData, formatMonthDate, t]);

  const recordBookChart = useMemo(() => ({
    labels,
    datasets: [
      {
        label: t('academic_performance.record_book_average_mark'),
        data: academicPerformanceData?.record_book_marks.map((data) => ({
          x: semesterToMonthYear(data.semester),
          y: data.mark,
          min: 60,
          max: 100,
        })),
        tension: 0.4,
        backgroundColor: colorsMain[0][0],
        borderColor: colorsMain[0][1],
        fill: {
          target: 'start',
          above: (
            (ctx: ScriptableContext<'line'> & CanvasRenderingContext2D) => getGradient(ctx, colorsMain[0][0])
          ) as any,
        },
      },
    ],
  }), [academicPerformanceData, semesterToMonthYear, t]);

  const ratingChart = useMemo(() => ({
    labels,
    datasets: [
      {
        label: t('academic_performance.rating_percentage'),
        data: academicPerformanceData?.rating_marks.map((data) => ({
          x: semesterToMonthYear(data.semester),
          y: data.percentage,
          min: 0,
          max: 100,
        })),
        tension: 0.4,
        backgroundColor: colorsMain[0][0],
        borderColor: colorsMain[0][1],
        fill: {
          target: 'start',
          above: (
            (ctx: ScriptableContext<'line'> & CanvasRenderingContext2D) => getGradient(ctx, colorsMain[0][0])
          ) as any,
        },
      },
      {
        label: t('academic_performance.rating_position'),
        data: academicPerformanceData?.rating_marks.map((data) => ({
          x: semesterToMonthYear(data.semester),
          y: data.position,
        })),
        tension: 0.4,
        backgroundColor: colorsMain[1][0],
        borderColor: colorsMain[1][1],
        fill: {
          target: 'start',
          above: (
            (ctx: ScriptableContext<'line'> & CanvasRenderingContext2D) => getGradient(ctx, colorsMain[1][0])
          ) as any,
        },
      },
    ],
  }), [academicPerformanceData, semesterToMonthYear, t]);

  return (
    <Layout>
      <Helmet title={t('common.menu.academic_performance') as string} />
      {isChartRegistered && (
        <Spin spinning={isLoading} size="large">
          <div className="academic-performance-charts">
            <div className="substrate">
              <span className="title">
                <Trans i18nKey="academic_performance.attendances" />
              </span>
              <div className="chart">
                <Line data={attendancesChart} options={chartOptions2} />
              </div>
            </div>
            <div className="substrate">
              <span className="title">
                <Trans i18nKey="academic_performance.record_book_average_mark" />
              </span>
              <div className="chart">
                <Line data={recordBookChart} options={chartOptions2} />
              </div>
            </div>
            {profileData?.payment === PaymentType.Budget && (
              <div className="substrate">
                <span className="title">
                  <Trans i18nKey="academic_performance.rating_position_and_percentage" />
                </span>
                <div className="chart">
                  <Line data={ratingChart} options={chartOptions3} />
                </div>
              </div>
            )}
          </div>
        </Spin>
      )}
    </Layout>
  );
}
