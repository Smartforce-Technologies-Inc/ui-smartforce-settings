import React, { FC } from 'react';
import { SFThemeType, useSFMediaQuery } from 'sfui';
import ThemeTypeService from '../Services/ThemeTypeService';

export type ThemeTypeContextState = {
  themeType: SFThemeType;
  saveThemeType: (themeType: SFThemeType) => void;
};

const contextDefaultValues: ThemeTypeContextState = {
  themeType: ThemeTypeService.getThemeType(),
  saveThemeType: () => {}
};

export const ThemeTypeContext =
  React.createContext<ThemeTypeContextState>(contextDefaultValues);

export const ThemeTypeProvider: FC = ({ children }) => {
  const [themeType, setThemeType] = React.useState<SFThemeType>(
    contextDefaultValues.themeType
  );

  const saveThemeType = (newThemeType: SFThemeType) => {
    setThemeType(newThemeType);
    ThemeTypeService.saveThemeType(newThemeType);
  };

  const prefersDarkMode: boolean = useSFMediaQuery(
    '(prefers-color-scheme: dark)'
  );

  React.useEffect(() => {
    if (!ThemeTypeService.isSaved()) {
      const newThemeType = ThemeTypeService.getThemeType();
      setThemeType(newThemeType);
      ThemeTypeService.applyThemeType(newThemeType);
    }
  }, [prefersDarkMode]);

  return (
    <ThemeTypeContext.Provider
      value={{
        themeType,
        saveThemeType
      }}
    >
      {children}
    </ThemeTypeContext.Provider>
  );
};
