import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { TELEGRAM_BOT_URL } from '@/config';
import './index.scss';

export default function AboutModal(
  { open, setOpen }: { open: boolean, setOpen: (open: boolean) => void },
) {
  useTranslation('about');

  return (
    <Modal
      open={open}
      destroyOnClose
      onCancel={() => setOpen(false)}
      footer={null}
    >
      <div>
        <span>
          <Trans
            ns="about"
            i18nKey="content"
            components={{
              p: <p />,
              bot_link: <Link to={TELEGRAM_BOT_URL} target="_blank" />,
              privacy_link: <Link to="/privacy" />,
            }}
          />
        </span>
      </div>
    </Modal>
  );
}
