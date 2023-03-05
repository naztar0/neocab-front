import React, { SetStateAction, Dispatch } from 'react';
import {
  Skeleton,
  Modal,
} from 'antd';
import Avatar from '@/components/Avatar';
import StudentProfileData from '@/components/StudentProfileData';
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
  const isLoadingLocal = !user || isLoading;

  return (
    <Modal
      open={modalOpen}
      centered
      footer={null}
      onCancel={() => setModalOpen(false)}
      className="user-modal"
    >
      <div className="basic">
        {!isLoadingLocal ? (
          <Avatar
            size={96}
            avatar={user.image}
            username={user.first_name}
            mono
          />
        ) : (
          <Skeleton.Avatar size={96} active />
        )}
        <div className="info">
          {!isLoadingLocal ? (
            <>
              <span className="name">
                {`${user.last_name} ${user.first_name} ${user.middle_name}`}
              </span>
              <span className="role">{user.role}</span>
              <a className="email" href={`mailto:${user.email}`}>{user.email}</a>
            </>
          ) : (
            <Skeleton paragraph={{ rows: 1 }} style={{ width: '250px' }} active />
          )}
        </div>
      </div>
      <StudentProfileData isLoading={isLoadingLocal} user={user} />
    </Modal>
  );
}
