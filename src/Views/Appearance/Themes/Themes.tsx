import React from 'react';
import styles from './Themes.module.scss';

import { SFRadio, SFThemeType } from 'sfui';
import ThemeSvg from './ThemeSvg/ThemeSvg';
import { SettingsContentRender } from '../../SettingsContentRender';
import { ThemeTypeContext } from '../../../Context';

const Themes = (): React.ReactElement<{}> => {
  const { themeType, saveThemeType } = React.useContext(ThemeTypeContext);

  const onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    saveThemeType(event.target.value as SFThemeType);
  };

  return (
    <div className={styles.themes}>
      <SettingsContentRender
        renderContent={() => (
          <React.Fragment>
            <div className={styles.theme}>
              <ThemeSvg type="dayMode" />
              <div className={styles.radio}>
                <SFRadio
                  label="Day Mode"
                  name="radio-button-theme"
                  value="day"
                  checked={themeType === 'day'}
                  onChange={onRadioChange}
                />
              </div>
            </div>

            <div className={styles.theme}>
              <ThemeSvg type="nightMode" />
              <div className={styles.radio}>
                <SFRadio
                  label="Night Mode"
                  name="radio-button-theme"
                  value="night"
                  checked={themeType === 'night'}
                  onChange={onRadioChange}
                />
              </div>
            </div>
          </React.Fragment>
        )}
      />
    </div>
  );
};

export default Themes;
