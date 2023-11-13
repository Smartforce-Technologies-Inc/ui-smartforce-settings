import React from 'react';
import styles from './ShiftListItemInfo.module.scss';
import moment from 'moment';
import { SFText, SFChip } from 'sfui';
import { InactiveDaysMessage } from '../../../../../Components/InactiveDaysMessage/InactiveDaysMessage';
import { Shift } from '../../../../../Models';
import { upperFirstChar } from '../../../../../Helpers';

function getDaysLabel(shift: Shift): string {
  let msg: string = `Every week on `;
  shift.repeat.days.forEach((day: string, index: number) => {
    const isLast: boolean = index === shift.repeat.days.length - 1;

    if (shift.repeat.days.length > 1 && isLast) {
      msg += `and `;
    }

    msg += upperFirstChar(day);

    if (!isLast) msg += ', ';
  });

  msg += ` from ${moment(shift.start_date).format('HH:mm')} to ${moment(
    shift.end_date
  ).format('HH:mm')}`;

  return msg;
}

export interface ShiftListItemInfoProps {
  shift: Shift;
}

export const ShiftListItemInfo = ({
  shift
}: ShiftListItemInfoProps): React.ReactElement<ShiftListItemInfoProps> => {
  return (
    <div className={styles.shiftListItemInfo}>
      <div>
        <SFText type="component-2">{shift.title}</SFText>

        <SFText type="component-2-medium" sfColor="neutral">
          {getDaysLabel(shift)}
        </SFText>
      </div>

      {shift.status === 'Inactive' && (
        <InactiveDaysMessage
          className={styles.deleteMsg}
          date={shift.updated_at as string}
        />
      )}

      <div className={styles.status}>
        <SFChip
          sfColor={shift.status === 'Active' ? 'primary' : 'default'}
          size="small"
          variant="outlined"
          label={shift.status}
        />
      </div>
    </div>
  );
};
