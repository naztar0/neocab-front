import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import { useTranslation, Trans } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/desktop/Layout';
import { getUserContract } from '@/store/actions/users';
import { dateFormat, currency, locale } from '@/constants/contract';
import './index.scss';

const formatPrice = (price: number) => (
  new Intl.NumberFormat(locale, { currency, minimumFractionDigits: 0 }).format(price)
) as string;

export default function Contract() {
  // noinspection DuplicatedCode
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoading: boolean = useSelector((state: any) => state.contractReducer.isLoading);
  const contractData: Contract = useSelector((state: any) => state.contractReducer.contract);

  useEffect(() => {
    if (profileData) {
      dispatch(getUserContract({ user: profileData.id }));
    }
  }, [profileData]);

  const contractDataSource = useMemo(() => (
    contractData?.payments.map((data, index) => ({ key: index, ...data }))
  ), [contractData]);

  const contractColumns: ColumnsType<Payment> = useMemo(() => [
    {
      key: 'date',
      dataIndex: 'date',
      title: t('contract.date'),
      render: (value, record) => (
        <span>{format(new Date(record.created_at), dateFormat)}</span>
      ),
      sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    },
    {
      key: 'semester',
      dataIndex: 'semester',
      title: t('contract.semester'),
      render: (value, record) => (
        <span>{record.semester}</span>
      ),
      sorter: (a, b) => a.semester - b.semester,
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      title: t('contract.amount'),
      render: (value, record) => (
        <span>{formatPrice(record.amount)}</span>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: t('contract.id'),
      render: (value, record) => (
        <span>{record.id}</span>
      ),
      sorter: (a, b) => a.id - b.id,
    },
  ], [t]);

  return (
    <Layout>
      <Helmet title={t('common.menu.contract') as string} />
      <div className="substrate contract-data">
        <Skeleton loading={isLoading} active paragraph={{ rows: 1 }}>
          <p>
            <Trans
              i18nKey="contract.current_price"
              components={{ b: <b />, u: <u /> }}
              values={{ price: formatPrice(contractData?.price) }}
            />
          </p>
          <p className="contract-title">
            <Trans
              i18nKey="contract.title"
              components={{
                b: <b />,
                u: <u />,
                id: <span className="help" title={`ID: ${contractData?.id}`} />,
              }}
              values={{
                title: contractData?.title,
                created_at: contractData ? format(new Date(contractData?.created_at), dateFormat) : '',
              }}
            />
          </p>
          <p>
            <Trans
              i18nKey="contract.total_paid"
              components={{ b: <b />, u: <u /> }}
              values={{ total: formatPrice(contractData?.total) }}
            />
          </p>
        </Skeleton>
      </div>
      <div className="substrate contract-table">
        <Table
          columns={contractColumns}
          dataSource={contractDataSource}
          pagination={false}
          showSorterTooltip={false}
          loading={isLoading}
          size="large"
        />
      </div>
    </Layout>
  );
}
