import React from 'react';
import styles from './ProgressBar.module.scss';

export interface ProgressBarProps {
  peak: number;
  value: number;
}

const getRightMargin = (value: number, peak: number): number => {
  return 100 - Math.round(100 / (value / peak));
};

export const ProgressBar = ({
  peak,
  value
}: ProgressBarProps): React.ReactElement<ProgressBarProps> => {
  const fraction: number = Math.round((value * 100) / peak);

  return (
    <div className={styles.progressBar}>
      <div className={styles.bar}>
        <div
          className={`${styles.progress} ${
            fraction >= 100 ? styles.success : ''
          }`}
          style={{ width: `${Math.min(fraction, 100)}%` }}
        ></div>
      </div>
      <div
        className={styles.tippingPoint}
        style={{
          marginRight:
            fraction > 100 ? `${getRightMargin(value, peak)}%` : undefined
        }}
      >
        <h5 className={styles.peak}>{peak}</h5>
      </div>
    </div>
  );
};
