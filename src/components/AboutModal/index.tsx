import React from 'react';
import { Modal } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import './index.scss';

export default function AboutModal(
  { open, setOpen }: { open: boolean, setOpen: (open: boolean) => void },
) {
  useTranslation();

  return (
    <Modal
      open={open}
      destroyOnClose
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <div>
        <span>
          <Trans i18nKey="about.content" />
        </span>
      </div>
    </Modal>
  );
}
