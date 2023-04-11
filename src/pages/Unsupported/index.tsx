import React from 'react';
import { Button } from 'antd';
import { TELEGRAM_BOT_URL } from '@/config';
import { ReactComponent as Logo } from '@/assets/images/logo.svg';
import './index.scss';

export default function Unsupported() {
  return (
    <div className="unsupported-container">
      <Logo className="logo" />
      <span className="content">
        We do not currently support mobile devices. Please use telegram bot instead.
      </span>
      <a href={TELEGRAM_BOT_URL} target="_blank" rel="noreferrer">
        <Button type="primary">Open telegram bot</Button>
      </a>
    </div>
  );
}
