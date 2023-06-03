import React from 'react';
import { Button } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import { TELEGRAM_BOT_URL } from '@/config';
import { ReactComponent as Logo } from '@/assets/images/logo.svg';
import './index.scss';

export default function Unsupported() {
  useTranslation();

  return (
    <div className="unsupported-container">
      <Logo className="logo" />
      <span className="content">
        <Trans i18nKey="unsupported.content" />
      </span>
      <a href={TELEGRAM_BOT_URL} target="_blank" rel="noreferrer">
        <Button type="primary">
          <span><Trans i18nKey="unsupported.button" /></span>
        </Button>
      </a>
    </div>
  );
}
