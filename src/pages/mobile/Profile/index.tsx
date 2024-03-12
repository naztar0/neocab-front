import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Layout from '@/components/mobile/Layout';
import Avatar from '@/components/common/Avatar';
import Email from '@/components/common/Email';
import StudentProfileData from '@/components/mobile/StudentProfileData';
import { IMAGES_URL } from '@/config';
import './index.scss';

export default function Profile() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoading: boolean = useSelector((state: any) => state.profileReducer.isLoading);
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);

  useEffect(() => {
    if (searchParams.get('r')) {
      setSearchParams();
      window.location.reload();
    }
  }, [searchParams]);

  return (
    <Layout>
      <Helmet title={t('common.menu.profile') as string} />
      <div className="cover">
        {!isLoading ? (
          <img
            src={profileData?.cover ? `${IMAGES_URL}${profileData?.cover}` : '/images/default_cover.jpg'}
            alt="cover"
          />
        ) : (
          <Skeleton.Input active className="skeleton" />
        )}
      </div>
      <div className="substrate profile basic">
        <div className="profile-avatar">
          {!isLoading ? (
            <Avatar
              size={110}
              avatar={profileData?.image}
              username={profileData?.first_name}
              mono
            />
          ) : (
            <Skeleton.Avatar size={110} active />
          )}
        </div>
        <div className="info">
          <Skeleton loading={isLoading} paragraph={{ rows: 1 }} style={{ width: '250px' }} active>
            <span className="name">
              {`${profileData?.last_name} ${profileData?.first_name}`}
            </span>
            <span className="name">
              {profileData?.middle_name}
            </span>
            <Email email={profileData?.email} copy={false} />
          </Skeleton>
        </div>
        <div className="misc">
          <StudentProfileData isLoading={isLoading} user={profileData} />
        </div>
      </div>
    </Layout>
  );
}
