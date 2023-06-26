import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Empty } from 'antd';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import { useTranslation, Trans } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/mobile/Layout';
import ListItem from '@/components/mobile/ListItem';
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

  return (
    <Layout>
      <Helmet title={t('common.menu.contract') as string} />
      <div className="mobile-title">
        <span><Trans i18nKey="common.menu.contract" /></span>
      </div>
      <div className="substrate contract-data">
        <div className="mobile-list no-mg">
          {isLoading && <Skeleton active paragraph={{ rows: 1 }} />}
          {!isLoading && (
            <ListItem
              column
              title={(
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
              )}
              value={(
                <div className="subject-data">
                  <div className="item">
                    <span className="title"><Trans i18nKey="contract.current_price_short" /></span>
                    <span className="value">{contractData?.price}</span>
                  </div>
                  <div className="item">
                    <span className="title"><Trans i18nKey="contract.total_paid_short" /></span>
                    <span className="value">{contractData?.total}</span>
                  </div>
                </div>
              )}
            />
          )}
        </div>
      </div>
      <div className="substrate">
        <div className="mobile-list no-mg">
          {isLoading && ([...Array(5)].map((value) => (
            <Skeleton active key={value} />
          )))}
          {!isLoading && !contractData?.payments.length && (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
          {!isLoading && contractData?.payments.map((record) => (
            <ListItem
              key={record.id}
              column
              title={(
                <span>{format(new Date(record.created_at), dateFormat)}</span>
              )}
              value={(
                <div className="subject-data">
                  <div className="item">
                    <span className="title">{`🎓 ${t('contract.semester')}`}</span>
                    <span className="value">{record.semester}</span>
                  </div>
                  <div className="item">
                    <span className="title">{`💰 ${t('contract.amount')}`}</span>
                    <span className="value">{formatPrice(record.amount)}</span>
                  </div>
                  <div className="item">
                    <span className="title">{`📝 ${t('contract.id')}`}</span>
                    <span className="value">{record.id}</span>
                  </div>
                </div>
              )}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}
