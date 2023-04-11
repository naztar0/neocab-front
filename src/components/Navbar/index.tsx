import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Input,
  message,
} from 'antd';
import Notifications from '@/components/Navbar/notifications';
import Profile from '@/components/Navbar/profile';
import {
  searchPattern,
  searchPatternString,
} from '@/constants/search';
import { ReactComponent as Logo } from '@/assets/images/logo.svg';
import './index.scss';

export default function Navbar() {
  const navigate = useNavigate();

  const onSearch = useCallback((value: string) => {
    if (searchPattern.test(value)) {
      navigate(`/search?q=${value}`);
    } else {
      message.error('Search value must contain only letters and spaces').then();
    }
  }, []);

  return (
    <header>
      <div>
        <Logo className="logo" />
        <Input.Search
          className="search"
          placeholder="Search"
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
