import React from 'react';
import {
  ConfigProvider as ConfigProviderAntd,
  theme as themeAntd,
} from 'antd';
import En_US from 'antd/es/locale/en_US';
import Ru_RU from 'antd/es/locale/ru_RU';
import Uk_UA from 'antd/es/locale/uk_UA';
import { useSelector } from 'react-redux';
import { Language, Theme } from '@/constants/settings';

export default function ConfigProvider({ children }: { children: React.ReactNode }) {
  const currTheme: Theme = useSelector((state: any) => state.themeReducer.theme);
  const currLanguage: Language = useSelector((state: any) => state.languageReducer.language);

  const getLocale = (language: Language) => {
    switch (language) {
      case Language.English:
        return En_US;
      case Language.Russian:
        return Ru_RU;
      case Language.Ukrainian:
        return Uk_UA;
      default:
        return Uk_UA;
    }
  };

  const getAlgorithm = (theme: Theme) => {
    switch (theme) {
      case Theme.Dark:
        return themeAntd.darkAlgorithm;
      case Theme.Light:
        return themeAntd.defaultAlgorithm;
      default:
        return themeAntd.defaultAlgorithm;
    }
  };

  const themeToken = {
    colorPrimary: '#646cff',
    colorLink: '#646cff',
    colorBgLayout: '#1a1d1f',
    borderRadius: 5,
    fontFamily: 'Rubik, Inter, Avenir, Helvetica, Arial, sans-serif',
  };

  return (
    <ConfigProviderAntd
      theme={{
        token: themeToken,
        algorithm: getAlgorithm(currTheme),
      }}
      locale={getLocale(currLanguage)}
    >
      {children}
    </ConfigProviderAntd>
  );
}
