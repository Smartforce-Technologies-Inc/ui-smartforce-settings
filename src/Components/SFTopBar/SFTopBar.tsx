import React, { createContext } from 'react';
import styles from './SFTopBar.module.scss';
import { SFIconButton } from 'sfui';
import { SFTopBarUser } from './SFTopBarUser/SFTopBarUser';
import { SFLogo } from '../SFLogo/SFLogo';
import { SFTopBarApps } from './SFTopBarApps/SFTopBarApps';
import { AppEnv, ApplicationProduct } from '../../Models';

interface SFTopBarEnvContextProps {
  enviroment: AppEnv;
  product: ApplicationProduct;
}

export const SFTopBarEnvContext = createContext<SFTopBarEnvContextProps>({
  enviroment: 'local',
  product: 'cc'
});

export interface SFTopBarProps {
  className?: string;
  enviroment: AppEnv;
  product: ApplicationProduct;
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
  product,
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
    <SFTopBarEnvContext.Provider value={{ enviroment, product }}>
      <div
        className={`${styles.sfTopBar} ${
          isBottomTitleVisible ? styles.showBottomContent : ''
        } ${className}`}
      >
        <div className={styles.topContent}>
          {!isMinimal && (
            <div className={styles.menu}>
              <SFIconButton
                sfSize="medium"
                sfIcon="Menu-1"
                onClick={() => onMenuButtonClick()}
              />
              <SFLogo />
            </div>
          )}

          {isTopTitleVisible && (
            <h3 className={styles.siteTitle}>{siteTitle}</h3>
          )}

          <div className={styles.actions}>
            {actions}

            <SFTopBarApps />
          </div>

          <div className={styles.user}>
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
