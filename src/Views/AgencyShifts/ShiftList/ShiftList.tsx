import React, { Fragment } from 'react';
import styles from './ShiftList.module.scss';
import { Divider } from '../../../Components/Divider/Divider';
import { ShiftListItem as Shift } from '../../../Models';
import { ShiftListItem } from './ShiftListItem/ShiftListItem';

export interface ShiftListProps {
  shifts: Shift[];
  onInfo: (shift: Shift) => void;
  onDelete: (shift: Shift) => void;
  onEdit: (shift: Shift) => void;
  onRestore: (shift: Shift) => void;
  onViewHistory: (shift: Shift) => void;
}

export const ShiftList = ({
  shifts,
  onInfo,
  onDelete,
  onEdit,
  onRestore,
  onViewHistory
}: ShiftListProps): React.ReactElement<ShiftListProps> => {
  return (
    <div className={styles.shiftList}>
      {shifts.map((shift: Shift, index: number) => (
        <Fragment key={shift.id}>
          <ShiftListItem
            shift={shift}
            onInfo={() => onInfo(shift)}
            onDelete={() => onDelete(shift)}
            onEdit={() => onEdit(shift)}
            onRestore={() => onRestore(shift)}
            onViewHistory={() => onViewHistory(shift)}
          />
          {index < shifts.length - 1 && <Divider size={1} />}
        </Fragment>
      ))}
    </div>
  );
};
