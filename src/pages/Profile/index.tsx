import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  Skeleton, Button, Upload, UploadProps, message,
} from 'antd';
import { Helmet } from 'react-helmet';
import { AppDispatch } from '@/store/store';
import Layout from '@/components/Layout';
import Avatar from '@/components/Avatar';
import StudentProfileData from '@/components/StudentProfileData';
import { setUserCover } from '@/store/actions/users';
import defaultCover from '@/assets/images/default_cover.jpg';
import { IMAGES_URL } from '@/config';
import './index.scss';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();
  const isLoading: boolean = useSelector((state: any) => state.profileReducer.isLoading);
  const profileData: Profile = useSelector((state: any) => state.profileReducer.profile);
  const isLoadingCover: boolean = useSelector((state: any) => state.coverReducer.isLoading);

  useEffect(() => {
    if (searchParams.get('r')) {
      setSearchParams();
      window.location.reload();
    }
  }, [searchParams]);

  const props: UploadProps = useMemo(() => ({
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isImage) {
        message.error(`${file.name} is not an image file`).then();
      }
      return isImage || Upload.LIST_IGNORE;
    },
    customRequest: (options) => {
      dispatch(setUserCover({ user: profileData.id, image: options.file as File }));
    },
  }), [profileData]);

  return (
    <Layout>
      <Helmet title="Profile" />
      <div className="substrate pd-0">
        <div className="cover">
          {!isLoading ? (
            <img
              src={profileData.cover ? IMAGES_URL + profileData.cover : defaultCover}
              alt="cover"
            />
          ) : (
            <Skeleton.Input active className="skeleton" />
          )}
          <Upload className="upload" {...props}>
            <Button loading={isLoadingCover} disabled={isLoadingCover}>Edit cover</Button>
          </Upload>
        </div>
        <div className="basic">
          <div className="profile-avatar">
            {!isLoading ? (
              <Avatar
                size={160}
                avatar={profileData.image}
                username={profileData.first_name}
                mono
              />
            ) : (
              <Skeleton.Avatar size={160} active />
            )}
          </div>
          <div className="info">
            {!isLoading ? (
              <>
                <span className="name">
                  {`${profileData.last_name} ${profileData.first_name} ${profileData.middle_name}`}
                </span>
                <a className="email" href={`mailto:${profileData.email}`}>{profileData.email}</a>
              </>
            ) : (
              <Skeleton paragraph={{ rows: 1 }} style={{ width: '250px' }} active />
            )}
          </div>
        </div>
      </div>
      <div className="substrate">
        <StudentProfileData isLoading={isLoading} user={profileData} />
      </div>
    </Layout>
  );
}
