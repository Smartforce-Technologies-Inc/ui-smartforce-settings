import React from 'react';
import styles from './ProgressBar.module.scss';

export interface ProgressBarProps {
  peak: number;
  value: number;
}

export const ProgressBar = ({
  peak,
  value
}: ProgressBarProps): React.ReactElement<ProgressBarProps> => {
  const fraction: number = Math.min(Math.round((value * 100) / peak), 100);

  return (
    <div className={styles.progressBar}>
      <div className={styles.bar}>
        <div
          className={`${styles.progress} ${
            fraction === 100 ? styles.success : ''
          }`}
          style={{ width: `${fraction}%` }}
        ></div>
      </div>
      <div className={styles.tippingPoint}>
        <h5 className={styles.peak}>{peak}</h5>
      </div>
    </div>
  );
};
