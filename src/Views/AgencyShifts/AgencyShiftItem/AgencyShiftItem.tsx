import React from 'react';
import styles from './AgencyShiftItem.module.scss';
import { ShiftListItemInfo } from './ShiftListItemInfo/ShiftListItemInfo';
import { Avatar } from '../../../Components';
import { ShiftListItem } from '../../../Models';

export interface AgencyShiftItemProps {
  shift: ShiftListItem;
}

export const AgencyShiftItem = ({
  shift
}: AgencyShiftItemProps): React.ReactElement<AgencyShiftItemProps> => {
  return (
    <div className={styles.agencyShiftItem}>
      <Avatar size="small" acronym={shift.acronym} />

      <ShiftListItemInfo shift={shift} />
    </div>
  );
};
