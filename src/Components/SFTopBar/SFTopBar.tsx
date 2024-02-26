import React, { createContext } from 'react';
import styles from './SFTopBar.module.scss';
import { SFIconButton } from 'sfui';
import { SFTopBarUser } from './SFTopBarUser/SFTopBarUser';
import { SFLogo } from '../SFLogo/SFLogo';
import { SFTopBarApps } from './SFTopBarApps/SFTopBarApps';
import { AppEnv } from '../../Models';

export const SFTopBarEnvContext = createContext<AppEnv>('local');

export interface SFTopBarProps {
  className?: string;
  enviroment: AppEnv;
  siteTitle: string;
  isMinimal?: boolean;
  isTopTitleVisible?: boolean;
  isBottomTitleVisible?: boolean;
  actions?: React.ReactNode;
  userMenuItems?: React.ReactNode;
  onLogout: () => void;
  onMenuButtonClick: () => void;
}

export const SFTopBar = ({
  className = '',
  enviroment,
  siteTitle,
  isMinimal = false,
  isTopTitleVisible = true,
  isBottomTitleVisible = true,
  actions,
  userMenuItems,
  onLogout,
  onMenuButtonClick
}: SFTopBarProps): React.ReactElement<SFTopBarProps> => {
  return (
    <SFTopBarEnvContext.Provider value={enviroment}>
      <div
        className={`${styles.sfTopBar} ${
          isBottomTitleVisible ? styles.showBottomContent : ''
        } ${className}`}
      >
        <div className={styles.topContent}>
          {!isMinimal && (
            <SFIconButton
              sfSize="medium"
              sfIcon="Menu-1"
              className={styles.navPanelButton}
              onClick={() => onMenuButtonClick()}
            />
          )}

          {isTopTitleVisible && (
            <h3 className={styles.siteTitle}>{siteTitle}</h3>
          )}

          {!isMinimal && <SFLogo className={styles.navLogo} />}

          <div className={styles.actions}>
            {actions}

            <SFTopBarApps />
          </div>

          <div className={styles.userAvatar}>
            <SFTopBarUser onLogout={onLogout}>{userMenuItems}</SFTopBarUser>
          </div>
        </div>

        {isBottomTitleVisible && (
          <div className={styles.bottomContent}>
            <h3 className={styles.siteTitle}>{siteTitle}</h3>
          </div>
        )}
      </div>
    </SFTopBarEnvContext.Provider>
  );
};
