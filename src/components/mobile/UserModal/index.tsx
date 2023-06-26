import React, { SetStateAction, Dispatch } from 'react';
import {
  Skeleton,
  Modal,
} from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import Avatar from '@/components/common/Avatar';
import StudentProfileData from '@/components/mobile/StudentProfileData';
import './index.scss';

interface Props {
  user: User,
  isLoading: boolean,
  modalOpen: boolean,
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function UserModal({
  isLoading, user, modalOpen, setModalOpen,
}: Props) {
  useTranslation();
  const isLoadingLocal = !user || isLoading;

  return (
    <Modal
      open={modalOpen}
      centered
      footer={null}
      onCancel={() => setModalOpen(false)}
      className="user-modal"
    >
      <div className="substrate basic">
        <div className="user-header">
          <div>
            {!isLoadingLocal ? (
              <Avatar
                size={78}
                avatar={user?.image}
                username={user?.first_name}
                mono
              />
            ) : (
              <Skeleton.Avatar size={78} active />
            )}
          </div>
          <div className="info">
            <Skeleton loading={isLoadingLocal} paragraph={{ rows: 1 }} style={{ width: '250px' }} active>
              <span className="name">
                {`${user?.last_name} ${user?.first_name} ${user?.middle_name}`}
              </span>
              <span className="role">
                <Trans i18nKey={`profile.roles.${user?.role}`} />
              </span>
              <a className="email" href={`mailto:${user?.email}`}>{user?.email}</a>
            </Skeleton>
          </div>
        </div>
        <div className="misc">
          <StudentProfileData isLoading={isLoadingLocal} user={user} />
        </div>
      </div>
    </Modal>
  );
}
