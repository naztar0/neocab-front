import React, {
  useMemo,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Button,
  ColorPicker,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Color } from 'antd/es/color-picker';
import { ExperimentOutlined, BgColorsOutlined } from '@ant-design/icons';
import { Trans, useTranslation } from 'react-i18next';
import { AppDispatch } from '@/store/store';
import {
  ESettingsType,
  ESettingsName,
  eSettingsList,
} from '@/constants/settingsExperimental';
import { setPrimaryColor } from '@/store/reducers/theme';

interface ElementTitle {
  text: string;
  icon: React.JSX.Element;
}

interface DataType {
  title: ElementTitle;
  values: string[];
  selected: string[];
  item: { name: ESettingsName, types: ESettingsType[] };
}

export default function ExperimentalSettings() {
  // noinspection DuplicatedCode
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const profileData = useSelector((state: any) => state.profileReducer.profile);
  const primaryColor = useSelector((state: any) => state.themeReducer.primaryColor);

  const settingsTitles = useMemo(() => [
    {
      text: t('settings.primary_color'),
      icon: <BgColorsOutlined className="icon" />,
    },
  ], [t]);

  const settingsValues: { text: string, value: any }[][][] = useMemo(() => [
    [
      [
        { text: primaryColor, value: null },
      ],
      [
        { text: t('settings.reset'), value: null },
      ],
    ],
  ], [primaryColor, t]);

  const settingsSelected = useMemo(() => [
    [settingsValues[0][0][0].text, settingsValues[0][1][0].text],
  ], [settingsValues]);

  const colorPickerSwitch = useCallback(({ value, name }: { value: Color, name: ESettingsName }) => {
    switch (name) {
      case ESettingsName.PrimaryColor:
        document.documentElement.style.setProperty('--primary', value.toHexString());
        dispatch(setPrimaryColor(value.toHexString()));
        break;
      default:
        break;
    }
  }, [settingsValues]);

  const buttonSwitch = useCallback(({ name }: { name: ESettingsName }) => {
    switch (name) {
      case ESettingsName.PrimaryColor:
        document.documentElement.style.removeProperty('--primary');
        dispatch(setPrimaryColor(getComputedStyle(document.documentElement).getPropertyValue('--primary')));
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
      render: (_, { selected, item }) => {
        const itemTypes: React.JSX.Element[] = [];
        item.types.forEach((type, index) => {
          switch (type) {
            case ESettingsType.ColorPicker:
              itemTypes.push(
                <ColorPicker
                  disabledAlpha
                  className="input-number"
                  value={selected[index]}
                  onChangeComplete={(value) => colorPickerSwitch({ value, name: item.name })}
                />,
              );
              break;
            case ESettingsType.Button:
              itemTypes.push(
                <Button
                  className="button"
                  onClick={() => buttonSwitch({ name: item.name })}
                >
                  {selected[index]}
                </Button>,
              );
              break;
            default:
              break;
          }
        });
        return (
          <div className="settings-item-types">
            {itemTypes}
          </div>
        );
      },
    },
  ], [colorPickerSwitch]);

  const settingsDataSource: DataType[] = useMemo(() => (
    settingsTitles.map((title, index) => ({
      key: index,
      title,
      values: settingsValues[index].map((value: any) => value.map((item: { text: string }) => item.text)),
      selected: settingsSelected[index],
      item: eSettingsList[index],
    }))), [settingsValues, settingsSelected]);

  return (
    <div className="substrate">
      <Table
        className="settings-table"
        columns={columns}
        dataSource={settingsDataSource}
        pagination={false}
        showHeader={false}
        caption={(
          <div className="table-title">
            <span className="title">
              <ExperimentOutlined className="icon" />
              <Trans i18nKey="settings.experimental" />
            </span>
          </div>
        )}
      />
    </div>
  );
}
