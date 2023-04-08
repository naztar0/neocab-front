export enum Theme {
  Light,
  Dark,
}

export enum Language {
  English,
  Russian,
  Ukrainian,
}

export enum CalendarWeekDays {
  toFriday = 5,
  toSaturday = 6,
  toSunday = 7,
}

export enum SettingsType {
  Select,
  InputNumber,
}

export enum SettingsName {
  'Language',
  'Theme',
  CalendarStartHour,
  CalendarEndHour,
  'CalendarWeekDays',
}

export const settingsList = [
  {
    name: SettingsName.Language,
    type: SettingsType.Select,
  },
  {
    name: SettingsName.Theme,
    type: SettingsType.Select,
  },
  {
    name: SettingsName.CalendarStartHour,
    type: SettingsType.InputNumber,
  },
  {
    name: SettingsName.CalendarEndHour,
    type: SettingsType.InputNumber,
  },
  {
    name: SettingsName.CalendarWeekDays,
    type: SettingsType.Select,
  },
];
