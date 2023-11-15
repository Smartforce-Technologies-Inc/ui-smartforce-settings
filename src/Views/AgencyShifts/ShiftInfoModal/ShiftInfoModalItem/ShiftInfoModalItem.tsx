import React from 'react';
import styles from './ShiftInfoModalItem.module.scss';
import { SFIcon, SFText } from 'sfui';

export interface ShiftInfoModalItemProps {
  icon: string;
  text: string;
}

export const ShiftInfoModalItem = ({
  icon,
  text
}: ShiftInfoModalItemProps): React.ReactElement<ShiftInfoModalItemProps> => {
  return (
    <div className={styles.shiftInfoModalItem}>
      <SFIcon size={20} icon={icon} />
      <SFText type="component-1-medium">{text}</SFText>
    </div>
  );
};
