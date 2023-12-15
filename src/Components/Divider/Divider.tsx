import React from 'react';
import styles from './Divider.module.scss';

export interface DividerProps {
  className?: string;
  size?: number;
}

export const Divider = ({
  className = '',
  size = 1
}: DividerProps): React.ReactElement<DividerProps> => {
  return (
    <hr
      className={`${styles.divider} ${className}`}
      style={{ borderBottomWidth: `${size}px` }}
    />
  );
};
