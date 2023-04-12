import React, {
  useState,
  useMemo,
  useCallback,
  ForwardRefExoticComponent,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Select,
  message,
  Table,
  InputNumber,
  Button,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Helmet } from 'react-helmet';
import cookies from 'js-cookie';
import Icon, * as Icons from '@ant-design/icons';
import { AppDispatch } from '@/store/store';
import { ReactComponent as RoutineIcon } from '@/assets/icons/routine.svg';
import Layout from '@/components/Layout';
import { setTheme } from '@/store/reducers/theme';
import { setLanguage } from '@/store/reducers/language';
import {
  setCalendarStartHour,
  setCalendarEndHour,
  setCalendarWeekDays,
} from '@/store/reducers/schedule';
import {
  Language,
  Theme,
  CalendarWeekDays,
  SettingsType,
  SettingsName,
  settingsList,
} from '@/constants/settings';
import { syncUserPhoto } from '@/store/actions/users';
import './index.scss';

interface ElementTitle {
  text: string;
  icon: JSX.Element;
}

interface DataType {
  title: ElementTitle;
  values: string[];
  selected: string;
  item: { name: SettingsName, type: SettingsType };
}

export default function Settings() {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useSelector((state: any) => state.themeReducer.theme);
  const language = useSelector((state: any) => state.languageReducer.language);
  const calendarStartHour = useSelector((state: any) => state.scheduleReducer.calendarStartHour);
  const calendarEndHour = useSelector((state: any) => state.scheduleReducer.calendarEndHour);
  const calendarWeekDays = useSelector((state: any) => state.scheduleReducer.calendarWeekDays);
  const profileData = useSelector((state: any) => state.profileReducer.profile);

  const [themeSelected, setThemeSelected] = useState(theme);
  const [languageSelected, setLanguageSelected] = useState(language);
  const [calendarWeekDaysSelected, setCalendarWeekDaysSelected] = useState(calendarWeekDays);

  const settingsTitles = useMemo(() => [
    {
      text: 'Language',
      icon: <Icons.GlobalOutlined className="icon" />,
    },
    {
      text: 'Theme',
      icon: <Icon component={RoutineIcon as unknown as ForwardRefExoticComponent<any>} className="icon" />,
    },
    {
      text: 'Calendar start hour',
      icon: <Icons.DownCircleOutlined className="icon" />,
    },
    {
      text: 'Calendar end hour',
      icon: <Icons.UpCircleOutlined className="icon" />,
    },
    {
      text: 'Calendar week days',
      icon: <Icons.InsertRowAboveOutlined className="icon" />,
    },
    {
      text: 'Sync profile photo',
      icon: <Icons.SyncOutlined className="icon" />,
    },
  ], []);

  const settingsValues: { text: string, value: any }[][] = useMemo(() => [
    [
      { text: 'English', value: Language.English },
      { text: 'Русский', value: Language.Russian },
      { text: 'Українська', value: Language.Ukrainian },
    ],
    [
      { text: 'Light', value: Theme.Light },
      { text: 'Dark', value: Theme.Dark },
    ],
    [
      { text: calendarStartHour.toString(), value: null },
    ],
    [
      { text: calendarEndHour.toString(), value: null },
    ],
    [
      { text: 'Mon - Fri', value: CalendarWeekDays.toFriday },
      { text: 'Mon - Sat', value: CalendarWeekDays.toSaturday },
      { text: 'Mon - Sun', value: CalendarWeekDays.toSunday },
    ],
    [
      { text: 'Synchronize', value: null },
    ],
  ], [calendarStartHour, calendarEndHour]);

  const settingsSelected = useMemo(() => [
    settingsValues[0].find((item) => item.value === languageSelected)?.text || '',
    settingsValues[1].find((item) => item.value === themeSelected)?.text || '',
    settingsValues[2][0].text,
    settingsValues[3][0].text,
    settingsValues[4].find((item) => item.value === calendarWeekDaysSelected)?.text || '',
    settingsValues[5][0].text,
  ], [settingsValues, languageSelected, themeSelected, calendarWeekDaysSelected]);

  const selectSwitch = useCallback(({ value, name }: { value: string, name: SettingsName }) => {
    switch (name) {
      case SettingsName.Language:
        value = settingsValues[0].find((item) => item.text === value)?.value;
        cookies.set('language', value);
        dispatch(setLanguage(value));
        setLanguageSelected(value);
        break;
      case SettingsName.Theme:
        value = settingsValues[1].find((item) => item.text === value)?.value;
        cookies.set('theme', value);
        dispatch(setTheme(value));
        setThemeSelected(value);
        break;
      case SettingsName.CalendarWeekDays:
        value = settingsValues[4].find((item) => item.text === value)?.value;
        cookies.set('calendarWeekDays', value);
        dispatch(setCalendarWeekDays(value));
        setCalendarWeekDaysSelected(value);
        break;
      default:
        break;
    }
  }, [settingsValues]);

  const inputNumberSwitch = useCallback(({ value, name }: { value: string | null, name: SettingsName }) => {
    const numberValue = value ? Number(value) : 0;
    switch (name) {
      case SettingsName.CalendarStartHour:
        if (numberValue < 0 || numberValue > 22) {
          message.error('Incorrect value').then();
          return;
        }
        dispatch(setCalendarStartHour(numberValue));
        cookies.set('calendarStartHour', numberValue.toString());
        break;
      case SettingsName.CalendarEndHour:
        if (numberValue < 1 || numberValue > 23) {
          message.error('Incorrect value').then();
          return;
        }
        dispatch(setCalendarEndHour(numberValue));
        cookies.set('calendarEndHour', numberValue.toString());
        break;
      default:
        break;
    }
  }, []);

  const buttonSwitch = useCallback(({ name }: { name: SettingsName }) => {
    switch (name) {
      case SettingsName.SyncProfilePhoto:
        dispatch(syncUserPhoto({ user: profileData.id }));
        message.success('Synced successfully').then();
        break;
      default:
        break;
    }
  }, [profileData]);

  const columns: ColumnsType<DataType> = useMemo(() => [
    {
      dataIndex: 'title',
      width: '80%',
      render: (data) => (
        <>
          {data.icon}
          <span className="title">{data.text}</span>
        </>
      ),
    },
    {
      dataIndex: 'value',
      render: (_, { selected, values, item }) => {
        switch (item.type) {
          case SettingsType.Select:
            return (
              <Select
                className="select"
                defaultValue={selected}
                onChange={(value) => selectSwitch({ value, name: item.name })}
              >
                {values.map((value) => (
                  <Select.Option value={value} key={value}>{value}</Select.Option>
                ))}
              </Select>
            );
          case SettingsType.InputNumber:
            return (
              <InputNumber
                className="input-number"
                defaultValue={selected}
                onChange={(value) => inputNumberSwitch({ value, name: item.name })}
              />
            );
          case SettingsType.Button:
            return (
              <Button
                className="button"
                onClick={() => buttonSwitch({ name: item.name })}
              >
                {selected}
              </Button>
            );
          default:
            return null;
        }
      },
    },
  ], [selectSwitch, inputNumberSwitch]);

  const settingsDataSource: DataType[] = useMemo(() => (
    settingsTitles.map((title, index) => ({
      key: index,
      title,
      values: settingsValues[index].map((value) => value.text),
      selected: settingsSelected[index],
      item: settingsList[index],
    }))), [settingsValues, settingsSelected]);

  return (
    <Layout>
      <Helmet title="Settings" />
      <div className="substrate">
        <Table
          className="settings-table"
          columns={columns}
          dataSource={settingsDataSource}
          pagination={false}
          showHeader={false}
        />
      </div>
    </Layout>
  );
}
