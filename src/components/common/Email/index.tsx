import React from 'react';
import { Button, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { copyToClipboard } from '@/helpers/utils';
import './index.scss';

export default function Email({
  email, copy, className, onScroll,
}: {
  email: string,
  copy?: boolean,
  className?: string,
  onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void,
}) {
  const { t } = useTranslation();

  return (
    <div className={`email ${className} ${copy ? '' : 'no-icon'}`} onScroll={onScroll}>
      <a className="text-dark" href={`mailto:${email}`}>{email}</a>
      {copy && (
        <Button
          type="text"
          onClick={() => copyToClipboard(email, () => message.success(t('common.messages.copied')))}
          icon={<CopyOutlined />}
        />
      )}
    </div>
  );
}

Email.defaultProps = {
  copy: true,
  className: '',
  onScroll: () => {},
};
