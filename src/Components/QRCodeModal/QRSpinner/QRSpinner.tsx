import React from 'react';
import styles from './QRSpinner.module.scss';
import { SFIcon } from 'sfui';

export const QRSpinner = (): React.ReactElement<{}> => {
  return (
    <div className={styles.qRSpinner}>
      <SFIcon className={styles.icon} icon="QR-Code" size={96} />
    </div>
  );
};
