import React from 'react';
import styles from './AppsPopoverContent.module.scss';
import FaviconCC from '../../../../../Images/FaviconCC';
import FaviconShifts from '../../../../../Images/FaviconShifts';
import { SFTopBarEnvContext } from '../../../SFTopBar';
import { AppLink } from './AppLink/AppLink';
import { AppEnv, ApplicationProduct } from '../../../../../Models';
import { getAppBaseUrl } from '../../../../../Helpers/application';

function getAppMainUrl(env: AppEnv, product: ApplicationProduct): string {
  let url = getAppBaseUrl(env, product);
  url += `${product}${product === 'shift' ? 's' : ''}`;
  return url;
}

export interface AppsPopoverContentProps {
  onClose: () => void;
}

export const AppsPopoverContent = ({
  onClose
}: AppsPopoverContentProps): React.ReactElement<AppsPopoverContentProps> => {
  const { enviroment, product } = React.useContext(SFTopBarEnvContext);

  const onClick = (product: ApplicationProduct) => {
    window.open(getAppMainUrl(enviroment, product), '_blank');
    onClose();
  };

  return (
    <div className={styles.appsPopoverContent}>
      <AppLink
        icon={FaviconCC}
        label="CitizenContact"
        selected={product === 'cc'}
        onClick={() => onClick('cc')}
      />

      <AppLink
        icon={FaviconShifts}
        label="Shifts"
        selected={product === 'shift'}
        onClick={() => onClick('shift')}
      />
    </div>
  );
};
