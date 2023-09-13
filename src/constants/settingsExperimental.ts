export enum ESettingsType {
  ColorPicker,
  Button,
}

export enum ESettingsName {
  'PrimaryColor',
}

export const eSettingsList = [
  {
    name: ESettingsName.PrimaryColor,
    types: [ESettingsType.ColorPicker, ESettingsType.Button],
  },
];
