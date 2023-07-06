import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  message,
} from 'antd';
import { useTranslation } from 'react-i18next';
import Notifications from '@/components/desktop/Navbar/notifications';
import Profile from '@/components/desktop/Navbar/profile';
import {
  searchPattern,
  searchPatternString,
} from '@/constants/search';
import { ReactComponent as Logo } from '@/assets/images/logo.svg';
import './index.scss';

export default function Navbar() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onSearch = useCallback((value: string) => {
    if (searchPattern.test(value)) {
      navigate(`/search?q=${value}`);
    } else {
      message.error(t('navbar.search_error')).then();
    }
  }, []);

  return (
    <header>
      <div>
        <Logo className="logo" />
        <Input.Search
          className="search"
          placeholder={t('navbar.search') as string}
          pattern={searchPatternString}
          onSearch={onSearch}
        />
      </div>
      <div>
        <Notifications />
        <Profile />
      </div>
    </header>
  );
}
